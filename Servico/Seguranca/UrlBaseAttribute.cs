using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servico.Seguranca
{
    [AttributeUsage(AttributeTargets.Class)]
    public class UrlBaseAttribute : Attribute
    {
        public string UrlAcaoMvc { get; }

        public UrlBaseAttribute(string urlAcaoMvc)
        {
            UrlAcaoMvc = urlAcaoMvc.ToLower();
        }
    }
}
