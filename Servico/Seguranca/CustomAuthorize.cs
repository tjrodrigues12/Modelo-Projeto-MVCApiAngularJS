using Dominio.Autenticacao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Servico.Seguranca
{
    public class CustomAuthorize : ActionFilterAttribute, IAuthorizationFilter
    {
        public string Area { get; private set; }

        public CustomAuthorize(string area)
        {
            if (string.IsNullOrWhiteSpace(area))
                throw new ArgumentNullException(nameof(area));

            Area = area.Trim().ToLower();
        }

        private bool Authorize(AuthorizationContext filterContext)
        {
            UsuarioAutenticacao usuarioLogado = null;

            if (filterContext.HttpContext.Session != null)
            {
                usuarioLogado = (UsuarioAutenticacao)filterContext.HttpContext.Session["UsuarioLogado"];
            }

            if (Area.Equals("portalsistemas"))
                return usuarioLogado != null;

            return false;
        }

        private bool AtualizarCadastro(AuthorizationContext filterContext)
        {
            UsuarioAutenticacao usuarioLogado = null;

            if (filterContext.HttpContext.Session != null)
            {
                usuarioLogado = (UsuarioAutenticacao)filterContext.HttpContext.Session["UsuarioLogado"];
            }

            return usuarioLogado != null && usuarioLogado.AtualizarCadastro;
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var parametrosAction = filterContext.ActionDescriptor.GetCustomAttributes(typeof(IgnorarLoginAttribute), true);
            var parametrosController = filterContext.Controller.GetType().GetCustomAttributes(typeof(IgnorarLoginAttribute), true);

            var ignorarLogin = parametrosAction.Any() || parametrosController.Any();

            if (!ignorarLogin)
            {
                if (!Authorize(filterContext))
                {
                    //filterContext.Result = new RedirectResult("~/acesso/");
                }

                if(AtualizarCadastro(filterContext))
                {
                    //filterContext.Result = new RedirectResult("~/pronatec/atualizacaoCadastral/");
                }
            }
        }
    }
}
