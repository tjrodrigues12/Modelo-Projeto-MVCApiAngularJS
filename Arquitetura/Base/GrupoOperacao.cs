using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Base
{
    [Serializable]
    public class GrupoOperacao : IEquatable<GrupoOperacao>
    {
        public int PerfilId { get; set; }
        public string Operacao { get; set; }

        public override bool Equals(object other)
        {
            return this.Equals(other as GrupoOperacao);
        }

        public bool Equals(GrupoOperacao other)
        {
            if (other == null)
                return false;

            return this.PerfilId.Equals(other.PerfilId) && this.Operacao.Equals(other.Operacao);
        }
    }
}
