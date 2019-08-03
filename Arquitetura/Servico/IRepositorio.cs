using Arquitetura.Servico.UnitOfWork;

namespace Arquitetura.Servico
{
   public interface IRepositorio<TEntity> : IActionObter<TEntity>
        where TEntity : class
    {

    }
}
