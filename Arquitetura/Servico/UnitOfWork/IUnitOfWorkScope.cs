using System;
using System.Data.Entity;

namespace Arquitetura.Servico.UnitOfWork
{
    public interface IUnitOfWorkScope<out TDbContext>
        where TDbContext : DbContext
    {
        void SalvarAlteracoes();
        TDbContext DbContext { get; }
    }
}