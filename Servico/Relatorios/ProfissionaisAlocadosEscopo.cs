using Arquitetura.Base;
using Arquitetura.Servico;
using Dominio.Pronatec;
using Dominio.Relatorios;
using Mapeamento;
using Negocio.Relatorios;
using Repositorio.Pronatec.Sets;
using System.Collections.Generic;
using System.Linq;

namespace Servico.Relatorios
{
    public class ProfissionaisAlocadosEscopo : BaseEscopo<PronatecContext>
    {
        #region Sets

        private ProfissionaisAlocadosNegocio ProfissionaisAlocadosNegocio { get; set; }

        private MunicipioSet MunicipioSet { get; set; }
        private UnidadeEscolarSet UnidadeEscolarSet { get; set; }

        #endregion

        #region Construtor

        public ProfissionaisAlocadosEscopo()
            : base()
        {
            ProfissionaisAlocadosNegocio = new ProfissionaisAlocadosNegocio();

            MunicipioSet = new MunicipioSet(UnitOfWork);
            UnidadeEscolarSet = new UnidadeEscolarSet(UnitOfWork);

            LimparMensagens();
        }

        #endregion

        public IQueryable<Municipio> ObterMunicipios()
        {
            return ProfissionaisAlocadosNegocio.ObterMunicipios(MunicipioSet);
        }

        public IQueryable<UnidadeEscolar> ObterUnidadesEscolares(int municipioId)
        {
            return ProfissionaisAlocadosNegocio.ObterUnidadesEscolares(UnidadeEscolarSet, municipioId);
        }

        public byte[] ObterRelatorioProfissionaisAlocados(int municipioId, int unidadeEscolarId, string nomeUsuario)
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
                Extensao = EFormatoRelatorio.EXCEL.ToString().ToLower(),
                Arquivo = (new ExportarRelatorioRS()).RelatorioBinarioRS(EFormatoRelatorio.EXCEL.ToString().ToLower(), "/relProfissionaisAlocados", parametros)
            };

            return obj.Arquivo;
        }
    }
}