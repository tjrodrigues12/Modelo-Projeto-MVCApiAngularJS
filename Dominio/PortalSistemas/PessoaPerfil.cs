using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PessoaPerfil
    {
        public int PessoaPerfilId { get; set; }
        public int PessoaId { get; set; }
        public int? PessoaRHRegistroEmpregoId { get; set; }
        public int PerfilId { get; set; }
        public bool Ativo { get; set; }
    }
}
