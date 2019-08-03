using System.Web;
using Arquitetura.Base;
using Dominio.Autenticacao;

namespace SISTEMAS_SED_APW.Models
{
    public static class GerenciadorSessao
    {
        public static IUsuarioAutenticacao UsuarioLogado
        {
            get
            {

                var usuarioLogado = HttpContext.Current.Session["UsuarioLogado"];

                if (usuarioLogado != null) return (UsuarioAutenticacao)usuarioLogado;

                return null;
            }
            set { HttpContext.Current.Session["UsuarioLogado"] = value; }
        }
    }
}