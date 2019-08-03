using Arquitetura.Base;
using Arquitetura.Util.Logic;
using Dominio.Autenticacao;
using Dominio.PortalSistemas.ModelView.SimularAcesso;
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

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Controllers.Api
{
    public class SimularAcessoController : ApiController
    {
        private string appAmbiente = ConfigurationManager.AppSettings["AppAmbiente"].ToLower();
        private int sistemaId = Convert.ToInt32(ConfigurationManager.AppSettings["CodGSISistema"]);
        private string sUser = ConfigurationManager.AppSettings["SiglaGSISistema"];
        private string sPwd = ConfigurationManager.AppSettings["SenhaGSISistema"];
        //private byte[] key = Convert.FromBase64String("V65qeYQ9ZEGmND2N2IulotnH0j/0BQp3p8/YiglFqUk=");

        [HttpGet]
        public object GetAcessos([FromUri]SimularAcessoGridFiltro filtro)
        {
            try
            {
                var escopo = new SimularAcessoEscopo();
                var result = escopo.ObterAcessos(filtro, GerenciadorSessao.UsuarioLogado.UsuarioId);

                return new
                {
                    result = result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                return new { mensagens = ex.CriarErroResposta() };
            }
        }

        [HttpPost]
        public object PostSimularAcesso([FromBody]SimularAcessoDados dados)
        {
            try
            {
                if (GerenciadorSessao.UsuarioLogado == null)
                    throw new Exception("Usuário não logado");

                var escopo = new SimularAcessoEscopo();
                bool result;

                if (GerenciadorSessao.UsuarioLogado.AreaId == (int)EPortalSistemasArea.Professor)
                    result = SimularAcessoLoginDocente(dados.GsiUsuarioId, ref escopo);                
                else
                    result = SimularAcessoLoginGSI(dados.GsiUsuarioId, ref escopo);

                return new
                {
                    result = result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                return new { mensagens = ex.CriarErroResposta() };
            }
        }

        [NonAction]
        private bool SimularAcessoLoginGSI(int UsuarioId, ref SimularAcessoEscopo escopo)
        {
            try
            {
                WSGSI webSerciceGSI = new WSGSI();

                //Obtem Usuário do GSI pelo UsuarioId dele
                var usuario = webSerciceGSI.GSI_SelecionaUsuarioID_SO(UsuarioId, sUser, sPwd);
                if (usuario == null)
                    throw new Exception("Usuario não encontrado!");

                //Obtêm os grupos permitidos ao usuário para o sistema
                List<GrupoSistemaUsuarioWS> GrupoSistemaUsuario = webSerciceGSI.GSI_SelecionaGrupoSistemaUsuario_SO(usuario.UsuarioID, sistemaId, sUser, sPwd).ToList();
                if (!GrupoSistemaUsuario.Any())
                    throw new Exception("O usuário não tem permissão para este sistema!");

                //Obtêm a lista de sistemas permitidos ao usuário
                var sistemas = webSerciceGSI.GSI_SelecionaSistemasUsuario(usuario.UsuarioID, sUser, sPwd);

                //Carrega Menus do sistema                        
                string Menu = string.Empty;
                Menu = webSerciceGSI.GSI_SelecionaMenu_TokenCompleto(usuario.UsuarioID, GrupoSistemaUsuario[0].GrupoID, GrupoSistemaUsuario[0].cod_estrutura, sistemaId, sUser, sPwd);
                var menu = this.MontarMenu(Menu);

                //Carrega permissões GeoEstrutura
                //List<int> ListaGeoEstruturaID = new List<int>();
                //foreach (GrupoSistemaUsuarioWS grupo in GrupoSistemaUsuario)
                //{
                //    ListaGeoEstruturaID.Add(grupo.cod_estrutura);
                //}                


                //Mantêm os dados do Portal do Usuário
                escopo.ManterDadosPortalUsuario(GrupoSistemaUsuario[0].cod_estrutura, 
                    usuario.UsuarioID, 
                    usuario.NomeUsuario, 
                    usuario.Email,                     
                    usuario.LoginAD, 
                    usuario.NomeDominio, 
                    GrupoSistemaUsuario[0].GrupoID,
                    GrupoSistemaUsuario[0].NomeGrupo);

                bool SimularAcesso = GerenciadorSessao.UsuarioLogado.SimularAcesso;
                int? UsuarioIdLogin;

                if (!SimularAcesso)
                    UsuarioIdLogin = GerenciadorSessao.UsuarioLogado.UsuarioId;
                else
                    UsuarioIdLogin = GerenciadorSessao.UsuarioLogado.UsuarioIdLogin;

                GerenciadorSessao.UsuarioLogado = new UsuarioAutenticacao
                {
                    NomeCompleto = usuario.NomeUsuario,
                    Perfil = GrupoSistemaUsuario[0].NomeGrupo,
                    UsuarioId = usuario.UsuarioID,
                    MenuHtml = menu.ToString(),
                    ListaSistemasSiglas = sistemas.Select(x => x.SiglaSistema).ToList(),
                    SimularAcesso = true,     
                    UsuarioIdLogin = UsuarioIdLogin,
                    AreaId = GerenciadorSessao.UsuarioLogado.AreaId
                };

                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [NonAction]
        private bool SimularAcessoLoginDocente(int UsuarioId, ref SimularAcessoEscopo escopo)
        {
            try
            {
                var Pessoa = escopo.ObterPessoa(UsuarioId);

                // verifica se os campos foram informados, faz a consulta e verifica se existe algum registro
                if (Pessoa == null)
                    throw new Exception("Registro não encontrado");

                bool SimularAcesso = GerenciadorSessao.UsuarioLogado.SimularAcesso;
                int? UsuarioIdLogin;

                if (!SimularAcesso)
                    UsuarioIdLogin = GerenciadorSessao.UsuarioLogado.UsuarioId;
                else
                    UsuarioIdLogin = GerenciadorSessao.UsuarioLogado.UsuarioIdLogin;

                UsuarioAutenticacao usuario = new UsuarioAutenticacao
                {
                    UnidadeEscolar = "escola",
                    Municipio = "Municipio",
                    NomeCompleto = Pessoa.NomeCompleto,
                    Perfil = "Docente",
                    UsuarioId = Pessoa.PessoaId,
                    MostrarTrocaPerfilUnidadeEscolar = true,
                    PessoaId = Pessoa.PessoaId,
                    AreaId = GerenciadorSessao.UsuarioLogado.AreaId,
                    SimularAcesso = true,
                    UsuarioIdLogin = UsuarioIdLogin
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
        private StringBuilder MontarMenu(string menuString)
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

                int indice = 0; int indiceMaximo = 6;
                string[] listaIcone = new string[6];
                listaIcone[0] = "menu-icon fa fa-home";
                listaIcone[1] = "menu-icon fa fa-server";
                listaIcone[2] = "menu-icon fa fa-folder-open";
                listaIcone[3] = "menu-icon fa fa-file";
                listaIcone[4] = "menu-icon fa fa-envelope";
                listaIcone[5] = "menu-icon fa fa-wrench";

                //Monta os Menus Accordion
                foreach (XElement menu in ListaMenusPai)
                {

                    //Monta os menus recursivamente
                    string MenuID = menu.Attribute("MenuID").Value;

                    menuPrincipal.Append("<li>");
                    string UrlNavegacao = menu.Attribute("NavigateURL").Value;

                    menuPrincipal.Append(string.Format("<a href=\"{0}\" class=\"dropdown-toggle\">", UrlNavegacao));
                    if (indice < indiceMaximo)
                        menuPrincipal.Append("<i class=\"" + listaIcone[indice] + "\"></i>");

                    menuPrincipal.Append(string.Format("<span class=\"menu-text\">{0}</span>", menu.Attribute("NomeMenu").Value));

                    if (ListaMenus.Any(m => m.Attribute("MenuPai").Value.Equals(MenuID)))
                    {
                        menuPrincipal.Append("<b class=\"arrow fa fa-angle-down\"></b>");
                        menuPrincipal.Append("</a>");
                        menuPrincipal.Append("<ul class=\"submenu\">");
                        this.CarregaMenusFilhos(menuPrincipal, MenuID, ListaMenus);
                        menuPrincipal.Append("</ul>");
                    }
                    else
                        menuPrincipal.Append("</a>");

                    menuPrincipal.Append("</li>");
                    indice++;
                }

                return menuPrincipal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [NonAction]
        private void CarregaMenusFilhos(StringBuilder menuPrincipal, string MenuID, List<XElement> ListaMenus)
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
                        this.CarregaMenusFilhos(menuPrincipal, SubMenuID, ListaMenus);
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
    }
}
