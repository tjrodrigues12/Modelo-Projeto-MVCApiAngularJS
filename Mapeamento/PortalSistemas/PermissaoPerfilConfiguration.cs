using Dominio.PortalSistemas;
using System.Data.Entity.ModelConfiguration;

namespace Mapeamento.PortalSistemas
{
    public class PermissaoPerfilConfiguration : EntityTypeConfiguration<PermissaoPerfil>
    {
        public PermissaoPerfilConfiguration()
        {
            ToTable("PermissaoPerfil", "sgp")
                .HasKey(x => new { x.PerfilIdDestino, x.PerfilIdOrigem });
        }
    }
}
