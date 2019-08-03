using Dominio.PortalSistemas;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapeamento.PortalSistemas
{
    public class PortalSistemasIconeMenuConfiguration : EntityTypeConfiguration<PortalSistemasIconeMenu>
    {
        public PortalSistemasIconeMenuConfiguration()
        {
            ToTable("PortalSistemasIconeMenu", "dbo")
                .HasKey(x => x.PortalSistemasIconeMenuId);
        }
    }
}
