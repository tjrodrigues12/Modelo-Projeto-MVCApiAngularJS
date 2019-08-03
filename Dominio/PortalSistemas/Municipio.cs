using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class Municipio
    {
        public int MunicipioId { get; set; }
        public string NomeMunicipio { get; set; }
        public int? MunicipioCensoId { get; set; }
        public int? GeoEstruturaId { get; set; }
    }
}
