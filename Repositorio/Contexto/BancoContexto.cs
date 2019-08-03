using System.Data.Entity;

namespace Repositorio.Contexto
{
    public class BancoContexto : DbContext
    {
        public BancoContexto() : base("ConnDB") { }
    }
}
