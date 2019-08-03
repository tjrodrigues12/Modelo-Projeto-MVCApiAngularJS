using Arquitetura.Base;
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
    public class PortalTipoAcessoEscopo : BaseEscopo<PortalSistemasContext>
    {

        #region Sets

        private PessoaSet PessoaSet { get; set; }
        private PortalTipoAcessoNegocio PortalTipoAcessoNegocio { get; set; }

        #endregion

        public PortalTipoAcessoEscopo()
        {
            PessoaSet = new PessoaSet(UnitOfWork);
            PortalTipoAcessoNegocio = new PortalTipoAcessoNegocio();
        }

        public Pessoa VerificaLoginDocente(LoginForm form)
        {
            var pessoa = PortalTipoAcessoNegocio.ObterPessoaPorCpfSenha(PessoaSet, Recursos.LimparTexto(form.Cpf), Recursos.CriptografarChaveAcesso(form.Senha));
            if (pessoa == null)
                throw new Exception("Cpf ou senha inválido");

            return pessoa;
        }
    }
}
