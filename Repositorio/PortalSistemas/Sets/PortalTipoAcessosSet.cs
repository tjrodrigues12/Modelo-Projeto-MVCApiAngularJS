using Arquitetura.Servico.UnitOfWork;
using Dominio.PortalSistemas;
using Mapeamento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositorio.PortalSistemas.Sets
{
    public class PortalTipoAcessosSet : GenericRepository<PortalSistemasContext, PortalTipoAcessos>
    {
        public PortalTipoAcessosSet(UnitOfWorkScope<PortalSistemasContext> unitOfWork)
            : base(unitOfWork)
        { }
    }
}
