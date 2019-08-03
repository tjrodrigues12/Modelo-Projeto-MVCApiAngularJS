using Arquitetura.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Dominio
{
    public class GridDados<TModel>
           where TModel : IModel
    {
        private int _tamanhoPagina = 10;
        public virtual int TamanhoPagina { get { return _tamanhoPagina; } set { _tamanhoPagina = value; } }
        public int NumeroRegistros { get; set; }
        public int TotalPaginas
        {
            get
            {
                var resto = NumeroRegistros % TamanhoPagina;
                var totalParcial = NumeroRegistros > 0 ? NumeroRegistros / TamanhoPagina : 0;
                return resto > 0 ? totalParcial + 1 : totalParcial;
            }
        }
        public IQueryable<TModel> Lista { get; set; }
        public ICollection<TModel> ListaMat { get; set; }
    }
}