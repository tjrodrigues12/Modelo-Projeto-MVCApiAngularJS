using Servico.PortalSistemas;
using SISTEMAS_SED_APW.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Controllers.Api
{
    public class SistemasController : ApiController
    {
        [HttpGet]
        public object GetSistemasPermitidos()
        {
            try
            {
                var escopo = new SistemasEscopo();
                var result = escopo.ObterSistemasPermitidos(GerenciadorSessao.UsuarioLogado == null ? new List<string>() : GerenciadorSessao.UsuarioLogado.ListaSistemasSiglas, GerenciadorSessao.UsuarioLogado == null ? 0 : GerenciadorSessao.UsuarioLogado.UsuarioId);

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
    }
}
