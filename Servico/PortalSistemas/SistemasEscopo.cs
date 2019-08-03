using Arquitetura.Base;
using Arquitetura.Servico;
using Arquitetura.Util.Generic;
using Dominio.PortalSistemas.ModelView.Sistemas;
using Mapeamento;
using Negocio.PortalSistemas;
using Repositorio.PortalSistemas.Sets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servico.PortalSistemas
{
    public class SistemasEscopo : BaseEscopo<PortalSistemasContext>
    {

        #region Sets

        private PortalSistemasSet PortalSistemasSet { get; set; }
        private SistemasNegocio SistemasNegocio { get; set; }

        #endregion

        #region Construtor

        public SistemasEscopo()
        {
            PortalSistemasSet = new PortalSistemasSet(UnitOfWork);
            SistemasNegocio = new SistemasNegocio();
        }

        #endregion

        #region Pesquisar

        public object ObterSistemasPermitidos(List<string> listaSistemasPermitidos, int usuarioId)
        {
            if (listaSistemasPermitidos == null)
                listaSistemasPermitidos = new List<string>();

            var chaveCriptografada = Recursos.CriptografarChaveAcesso(usuarioId.ToString());
            var sistemas = SistemasNegocio.ObterSistemasAtivos(PortalSistemasSet);

            var sistemasAutorizados = sistemas.Where(x => listaSistemasPermitidos.Contains(x.SiglaGSI))
                .Select(x => new SistemasForm
                {
                    NomeSistema = x.NomeSistema,
                    Sigla = x.Sigla,
                    SistemaId = x.SistemaId,
                    LinkSistema = x.LinkSistema + "?us=" + chaveCriptografada,
                    ImagemSistema = x.ImagemSistema
                })
                .Distinct();

            var sistemasPublicos = sistemas.Where(x => x.TipoAcessoId == (int?)ETipoAcessoSistema.Aberto || x.TipoAcessoId == (int?)ETipoAcessoSistema.AutenticacaoPropria)
                .Select(x => new SistemasForm
                {
                    NomeSistema = x.NomeSistema,
                    Sigla = x.Sigla,
                    SistemaId = x.SistemaId,
                    LinkSistema = x.LinkSistema,
                    ImagemSistema = x.ImagemSistema
                })
                .Distinct();

            return sistemasAutorizados.Concat(sistemasPublicos)
                .Distinct()
                .OrderBy(x => x.NomeSistema);
        }

        #endregion

    }
}
