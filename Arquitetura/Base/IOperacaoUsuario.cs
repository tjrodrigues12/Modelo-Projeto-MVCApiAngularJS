using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Base
{
    public interface IOperacaoUsuario
    {
        int MenuId { get; set; }
        string Permissao { get; set; }
        List<int> ListaGrupoId { get; set; }
    }
}
