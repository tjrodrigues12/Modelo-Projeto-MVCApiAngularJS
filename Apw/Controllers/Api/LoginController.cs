using Arquitetura.Base;
using Arquitetura.Servico;
using Arquitetura.Util.Generic;
using Arquitetura.Util.Logic;
using Dominio.Autenticacao;
using Dominio.PortalSistemas.ModelView.Login;
using Servico.PortalSistemas;
using SISTEMAS_SED_APW.Models;
using SISTEMAS_SED_APW.WebServiceGSI;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Xml.Linq;

namespace SISTEMAS_SED_APW.Controllers.Api
{
    public class LoginController : ApiController
    {
        private string appAmbiente = ConfigurationManager.AppSettings["AppAmbiente"].ToLower();
        private int sistemaId = Convert.ToInt32(ConfigurationManager.AppSettings["CodGSISistema"]);
        private string sUser = ConfigurationManager.AppSettings["SiglaGSISistema"];
        private string sPwd = ConfigurationManager.AppSettings["SenhaGSISistema"];
        private byte[] key = Convert.FromBase64String("V65qeYQ9ZEGmND2N2IulotnH0j/0BQp3p8/YiglFqUk=");

        private List<IUrlPermitida> _urlsPermitidas = new List<IUrlPermitida>();

        [HttpGet]
        public object GetListaDominio()
        {
            try
            {
                WSGSI webSerciceGSI = new WSGSI();
                var dominio = webSerciceGSI.GSI_SelecionarDominio_SO(sUser, sPwd).ToList();
                
                var result = dominio.Select(x => new
                {
                    dominio = x.NomeDominio
                })
                .OrderBy(y => y.dominio);

                return new
                {
                    result = result
                };
            }
            catch (Exception ex)
            {
                return new { mensagens = ex.CriarErroResposta() };
            }
        }

        [HttpPost]
        public object PostLogin(LoginForm form)
        {
            try
            {
                return this.RealizaLogin(form);
            }
            catch (Exception)
            {
                return new { mensagens = new
                                { texto =  "Falha de logon: nome de usuário, nome de domínio ou senha incorreta", tipoMensagem = 3 }
                };
            }            
        }

        [NonAction]
        private object RealizaLogin(LoginForm form)
        {
            try
            {
                var escopo = new LoginEscopo();
                bool result;

                if (!form.TipoAcesso)//GSI
                {
                    result = this.LoginGSI(form);
                }
                else//Professor
                {
                    result = this.LoginDocente(form, ref escopo);
                }

                return new
                {
                    result = result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    result = false,
                    mensagens = new Mensagem(ETipoMensagem.FalhaSistema, ex.Message)
                };
            }
        }

        [NonAction]
        private bool LoginGSI(LoginForm form)
        {
            try
            {
                WSGSI webSerciceGSI = new WSGSI();
                var ambiente = 1;//Producao

                var myAes = Aes.Create();
                myAes.Key = key;
                byte[] encrypted = Criptografia.EncryptStringToBytes_Aes(form.Senha, myAes.Key, myAes.IV);

                var usuario = webSerciceGSI.GSI_AutenticarUsuario_Permissao_Ambiente_AES_NomeSocial_SO(
                        form.Usuario,
                        encrypted,
                        myAes.IV,
                        form.Dominio,
                        sistemaId,
                        ambiente,
                        sUser,
                        sPwd
                    ).FirstOrDefault();

                //Obter grupos permitidos ao usuário para o sistema
                List<GrupoSistemaUsuarioWS> GrupoSistemaUsuario = webSerciceGSI.GSI_SelecionaGrupoSistemaUsuario_SO(usuario.UsuarioID, sistemaId, sUser, sPwd).ToList();
                if (!GrupoSistemaUsuario.Any())
                    throw new Exception("O usuário não tem permissão para este sistema!");

                var sistemas = webSerciceGSI.GSI_SelecionaSistemasUsuario(usuario.UsuarioID, sUser, sPwd);

                //Carrega Menus do sistema                        
                string Menu = string.Empty;
                Menu = webSerciceGSI.GSI_SelecionaMenu_TokenCompleto(usuario.UsuarioID, GrupoSistemaUsuario[0].GrupoID, GrupoSistemaUsuario[0].cod_estrutura, sistemaId, sUser, sPwd);

                var menu = this.MontarMenuHtml(Menu);

                this.MenuPermissao(Menu, usuario.UsuarioID, GrupoSistemaUsuario[0].GrupoID);

                GerenciadorSessao.UsuarioLogado = new UsuarioAutenticacao
                {
                    NomeCompleto = usuario.NomeUsuario,
                    Perfil = GrupoSistemaUsuario[0].NomeGrupo,
                    PerfilId = GrupoSistemaUsuario[0].GrupoID,
                    UsuarioId = usuario.UsuarioID,
                    MenuHtml = menu.ToString(),
                    UrlsPermitidas = _urlsPermitidas,
                    ListaSistemasSiglas = sistemas.Select(x => x.SiglaSistema).ToList(),
                    AreaId = GrupoSistemaUsuario[0].cod_estrutura == 2627 ? (int)EPortalSistemasArea.SED : (int)EPortalSistemasArea.Escolas
                };

                return true;
            }
            catch (Exception)
            {
                throw;
            }            
        }

        [NonAction]
        private bool LoginDocente(LoginForm form, ref LoginEscopo escopo)
        {
            try
            {
                var Pessoa = escopo.VerificaLoginDocente(form);

                UsuarioAutenticacao usuario = new UsuarioAutenticacao
                {
                    UnidadeEscolar = "escola",
                    Municipio = "Municipio",
                    NomeCompleto = Pessoa.NomeCompleto,
                    Perfil = "Docente",
                    UsuarioId = Pessoa.PessoaId,
                    MostrarTrocaPerfilUnidadeEscolar = true,
                    PessoaId = Pessoa.PessoaId,
                    AreaId = (int)EPortalSistemasArea.Professor
                };

                GerenciadorSessao.UsuarioLogado = usuario;

                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [NonAction]
        private StringBuilder MontarMenuHtml(string menuString)
        {
            // Montagem do menu de forma recursiva
            try
            {
                XDocument MenusSistema = new XDocument();
                string EstruturaMenus = menuString;
                MenusSistema = XDocument.Parse(EstruturaMenus);

                List<XElement> ListaMenus = (from ms in
                                                 MenusSistema.Descendants("Menu")
                                             select ms).ToList();

                List<XElement> ListaMenusPai = ListaMenus.Where(m => m.Attribute("MenuPai").Value.Equals("6698")).ToList();

                StringBuilder menuPrincipal = new StringBuilder();

                var escopo = new LoginEscopo();
                var menuIcone = escopo.ObterListaIconePorSistemaId(sistemaId);

                //Monta os Menus Accordion
                foreach (XElement menu in ListaMenusPai)
                {

                    //Monta os menus recursivamente
                    string MenuID = menu.Attribute("MenuID").Value;

                    menuPrincipal.Append("<li>");
                    string UrlNavegacao = menu.Attribute("NavigateURL").Value;

                    menuPrincipal.Append(string.Format("<a href=\"{0}\" class=\"dropdown-toggle\">", UrlNavegacao));

                    //Icone Menu
                    if (menuIcone.Any())
                    {
                        int menuId = Convert.ToInt32(MenuID);
                        var iconeMenu = menuIcone.Where(x => x.MenuId == menuId).FirstOrDefault();
                        if (iconeMenu != null)
                            menuPrincipal.Append("<i class=\"" + iconeMenu.ClasseCss + "\"></i>");
                    }
                    
                    menuPrincipal.Append(string.Format("<span class=\"menu-text\">{0}</span>", menu.Attribute("NomeMenu").Value));

                    if (ListaMenus.Any(m => m.Attribute("MenuPai").Value.Equals(MenuID)))
                    {
                        menuPrincipal.Append("<b class=\"arrow fa fa-angle-down\"></b>");
                        menuPrincipal.Append("</a>");
                        menuPrincipal.Append("<ul class=\"submenu\">");
                        this.CarregaMenusFilhosHtml(menuPrincipal, MenuID, ListaMenus);
                        menuPrincipal.Append("</ul>");
                    }
                    else
                        menuPrincipal.Append("</a>");

                    menuPrincipal.Append("</li>");
                }

                return menuPrincipal;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [NonAction]
        private void CarregaMenusFilhosHtml(StringBuilder menuPrincipal, string MenuID, List<XElement> ListaMenus)
        {
            // Carrega os menus filhos de forma recursiva acionada pela função MontarMenus
            try
            {
                //bool AbrirPanel = false;
                foreach (XElement menuFilho in ListaMenus.Where(m => m.Attribute("MenuPai").Value == MenuID).ToList())
                {

                    menuPrincipal.Append("<li>");
                    string UrlNavegacao = menuFilho.Attribute("NavigateURL").Value;
                    //string UrlNavegacao = string.IsNullOrEmpty(this.VirtualPath) ? menuFilho.Attribute("NavigateURL").Value : this.VirtualPath + "/" + menuFilho.Attribute("NavigateURL").Value;
                    menuPrincipal.Append(string.Format("<a href=\"{0}\">", UrlNavegacao));
                    menuPrincipal.Append("<i class=\"icon-double-angle-right\"></i>");
                    menuPrincipal.Append(menuFilho.Attribute("NomeMenu").Value);
                    menuPrincipal.Append("</a>");

                    string SubMenuID = menuFilho.Attribute("MenuID").Value;

                    if (ListaMenus.Any(m => m.Attribute("MenuPai").Value.Equals(SubMenuID)))
                    {
                        menuPrincipal.Append("<ul class=\"submenu\">");
                        this.CarregaMenusFilhosHtml(menuPrincipal, SubMenuID, ListaMenus);
                        menuPrincipal.Append("</ul>");
                    }

                    menuPrincipal.Append("</li>");

                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [NonAction]
        private void MenuPermissao(string menuString, int UsuarioId, int perfilId)
        {
            try
            {
                WSGSI webSerciceGSI = new WSGSI();
                XDocument MenusSistema = new XDocument();
                MenusSistema = XDocument.Parse(menuString);

                List<ItemMenu> listItemMenu = new List<ItemMenu>();

                List<XElement> ListaMenus = (from ms in
                                                 MenusSistema.Descendants("Menu")
                                             select ms).ToList();

                List<XElement> ListaMenusPai = ListaMenus.Where(m => m.Attribute("MenuPai").Value.Equals("6698") && !m.Attribute("NavigateURL").Value.Equals("#")).ToList();
                List<IUrlPermitida> listaMenuOperacao = new List<IUrlPermitida>();

                foreach(XElement menu in ListaMenusPai)
                {
                    var menuId = Convert.ToInt32(menu.Attribute("MenuID").Value);
                    var url = menu.Attribute("NavigateURL").Value;
                    var operacoesMenu = webSerciceGSI.GSI_ConsultarMenuOperacao(UsuarioId, menuId, sUser, sPwd);
                    List<GrupoOperacao> listaOperacoes = new List<GrupoOperacao>();

                    foreach (OperacaoWS op in operacoesMenu)
                    {
                        listaOperacoes.Add(new GrupoOperacao
                        {
                            Operacao = op.NomeOperacao,
                            PerfilId = perfilId
                        });
                    }

                    var urlPermitida = new UrlPermitida
                    {
                        Operacoes = listaOperacoes,
                        Url = url,
                        MenuId = menuId
                    };

                    listaMenuOperacao.Add(urlPermitida);
                }

                //listaMenuOperacao.Add(new UrlPermitida
                //{
                //    MenuId = 0,
                //    Url = "/PortalSistemas/SimularAcesso",
                //    Operacoes = new List<GrupoOperacao> { new GrupoOperacao { Operacao = "CONSULTAR", PerfilId = 305 } }
                //});

                _urlsPermitidas = listaMenuOperacao;

            }
            catch (Exception)
            {
                throw;
            }
        }

        //private void teste(IEnumerable<IItemMenu> listaMenu)
        //{
        //    foreach (var itemMenu in listaMenu.Where(x => x.PerfilId == PerfilId).OrderBy(x => x.Ordem))
        //    {
        //        _sb.Append("<li>");

        //        _sb.Append($"<a href=\"{(string.IsNullOrEmpty(itemMenu.Url) ? "javascript:void(0)" : itemMenu.Url)}\" class='dropdown-toggle'>");
        //        _sb.Append($"<i class='{itemMenu.Icone}'></i>");

        //        _sb.Append($"<span class='menu-text'>{itemMenu.Nome}</span>");

        //        if (itemMenu.SubItens.Count > 0)
        //            _sb.Append("<b class='arrow icon-angle-down'></b>");

        //        _sb.Append("</a>");
        //        if (itemMenu.SubItens.Any())
        //        {
        //            _sb.AppendLine();
        //            _sb.AppendLine("<ul class='submenu' style='display: none; '>");
        //            MontarMenuHtml(itemMenu.SubItens);
        //            _sb.AppendLine("</ul>");
        //        }

        //        _sb.AppendLine("</li>");
        //    }
        //}

    }
}
