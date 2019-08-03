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
    public class PessoaSet : GenericRepository<PortalSistemasContext, Pessoa>
    {
        public PessoaSet(UnitOfWorkScope<PortalSistemasContext> unitOfWork)
            : base(unitOfWork)
        { }
    }
}
