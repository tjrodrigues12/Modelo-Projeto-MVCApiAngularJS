using Arquitetura.Servico;
using Dominio.Pronatec;
using Dominio.Relatorios;
using Mapeamento;
using Negocio.Pronatec;
using Negocio.Relatorios;
using Repositorio.Pronatec.Sets;
using System.Collections.Generic;
using System.Linq;

namespace Servico.Relatorios
{
    public class UsuarioPerfilEscopo : BaseEscopo<PronatecContext>
    {
        #region Sets

        private UsuarioPerfilNegocio UsuarioPerfilNegocio { get; set; }

        private MunicipioSet MunicipioSet { get; set; }
        private UnidadeEscolarSet UnidadeEscolarSet { get; set; }

        #endregion

        #region Construtor

        public UsuarioPerfilEscopo()
            : base()
        {
            UsuarioPerfilNegocio = new UsuarioPerfilNegocio();

            MunicipioSet = new MunicipioSet(UnitOfWork);
            UnidadeEscolarSet = new UnidadeEscolarSet(UnitOfWork);

            LimparMensagens();
        }

        #endregion

        public IQueryable<Municipio> ObterMunicipios()
        {
            return UsuarioPerfilNegocio.ObterMunicipios(MunicipioSet);
        }

        public IQueryable<UnidadeEscolar> ObterUnidadesEscolares(int municipioId)
        {
            return UsuarioPerfilNegocio.ObterUnidadesEscolares(UnidadeEscolarSet, municipioId);
        }

        public byte[] ObterRelatorioUsuariosSemPerfil(string nomeUsuario)
        {
            var parametros = new List<ParametroRelatorio>
            {
                new ParametroRelatorio { IdParametro = "NomeUsuario", Valor = nomeUsuario }
            };

            var obj = new ObjetoRelatorio()
            {
                Nome = "relUsuariosSemPerfil",
                Extensao = "pdf",
                Arquivo = (new ExportarRelatorioRS()).RelatorioBinarioRS("pdf", "/relUsuariosSemPerfil", parametros)
            };

            return obj.Arquivo;
        }

        public byte[] ObterRelatorioUsuariosComPerfis(int municipioId, int unidadeEscolarId, string nomeUsuario)
        {
            var parametros = new List<ParametroRelatorio>
            {
                new ParametroRelatorio { IdParametro = "MunicipioId", Valor = municipioId },
                new ParametroRelatorio { IdParametro = "UnidadeEscolarId", Valor = unidadeEscolarId },
                new ParametroRelatorio { IdParametro = "NomeUsuario", Valor = nomeUsuario }
            };

            var obj = new ObjetoRelatorio()
            {
                Nome = "relUsuariosComPerfis",
                Extensao = "pdf",
                Arquivo = (new ExportarRelatorioRS()).RelatorioBinarioRS("pdf", "/relUsuariosComPerfis", parametros)
            };

            return obj.Arquivo;
        }
    }
}