using Arquitetura.Negocio;
using Arquitetura.Servico.UnitOfWork;
using Arquitetura.Util.Generic;
using Dominio.PortalSistemas;
using Dominio.PortalSistemas.ModelView.Login;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.PortalSistemas
{
    public class PortalTipoAcessoNegocio : BaseNegocio
    {
        #region Login

        public Pessoa ObterPessoaPorCpfSenha(IActionObter<Pessoa> repPessoa, string cpf, string senhaCriptografada)
        {
            return repPessoa.Obter(x => x.Cpf == cpf && x.Senha == senhaCriptografada);
        }

        #endregion

        #region Validações

        public bool ValidarLoginDocente(LoginForm form)
        {
            return ValidaCpf(form.Cpf)
                && ValidaSenha(form.Senha);
        }

        public bool ValidaCpf(string cpf)
        {
            var cpfValido = Recursos.ValidarCPF(Recursos.LimparTexto(cpf));

            if (!cpfValido)
                AdicionarMensagem("Cpf Inválido");

            return cpfValido;
        }

        public bool ValidaSenha(string senha)
        {
            if (!string.IsNullOrWhiteSpace(senha)) return true;

            AdicionarMensagem("Informe a Senha!");
            return false;
        }

        #endregion

    }
}
