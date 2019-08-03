using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapeamento.PortalSistemas
{
    public class PortalSistemasConfiguration : EntityTypeConfiguration<Dominio.PortalSistemas.PortalSistemas>
    {
        public PortalSistemasConfiguration()
        {
            ToTable("PortalSistemas", "dbo")
                .HasKey(x => x.SistemaId);
        }
    }
}
