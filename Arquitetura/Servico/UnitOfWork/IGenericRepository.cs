namespace Arquitetura.Servico.UnitOfWork
{
    public interface IGenericRepository<TEntity> : IActionObter<TEntity>
    {
        void Incluir(TEntity entity);
        void Atualizar(TEntity entity);
        void Excluir(TEntity entity);
    }
}