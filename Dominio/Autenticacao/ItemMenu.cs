using Arquitetura.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Dominio.Autenticacao
{
    [Serializable]

    public class ItemMenu : IItemMenu
    {
        private readonly List<IItemMenu> _subItens = new List<IItemMenu>();
        public int PerfilId { get; set; }
        public int Ordem { get; set; }
        public int MenuId { get; set; }
        public string Nome { get; set; }
        public string Url { get; set; }
        public string Icone { get; set; }
        public int? MenuPaiId { get; set; }
        public List<int> ListaPerfisIds { get; set; }
        public List<string> Operacoes { get; set; }
        public ReadOnlyCollection<IItemMenu> SubItens
        {
            get { return new ReadOnlyCollection<IItemMenu>(_subItens); }
        }
        public void AdicionarSubItem(IItemMenu itemMenu)
        {
            _subItens.Add(itemMenu);
        }
    }
}
