using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Dominio
{
    public abstract class BaseFiltroPaginado
    {
        private int _tamanhoPagina = 10;

        private int _pagina = 1;

        private string _orientacao = "ASC";

        public int FiltroId { get; set; }
        public string TextoPesquisa { get; set; }
        public virtual int TamanhoPagina { get { return _tamanhoPagina; } set { _tamanhoPagina = value; } }
        public virtual int Pagina { get { return _pagina; } set { _pagina = value; } }
        public string Ordenacao { get; set; }
        public string Orientacao { get { return _orientacao; } set { _orientacao = value; } }
    }
}
