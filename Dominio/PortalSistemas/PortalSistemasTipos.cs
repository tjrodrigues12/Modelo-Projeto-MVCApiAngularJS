using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PortalSistemasTipos
    {
        public int TipoSistemaId { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public string NaturezaOperacao { get; set; }
        public DateTime DataOperacao { get; set; }
        public int UsuarioOperacao { get; set; }
    }
}
