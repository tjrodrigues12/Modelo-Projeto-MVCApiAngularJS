using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Arquitetura.Base
{
    public interface IItemMenu
    {
        int PerfilId { get; set; }
        int Ordem { get; set; }
        int MenuId { get; set; }
        string Nome { get; set; }
        string Url { get; set; }
        string Icone { get; set; }
        List<int> ListaPerfisIds { get; set; }
        int? MenuPaiId { get; set; }
        ReadOnlyCollection<IItemMenu> SubItens { get; }
        void AdicionarSubItem(IItemMenu itemMenu);
    }
}
