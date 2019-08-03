using Arquitetura.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas.ModelView.SimularAcesso
{
    public class SimularAcessoGridDados : IModel
    {
        public string Municipio { get; set; }
        public string UnidadeEscolar { get; set; }
        public string NomeCompleto { get; set; }
        public string Login { get; set; }
        public string Cpf { get; set; }
        public string Dominio { get; set; }
        public string Email { get; set; }
        public int? GsiUsuarioId { get; set; }
    }
}
