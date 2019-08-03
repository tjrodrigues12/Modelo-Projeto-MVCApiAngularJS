using Arquitetura.Negocio;
using Arquitetura.Servico.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.PortalSistemas
{
    public class SistemasNegocio : BaseNegocio
    {

        public IQueryable<Dominio.PortalSistemas.PortalSistemas> ObterSistemasAtivos(IActionObter<Dominio.PortalSistemas.PortalSistemas> repPortalSistemas)
        {
            return repPortalSistemas.ObterTodos(x => x.Status == "A");
        }

    }
}
