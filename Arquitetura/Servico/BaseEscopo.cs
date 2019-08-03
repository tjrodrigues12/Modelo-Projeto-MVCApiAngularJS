using Arquitetura.Base;
using System.Data.Entity;
using Arquitetura.Servico.UnitOfWork;

namespace Arquitetura.Servico
{
    public class BaseEscopo<TDbContext> : BaseSistema
        where TDbContext : DbContext
    {
        protected UnitOfWorkScope<TDbContext> UnitOfWork { get; set; }

        public BaseEscopo()
        {
            UnitOfWork = new UnitOfWorkScope<TDbContext>(typeof(TDbContext).Name);
        }
    }
}
