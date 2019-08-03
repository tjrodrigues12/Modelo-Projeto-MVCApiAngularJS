using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servico.Seguranca
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class IgnorarLoginAttribute : Attribute
    {
    }
}
