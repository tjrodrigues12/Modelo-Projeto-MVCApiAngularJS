using Arquitetura.Base;
using Arquitetura.Servico;
using Arquitetura.Util.Logic;
using Dominio.Autenticacao;
using Dominio.PortalSistemas.ModelView.Login;
using Mapeamento;
using System.Collections.Generic;
using System.Linq;
using Servico.WebServiceGSI;
using System;
using System.Security.Cryptography;

namespace Servico.Seguranca
{
    public class Autenticacao 
    {
        private IUsuarioAutenticacao _usuarioAutenticacao;

        private List<IOperacaoUsuario> _listaOperacoes = new List<IOperacaoUsuario>();
        private List<IUrlPermitida> _urlsPermitidas = new List<IUrlPermitida>();

        private string _menuHtml { get; set; }
        private bool _mostrarTrocaPerfilUnidadeEscolar { get; set; }
        private int _perfilId { get; set; }
        private string _perfil { get; set; }
        private int _unidadeEscolarId { get; set; }
        private string _unidadeEscolar { get; set; }
        private string _municipio { get; set; }


        private readonly List<IItemMenu> _menuCompleto = new List<IItemMenu>();
        private List<ItemMenu> _menu = new List<ItemMenu>();

        public IUsuarioAutenticacao UsuarioAutenticacaoLogado
        {
            get { return _usuarioAutenticacao; }
        }

        public Autenticacao()
        {

        }

        public bool Autenticar(Autenticacao_GrupoSistemaUsuario_AmbienteWSNomeSocial[] usuario)
        {
            Servico.WebServiceGSI.WSGSI 
        }

        public void CarregarPerfil(int usuarioId)
        {
            ObterPerfil(usuarioId);

            ObterMenuComListaPerfil(usuarioId);
        }

        private void ObterMenu(int perfilId)
        {
            var todosMenusPai = this.ObterTodosMenusPai(perfilId);

            var todosMenusFolhasPerfil = this.ObterTodosMenusFolhasPorPerfil(perfilId);

            _menu = todosMenusFolhasPerfil.Union(todosMenusPai).ToList();

            MontarMenu(perfilId);

            _urlsPermitidas.Add(new UrlPermitida
            {
                MenuId = 0,
                Url = "/Pronatec/AtualizacaoCadastral"
            });

            _urlsPermitidas.Add(new UrlPermitida
            {
                MenuId = 0,
                Url = "/Pronatec/DadosCadastrais"
            });
        }

        private void MontarMenu(int perfilId)
        {
            var ListaMenusPai = _menu.Where(m => m.Url.Trim().Equals("#")); //m.MenuPaiId == null);

            foreach (var menu in ListaMenusPai)
            {
                bool load = false;

                if (_menu.Any(m => m.MenuPaiId == menu.MenuId))
                {
                    load = true;
                    this.CarregaMenusFilhos(menu, perfilId);
                }

                if (load)
                    _menuCompleto.Add(menu);
            }
        }

        private void CarregaMenusFilhos(ItemMenu menu, int perfilId)
        {
            foreach (var menuFilho in _menu.Where(m => m.MenuPaiId == menu.MenuId))
            {
                menu.AdicionarSubItem(menuFilho);

                if (_menu.Any(m => m.MenuPaiId == menuFilho.MenuId))
                {
                    this.CarregaMenusFilhos(menuFilho, perfilId);
                }

                _urlsPermitidas.Add(new UrlPermitida
                {
                    MenuId = menuFilho.MenuId,
                    Url = menuFilho.Url,
                    Operacoes =
                        //menuFilho.Operacoes == null ? new List<GrupoOperacao>() : 
                        menuFilho.Operacoes?.Select(operacao => new GrupoOperacao { PerfilId = perfilId, Operacao = operacao }).ToList()
                });
            }
        }

        private List<GrupoOperacao> RetornarOperacoesPermitidas(int perfilId)
        {
            return new List<GrupoOperacao>() {
                new GrupoOperacao {
                    Operacao = "GESTOR",
                    PerfilId = perfilId
                },new GrupoOperacao {
                    Operacao = "CONSULTAR",
                    PerfilId = perfilId
                },new GrupoOperacao {
                    Operacao = "INCLUIR",
                    PerfilId = perfilId
                },new GrupoOperacao {
                    Operacao = "ALTERAR",
                    PerfilId = perfilId
                },new GrupoOperacao {
                    Operacao = "EXCLUIR",
                    PerfilId = perfilId
                }
            };
        }

        private List<ItemMenu> ObterTodosMenusPai(int perfilId)
        {
            var queryMenuPai = (from tab1 in MenuSet.ObterTodos()
                                where tab1.Url.Trim().Equals("#")
                                select new ItemMenu
                                {
                                    PerfilId = perfilId,
                                    MenuId = tab1.MenuId,
                                    Ordem = tab1.Ordem,
                                    MenuPaiId = tab1.MenuPaiId,
                                    Nome = tab1.Nome,
                                    Url = tab1.Url,
                                    Icone = tab1.Url
                                }).Distinct();

            return queryMenuPai.ToList();
        }

        private List<ItemMenu> ObterTodosMenusFolhasPorPerfil(int perfilId)
        {
            var groupMenuOperacoes = (from tab1 in MenuPerfilOperacaoSet.ObterTodos()
                                      where tab1.PerfilId == perfilId
                                         && tab1.Ativo
                                         && tab1.Perfil.Ativo
                                         && tab1.MenuOperacao.Ativo
                                      group tab1.MenuOperacao.Operacao by tab1.MenuOperacao.Menu into g
                                      select new ItemMenu
                                      {
                                          PerfilId = perfilId,
                                          MenuId = g.Key.MenuId,
                                          Ordem = g.Key.Ordem,
                                          MenuPaiId = g.Key.MenuPaiId,
                                          Nome = g.Key.Nome,
                                          Url = g.Key.Url,
                                          Icone = g.Key.Url,
                                          Operacoes = g.Distinct().ToList(),
                                      }).ToList();

            return groupMenuOperacoes;
        }
    }
}