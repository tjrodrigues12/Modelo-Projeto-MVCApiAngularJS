using Arquitetura.Servico.UnitOfWork;
using Mapeamento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositorio.PortalSistemas.Sets
{
    public class PortalSistemasSet : GenericRepository<PortalSistemasContext, Dominio.PortalSistemas.PortalSistemas>
    {
        public PortalSistemasSet(UnitOfWorkScope<PortalSistemasContext> unitOfWork)
            : base(unitOfWork)
        { }
    }
}
