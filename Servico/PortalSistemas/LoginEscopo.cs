using Arquitetura.Servico;
using Arquitetura.Util.Generic;
using Dominio.PortalSistemas;
using Dominio.PortalSistemas.ModelView.Login;
using Mapeamento;
using Negocio.PortalSistemas;
using Repositorio.PortalSistemas.Sets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servico.PortalSistemas
{
    public class LoginEscopo : BaseEscopo<PortalSistemasContext>
    {

        #region Sets

        private PortalSistemasIconeMenuSet PortalSistemasIconeMenuSet { get; set; }
        private PessoaSet PessoaSet { get; set; }
        private LoginNegocio LoginNegocio { get; set; }

        #endregion

        #region Construtor

        public LoginEscopo()
        {
            PessoaSet = new PessoaSet(UnitOfWork);
            PortalSistemasIconeMenuSet = new PortalSistemasIconeMenuSet(UnitOfWork);
            LoginNegocio = new LoginNegocio();
        }

        #endregion

        #region Obter Dados

        public IQueryable<PortalSistemasIconeMenu> ObterListaIconePorSistemaId(int sistemaId)
        {
            return PortalSistemasIconeMenuSet.ObterTodos(x => x.SistemaId == sistemaId);
        }

        public Pessoa VerificaLoginDocente(LoginForm form)
        {
            var pessoa = LoginNegocio.ObterPessoaPorCpfSenha(PessoaSet, Recursos.LimparTexto(form.Cpf), Recursos.CriptografarChaveAcesso(form.Senha));
            if (pessoa == null)
                throw new Exception("Cpf ou senha inválido");

            return pessoa;
        }

        #endregion
    }
}
