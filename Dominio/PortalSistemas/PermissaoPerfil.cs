using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PermissaoPerfil
    {
        public int PerfilIdOrigem { get; set; }
        public int PerfilIdDestino { get; set; }
        public bool Alterar { get; set; }
        public bool AtivarDesativar { get; set; }
        public bool SimularAcesso { get; set; }
        public bool Lotacao { get; set; }
        public bool LotacaoDocente { get; set; }
    }
}
