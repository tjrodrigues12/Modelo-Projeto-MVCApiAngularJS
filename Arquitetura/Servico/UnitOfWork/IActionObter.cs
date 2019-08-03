using System;
using System.Linq;
using System.Linq.Expressions;

namespace Arquitetura.Servico.UnitOfWork
{
    public interface IActionObter<TEntity>
    {
        TEntity Obter(Expression<Func<TEntity, bool>> filter);
        IQueryable<TEntity> ObterTodos(Expression<Func<TEntity, bool>> predicado);
        IQueryable<TEntity> ObterTodos();
    }
}