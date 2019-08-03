using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Arquitetura.Base;
using Arquitetura.Util;
using Dominio.Autenticacao;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;

namespace Servico.Seguranca
{
    [AttributeUsage(AttributeTargets.Method)]
    public class CustomApiAuthorize : AuthorizeAttribute
    {
        private readonly List<string> _operacoes;
        private readonly EAuthorize _condicaoAutorizacao;

        public CustomApiAuthorize()
        {
            _operacoes = new List<string>();
            _condicaoAutorizacao = EAuthorize.NaoIdentificada;
        }

        /// <summary>
        /// Controle de permissões do sistema em WebApi
        /// </summary>
        /// <param name="operacoes">
        /// Operações que o método deve exigir nas permissões
        /// do usuário para ser executado.
        /// </param>
        /// <param name="condicaoAutorizacao">
        /// Condição de autorização, ByPass deixa executar ignorando as operações
        /// Bloquear com prioridade maior impede o uso do método independente de quem executa
        /// e Gestor para que apenas aqueles com esse perfil possam fazer uso do método
        /// </param>
        public CustomApiAuthorize(string[] operacoes, EAuthorize condicaoAutorizacao)
        {
            _operacoes = new List<string>(operacoes.Select(x => x.ToUpper()));
            _condicaoAutorizacao = condicaoAutorizacao;
        }

        /// <summary>
        /// Controle de permissões do sistema em WebApi
        /// </summary>
        /// <param name="operacoes">
        /// Operações que o método deve exigir nas permissões
        /// do usuário para ser executado.
        /// </param>
        public CustomApiAuthorize(string[] operacoes)
        {
            _operacoes = new List<string>(operacoes.Select(x => x.ToUpper()));
            _condicaoAutorizacao = EAuthorize.NaoIdentificada;
        }

        /// <summary>
        /// Controle de permissões do sistema em WebApi
        /// </summary>
        /// <param name="operacao">
        /// Operação que o método deve exigir nas permissões
        /// do usuário para ser executado.
        /// </param>
        public CustomApiAuthorize(string operacao)
        {
            _operacoes = new List<string>() { operacao.ToUpper() };
            _condicaoAutorizacao = EAuthorize.NaoIdentificada;
        }

        /// <summary>
        /// Ignora todas as permissões e concede acesso ao usuário
        /// </summary>
        /// <param name="condicaoAutorizacao">
        /// Condição de autorização, ByPass deixa executar ignorando as operações
        /// Bloquear com prioridade maior impede o uso do método independente de quem executa
        /// e Gestor para que apenas aqueles com esse perfil possam fazer uso do método
        /// </param>
        public CustomApiAuthorize(EAuthorize condicaoAutorizacao)
        {
            _operacoes = new List<string>();
            _condicaoAutorizacao = condicaoAutorizacao;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (AuthorizeRequest(actionContext))
            {
                return;
            }

            HandleUnauthorizedRequest(actionContext);
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            UsuarioAutenticacao usuarioLogado = null;

            if (System.Web.HttpContext.Current.Session != null)
                usuarioLogado = (UsuarioAutenticacao)System.Web.HttpContext.Current.Session["UsuarioLogado"];

            actionContext.Response =
                new HttpResponseMessage(usuarioLogado == null ? HttpStatusCode.Unauthorized : HttpStatusCode.Forbidden);
        }

        private bool AuthorizeRequest(HttpActionContext actionContext)
        {
            UsuarioAutenticacao usuarioLogado = null;

            if (System.Web.HttpContext.Current.Session != null)
                usuarioLogado = (UsuarioAutenticacao)System.Web.HttpContext.Current.Session["UsuarioLogado"];

            if (_condicaoAutorizacao == EAuthorize.Bloquear ||
                (!_operacoes.Any() && _condicaoAutorizacao != EAuthorize.ByPass && _condicaoAutorizacao != EAuthorize.Gestor) ||
                usuarioLogado == null)
                return false;

            if (!GerenciadorConfiguracao.ValidarAutorizacao)
                return true;

            if (_condicaoAutorizacao == EAuthorize.ByPass)
                return true;
            
            var nomeAction = actionContext.ActionDescriptor.ActionName;
            var nomeController = actionContext.ControllerContext.ControllerDescriptor.ControllerName;

            UrlBaseAttribute urlBase = null;
            var controllerAtt = actionContext.ControllerContext.Controller.GetType()
                                .GetCustomAttributes(false)
                                .Where(att => att.GetType() == typeof(UrlBaseAttribute))
                                .ToList();

            if (controllerAtt.Any())
                urlBase = controllerAtt.Single() as UrlBaseAttribute;

            if (urlBase == null)
                throw new Exception($"A controladora {nomeController} da action {nomeAction} deve ser decorada com o atributo UrlBase");

            var operacoes = usuarioLogado.UrlsPermitidas.Where(x => x.Operacoes.Count() > 0
                                && (x.Url.ToLower().Equals(urlBase.UrlAcaoMvc.EndsWith("index") ? urlBase.UrlAcaoMvc.Replace("/index", "") : urlBase.UrlAcaoMvc)))
                                    .SelectMany(x => x.Operacoes.Select(e => e.Operacao)
                                        .Select(y => y.ToUpper()));

            if (operacoes.Any(o => o == EAuthorize.Bloquear.StrVal().ToUpper()))
                return false;

            if (_condicaoAutorizacao == EAuthorize.Gestor && operacoes.Any(x => x == EAuthorize.Gestor.StrVal().ToUpper()))
                return true;

            return _operacoes.Intersect(operacoes).Any();
        }
    }
}
