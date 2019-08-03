using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using Arquitetura.Servico.UnitOfWork;

namespace Arquitetura.Servico.UnitOfWork
{
    public class GenericRepository<TDbContext, TEntity> : IGenericRepository<TEntity>
        where TDbContext : DbContext
        where TEntity : class
    {
        protected IUnitOfWorkScope<TDbContext> UnitOfWork { get; private set; }

        public GenericRepository(IUnitOfWorkScope<TDbContext> unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        private IDbSet<TEntity> _entities;

        private IDbSet<TEntity> Entities
        {
            get { return _entities ?? (_entities = UnitOfWork.DbContext.Set<TEntity>()); }
        }

        private string _errorMessage = string.Empty;

        public virtual TEntity Obter(Expression<Func<TEntity, bool>> filter)
        {
            var result = Entities.Where(filter);

            if (!result.Any()) return null;

            return result.FirstOrDefault();
        }

        public virtual void Incluir(TEntity entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }

                Entities.Add(entity);
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        _errorMessage += string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                    }
                }
                throw new Exception(_errorMessage, dbEx);
            }
        }

        public virtual void Atualizar(TEntity entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        _errorMessage += string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                    }
                }
                throw new Exception(_errorMessage, dbEx);
            }
        }

        public virtual void Excluir(TEntity entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                Entities.Remove(entity);
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        _errorMessage += string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                    }
                }
                throw new Exception(_errorMessage, dbEx);
            }
        }

        public virtual IQueryable<TEntity> ObterTodos(Expression<Func<TEntity, bool>> predicado)
        {
            return Entities.Where(predicado).AsQueryable();
        }

        public virtual IQueryable<TEntity> ObterTodos()
        {
            return Entities;
        }
    }
}
