//using Mapeamento.Controlle;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;

namespace Arquitetura.Servico.UnitOfWork
{
    public class UnitOfWorkScope<TDbContext> : IUnitOfWorkScope<TDbContext>
        where TDbContext : DbContext
    {
        public TDbContext DbContext
        {
            get { return (TDbContext)CallContext.GetData(typeof(TDbContext).Name); }
            set { CallContext.SetData(typeof(TDbContext).Name, value); }
        }

        private Dictionary<string, string> _connectionsStrings = new Dictionary<string, string>();
        private string _connectionStringOrName
        {
            get { return _connectionsStrings[typeof(TDbContext).Name]; }
        }

        /// <summary>
        /// Construtor
        /// </summary>
        /// <param name="connectionStringOrName">String de conexão ou nome da mesma para o dbContext, se o contexto foi previamente inicializado
        /// em outra instância ativa na mesma thread será reutilizada a conexão anterior e desprezado o novo parâmetro</param>
        public UnitOfWorkScope(string connectionStringOrName)
        {
            if (string.IsNullOrWhiteSpace(connectionStringOrName))
                throw new ArgumentNullException(nameof(connectionStringOrName));

            if (_connectionsStrings.All(it => it.Key != typeof(TDbContext).Name))
                _connectionsStrings.Add(typeof(TDbContext).Name, connectionStringOrName);

            if (DbContext == null)
            {
                DbContext = (TDbContext)Activator.CreateInstance(typeof(TDbContext), new object[] { _connectionStringOrName });
            }

        }

        /// <summary>
        /// Efetua o save.
        /// </summary>
        public void SalvarAlteracoes()
        {
            if (DbContext != null)
            {
                try
                {
                    DbContext.SaveChanges();
                }
                catch (DbEntityValidationException ex)
                {
                    StringBuilder sb = new StringBuilder();

                    foreach (var failure in ex.EntityValidationErrors)
                    {
                        sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                        foreach (var error in failure.ValidationErrors)
                        {
                            sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                            sb.AppendLine();
                        }
                    }

                    throw new DbEntityValidationException($"Entity Validation Failed - errors follow:\n{sb.ToString()}", ex);
                }
                finally
                {
                    DbContext = (TDbContext)Activator.CreateInstance(typeof(TDbContext), new object[] { _connectionStringOrName });
                }
            }
            else
            {
                throw new Exception($"O contexto {typeof(TDbContext).Name} não existe.");
            }
        }
    }
}
