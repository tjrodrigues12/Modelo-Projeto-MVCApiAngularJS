using Arquitetura.Base;
using Arquitetura.Util;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SISTEMAS_SED_APW.Models
{
    public class BaseController : Controller
    {
        private readonly List<string> _permissoesBasicas = new List<string> { "GESTOR", "CONSULTAR", "INCLUIR", "ALTERAR", "EXCLUIR" };

        /// <summary>
        /// Permissões da Uri invocada
        /// </summary>
        public ReadOnlyCollection<string> Permissoes { get; private set; }


        private void CarregarPermissoesGsiParaAngular()
        {
            var permissoes = new List<string>();

            permissoes.AddRange(_permissoesBasicas);

            permissoes.AddRange(Permissoes.Where(x => !_permissoesBasicas.Contains(x)));

            var result = new StringBuilder();

            foreach (var permissao in permissoes)
            {
                result.Append(string.Format("{0}={1};", permissao.ToUpper().Trim(), Permissoes.Any(p => p.ToUpper().Trim() == permissao.ToUpper().Trim()) ? 1 : 0));
            }

            ViewData["gsiPermissoes"] = result.ToString();
        }

        public BaseController()
        {

        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                if (ControllerContext != null && ControllerContext.RouteData != null && ControllerContext.RouteData.Values != null)
                {
                    var url = string.Empty;

                    var area = filterContext.RouteData.DataTokens["area"];

                    if (area != null) url += string.Format("/{0}", area);

                    var controller = filterContext.RouteData.Values["controller"];

                    if (controller != null) url += string.Format("/{0}", controller);

                    var UrlsPermitidas = GerenciadorSessao.UsuarioLogado.UrlsPermitidas.ToList();

                    var perfiId = GerenciadorSessao.UsuarioLogado.PerfilId;

                    var item = UrlsPermitidas.Find(tb => tb.Url.ToLower().Equals(url.ToLower()));

                    if (item != null)
                        Permissoes = item.ObterOperacoesParaPerfilSelecionado(perfiId).AsReadOnly();

                    if (Permissoes == null && GerenciadorConfiguracao.ValidarAutorizacao)
                        filterContext.Result = new RedirectResult(Url.Action("Index", "Home", new { area = "" }));

                    if (filterContext.RouteData.Values["action"].ToString() == "Index" && Permissoes != null)
                        CarregarPermissoesGsiParaAngular();
                }

                base.OnActionExecuting(filterContext);
            }
            catch (Exception)
            {
                filterContext.Result = new RedirectResult(Url.Action("Index", "Home", new { area = "" }));
            }            
        }
    }
}