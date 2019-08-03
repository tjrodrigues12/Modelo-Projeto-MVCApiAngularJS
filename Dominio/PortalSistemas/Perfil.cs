using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class Perfil
    {
        public int PerfilId { get; set; }
        public string NomePerfil { get; set; }
        public string DescricaoPerfil { get; set; }
        public bool Ativo { get; set; }
    }
}
