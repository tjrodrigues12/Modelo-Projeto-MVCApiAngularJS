using Dominio.PortalSistemas;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapeamento.PortalSistemas
{
    public class PerfisSistemasConfiguration : EntityTypeConfiguration<PerfisSistemas>
    {
        public PerfisSistemasConfiguration()
        {
            ToTable("PerfisSistemas", "sgp")
                .HasKey( x => new { x.SistemaId, x.PerfilId });
        }
    }
}
