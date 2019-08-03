using Arquitetura.Base;
using Arquitetura.Negocio;
using Arquitetura.Servico.UnitOfWork;
using Dominio.PortalSistemas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.PortalSistemas
{
    public class SimularAcessoNegocio : BaseNegocio
    {
        #region Pesquisar

        public IQueryable<PortalUsuarios> ObterUsuarios(IActionObter<PortalUsuarios> repUsuario)
        {
            return repUsuario.ObterTodos(x => x.Status == "A" && x.Dominio != null);
        }

        #endregion

        #region Simular Acesso

        public UnidadeEscolar ObterUnidadeEscolarPorGeoEstruturaId(IActionObter<UnidadeEscolar> repUE, int GeoEstruturaUE)
        {
            return repUE.Obter(x => x.GeoEstruturaId == GeoEstruturaUE && x.EscolaPrincipal == true);
        }

        public PortalUsuarios ObterPortalUsuarioPorLoginAdNomeDominio(IActionObter<PortalUsuarios> repUsuario, string Login, string Dominio)
        {
            return repUsuario.Obter(x => x.Login == Login && x.Dominio == Dominio && x.Status == EStatus.A.ToString());
        }

        public PortalGrupos ObterGrupoPorId(IActionObter<PortalGrupos> repGrupo, int GrupoId)
        {
            return repGrupo.Obter(x => x.GrupoId == GrupoId && x.Status);
        }

        public Pessoa ObterPessoaPorId(IActionObter<Pessoa> repPessoa, int pessoaId)
        {
            return repPessoa.Obter(x => x.PessoaId == pessoaId);
        }

        #endregion
    }
}
