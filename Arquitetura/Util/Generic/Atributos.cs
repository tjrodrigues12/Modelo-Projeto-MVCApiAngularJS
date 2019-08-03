using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Util.Generic
{
    public class StringValueAttribute : Attribute
    {
        public string StringValue { get; protected set; }

        public StringValueAttribute(string value)
        {
            this.StringValue = value;
        }
    }

    public class Int32ValueAttribute : Attribute
    {
        public Int32 Int32Value { get; protected set; }

        public Int32ValueAttribute(Int32 value)
        {
            this.Int32Value = value;
        }
    }
}
