using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas.ModelView.Login
{
    public class LoginForm
    {
        public string Usuario { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public string Dominio { get; set; }
        public bool TipoAcesso { get; set; }
    }
}
