using System;
using Arquitetura.Base;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dominio.Autenticacao
{
    [Serializable]
    public class UsuarioAutenticacao : IUsuarioAutenticacao
    {
        private StringBuilder _sb = new StringBuilder();
        private string menuHtml;
        private List<IItemMenu> _menuCompleto = new List<IItemMenu>();
        private List<IUrlPermitida> _urlsPermitidas = new List<IUrlPermitida>();
        

        public int UsuarioId { get; set; }
        public int PessoaId { get; set; }
        public int AreaId { get; set; }
        public string Email { get; set; }
        public string NomeCompleto { get; set; }
        public bool MostrarTrocaPerfilUnidadeEscolar { get; set; }
        public int PerfilId { get; set; }
        public string Perfil { get; set; }
        public int UnidadeEscolarId { get; set; }
        public string UnidadeEscolar { get; set; }
        public string Municipio { get; set; }
        public bool AtualizarCadastro { get; set; }
        public bool SimularAcesso { get; set; }
        public int? UsuarioIdLogin { get; set; }
        public List<IOperacaoUsuario> OperacoesAutorizadas { get; set; }
        public List<string> ListaSistemasSiglas { get; set; }

        public List<IUrlPermitida> UrlsPermitidas
        {
            get { return _urlsPermitidas.Where(e => e.Operacoes.Any(x => x.PerfilId == this.PerfilId)).ToList(); }

            set { _urlsPermitidas = value; }
        }

        public string MenuHtml
        {
            get
            {
                if (string.IsNullOrEmpty(menuHtml) && ListaItensMenu.Count > 0)
                {
                    this.MontarMenuHtml(ListaItensMenu);
                    menuHtml = $"<ul class='nav nav-list'>{_sb}</ul>";
                }
                return menuHtml;
            }
            set
            {
                menuHtml = value;
            }
        }
        //public List<IItemMenu> ListaItensMenu { get; set; }
        public List<IItemMenu> ListaItensMenu
        {
            get
            {
                return this._menuCompleto.Where(e => e.PerfilId == this.PerfilId).Distinct().ToList();
            }
            set
            {
                _menuCompleto = value;
            }
        }

        private void MontarMenuHtml(IEnumerable<IItemMenu> listaMenu)
        {
            foreach (var itemMenu in listaMenu.Where(x => x.PerfilId == PerfilId).OrderBy(x => x.Ordem))
            {
                _sb.Append("<li>");

                _sb.Append($"<a href=\"{(string.IsNullOrEmpty(itemMenu.Url) ? "javascript:void(0)" : itemMenu.Url)}\" class='dropdown-toggle'>");
                _sb.Append($"<i class='{itemMenu.Icone}'></i>");

                _sb.Append($"<span class='menu-text'>{itemMenu.Nome}</span>");

                if (itemMenu.SubItens.Count > 0)
                    _sb.Append("<b class='arrow icon-angle-down'></b>");

                _sb.Append("</a>");
                if (itemMenu.SubItens.Any())
                {
                    _sb.AppendLine();
                    _sb.AppendLine("<ul class='submenu' style='display: none; '>");
                    MontarMenuHtml(itemMenu.SubItens);
                    _sb.AppendLine("</ul>");
                }

                _sb.AppendLine("</li>");
            }
        }

        public void RecarregarMenu()
        {
            menuHtml = null;

            _sb = new StringBuilder();
        }
    }
}