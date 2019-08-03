using Dominio.PortalSistemas;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapeamento.PortalSistemas
{
    public class PortalUsuariosConfiguration : EntityTypeConfiguration<PortalUsuarios>
    {
        public PortalUsuariosConfiguration()
        {
            ToTable("PortalUsuarios", "dbo")
                .HasKey(x => x.UsuarioId);
        }
    }
}
