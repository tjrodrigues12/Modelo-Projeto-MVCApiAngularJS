using Arquitetura.Base;
using PronatecAPW.Models;
using Servico.Pronatec;
using Servico.Seguranca;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PronatecAPW.Controllers.Api
{
    public class GenController : ApiController
    {
        #region Trocar Unidade Escolar

        [HttpGet]
        [CustomApiAuthorize(EAuthorize.ByPass)]
        public object GetPerfisParaTrocarUnidadeEscolar()
        {
            object retorno = null;

            try
            {
                var escopo = new UsuarioEscopo();

                var result = escopo.ObterPerfisParaTrocarUnidadeEscolar(GerenciadorSessao.UsuarioLogado.UsuarioId).Select(x => new
                {
                    perfilId = x.PerfilId,
                    perfil = x.Descricao
                })
                .Distinct()
                .OrderBy(x => x.perfil);

                retorno = new
                {
                    result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                retorno = new { mensagens = ex.CriarErroResposta() };
            }

            return retorno;
        }

        [HttpGet]
        [CustomApiAuthorize(EAuthorize.ByPass)]
        public object GetMunicipiosParaTrocarUnidadeEscolar(int perfilId)
        {
            object retorno = null;

            try
            {
                var escopo = new UsuarioEscopo();

                var result = escopo.ObterMunicipiosParaTrocarUnidadeEscolar(GerenciadorSessao.UsuarioLogado.UsuarioId, perfilId).Select(x => new
                {
                    municipioId = x.MunicipioId,
                    municipio = x.NomeMunicipio
                })
                .Distinct()
                .OrderBy(x => x.municipio);

                retorno = new
                {
                    result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                retorno = new { mensagens = ex.CriarErroResposta() };
            }

            return retorno;
        }

        [HttpGet]
        [CustomApiAuthorize(EAuthorize.ByPass)]
        public object GetUnidadesEscolaresParaTrocarUnidadeEscolar(int perfilId, int municipioId)
        {
            object retorno = null;

            try
            {
                var escopo = new UsuarioEscopo();

                var result = escopo.ObterUnidadesEscolaresParaTrocarUnidadeEscolar(GerenciadorSessao.UsuarioLogado.UsuarioId, perfilId, municipioId).Select(x => new
                {
                    unidadeEscolarId = x.UnidadeEscolarId,
                    unidadeEscolar = x.NomeUnidadeEscolar
                })
                .Distinct()
                .OrderBy(x => x.unidadeEscolar);

                retorno = new
                {
                    result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                retorno = new { mensagens = ex.CriarErroResposta() };
            }

            return retorno;
        }

        [HttpPut]
        [CustomApiAuthorize(EAuthorize.ByPass)]
        public object PutAlterarParaTrocarUnidadeEscolar(int perfilId, int municipioId, int unidadeEscolarId)
        {
            object retorno = null;

            try
            {
                var escopo = new UsuarioEscopo();

                var perfil = escopo.ObterPerfilParaTrocarUnidadeEscolar( perfilId);
                var unidadeEscolar = escopo.ObterUnidadeEscolarParaTrocarUnidadeEscolar(unidadeEscolarId);

                GerenciadorSessao.UsuarioLogado.PerfilId = perfil.PerfilId;
                GerenciadorSessao.UsuarioLogado.Perfil = perfil.Descricao;
                GerenciadorSessao.UsuarioLogado.Municipio = unidadeEscolar.Municipio.NomeMunicipio;
                GerenciadorSessao.UsuarioLogado.UnidadeEscolarId = unidadeEscolar.UnidadeEscolarId;
                GerenciadorSessao.UsuarioLogado.UnidadeEscolar = unidadeEscolar.NomeUnidadeEscolar;

                GerenciadorSessao.UsuarioLogado.RecarregarMenu();

                var result = true;           

                retorno = new
                {
                    result,
                    mensagens = !escopo.ExistemErros ? escopo.MensagensSucesso : escopo.MensagensErro
                };
            }
            catch (Exception ex)
            {
                retorno = new { mensagens = ex.CriarErroResposta() };
            }

            return retorno;
        }

        #endregion
    }
}