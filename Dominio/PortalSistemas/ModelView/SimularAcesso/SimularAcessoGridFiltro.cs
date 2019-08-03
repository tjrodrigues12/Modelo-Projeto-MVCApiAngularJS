using Arquitetura.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas.ModelView.SimularAcesso
{
    public class SimularAcessoGridFiltro : BaseFiltroPaginado
    {
        public int FiltroId { get; set; }
        public string Busca { get; set; }
    }
}
