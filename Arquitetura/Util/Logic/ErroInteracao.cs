using System.Collections.Generic;
using System.Web;

namespace Arquitetura.Util.Logic
{
    public class ErroInteracao
    {
        public ErroInteracao(int usuarioId, string loginUsuario = "", string nomeUsuario = "", HttpContext http = null)
        {
            LoginUsuario = loginUsuario;

            NomeUsuario = nomeUsuario;

            InfoBrowser = http == null
                ? null
                : new InfoBrowser
                {
                    HttpBrowserType = http.Request.Browser.Type,
                    HttpUrlPathAndQuery = http.Request.Url.PathAndQuery,
                    HttpUserHostName = http.Request.UserHostName,
                    HttpUserIdentity =
                          http.Request.LogonUserIdentity != null
                              ? http.Request.LogonUserIdentity.Name
                              : string.Empty,
                    HttpUserIPAddress = http.Request.UserHostAddress
                };
        }

        private Dictionary<string, string> _erros = new Dictionary<string, string>();

        public InfoBrowser InfoBrowser { get; set; }

        public string LoginUsuario { get; set; }

        public string NomeUsuario { get; set; }

        public Dictionary<string, string> Erros
        {
            get
            {
                return _erros;
            }
        }

        public string Classe { get; set; }

        public string Metodo { get; set; }

        public void AdicionarErro(string key, string value)
        {
            _erros.Add(key, value);
        }
    }
}
