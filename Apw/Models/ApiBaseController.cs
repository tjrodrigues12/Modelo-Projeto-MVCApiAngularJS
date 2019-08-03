using Arquitetura.Base;
using Servico.Seguranca;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SISTEMAS_SED_APW.Models
{
    public class ApiBaseController : ApiController
    {
        private List<string> _permissoes;
        public List<string> Permissoes
        {
            get
            {
                return _permissoes ?? (_permissoes = ObterPermissoes());
            }
            private set
            {
                _permissoes = value;
            }
        }

        public bool IsGestor
        {
            get
            {
                return Permissoes.Any(p => p == EAuthorize.Gestor.StrVal().ToUpper());
            }
        }

        public List<string> ObterPermissoes()
        {
            var actionContext = ActionContext;

            UrlBaseAttribute urlBase = null;
            var controllerAtt = actionContext.ControllerContext.Controller.GetType()
                                .GetCustomAttributes(false)
                                .Where(att => att.GetType() == typeof(UrlBaseAttribute))
                                .ToList();

            if (controllerAtt.Any())
                urlBase = controllerAtt.Single() as UrlBaseAttribute;

            var urls = GerenciadorSessao.UsuarioLogado.UrlsPermitidas.Where(up => up.Url.ToLower().Contains(urlBase.UrlAcaoMvc.EndsWith("index") ? urlBase.UrlAcaoMvc.Replace("/index", "") : urlBase.UrlAcaoMvc));
            var operacoes = (from url in urls
                             from operacao in url.Operacoes
                             select operacao.Operacao.ToUpper()).ToList();

            return operacoes;
        }
    }
}