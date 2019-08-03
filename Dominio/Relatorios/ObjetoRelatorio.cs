using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Relatorios
{
    public class ObjetoRelatorio
    {
        public string Nome { get; set; }
        public string Extensao { get; set; }
        public string Formato { get; set; }
        public string Caminho { get; set; }
        public List<ParametroRelatorio> Parametros { get; set; }
        public byte[] Arquivo { get; set; }
    }
}
