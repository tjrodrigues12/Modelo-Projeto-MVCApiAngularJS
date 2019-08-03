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
    public class PortalSistemasIconeMenuSet : GenericRepository<PortalSistemasContext, PortalSistemasIconeMenu>
    {
        public PortalSistemasIconeMenuSet(UnitOfWorkScope<PortalSistemasContext> unitOfWork)
            : base(unitOfWork)
        { }
    }
}
