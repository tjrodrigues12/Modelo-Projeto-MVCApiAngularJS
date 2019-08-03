using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PortalUsuarios
    {
        public int UsuarioId { get; set; }
        public int? GSIUsuarioId { get; set; }
        public string Login { get; set; }
        public string Dominio { get; set; }
        public string NomeUsuario { get; set; }
        public string Email { get; set; }
        public int? GeoEstruturaId { get; set; }
        public int UnidadeEscolarId { get; set; }
        public string Status { get; set; }
        public int? SetorId { get; set; }
        public string Cpf { get; set; }
        public UnidadeEscolar UnidadeEscolar { get; set; }
    }
}
