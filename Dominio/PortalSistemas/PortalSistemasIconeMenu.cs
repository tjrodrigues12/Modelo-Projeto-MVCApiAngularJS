using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PortalSistemasIconeMenu
    {
        public int PortalSistemasIconeMenuId { get; set; }
        public int SistemaId { get; set; }
        public int MenuId { get; set; }
        public string ClasseCss { get; set; }
    }
}
