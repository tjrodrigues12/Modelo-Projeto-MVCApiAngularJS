using Arquitetura.Base;
using Arquitetura.Servico;
using Arquitetura.Util.Generic;
using Arquitetura.Util.Logic;
using Mapeamento;
using Negocio.Acesso;
using Repositorio.Pronatec.Sets;
using System;

namespace Servico.Acesso
{
    public class AcessoEscopo : BaseEscopo<PronatecContext>
    {
        #region Sets

        private AcessoNegocio AcessoNegocio { get; set; }

        private UsuarioSet UsuarioSet { get; set; }

        #endregion

        #region Construtor

        public AcessoEscopo()
            : base()
        {
            AcessoNegocio = new AcessoNegocio();
            
            UsuarioSet = new UsuarioSet(UnitOfWork);

            LimparMensagens();
        }

        #endregion


       
        #region Acesso

        public bool GerarTokenAcesso(string email)
        {
            var usuario = AcessoNegocio.ObterUsuario(UsuarioSet, email.ToLower());

            if (usuario != null)
            {
                usuario.Token = Criptografia.GerarToken();
                usuario.ExpiracaoToken = DateTime.Now.AddMinutes(10);

                UsuarioSet.Atualizar(usuario);
                UnitOfWork.SalvarAlteracoes();

                EnviaEmailRecuperacaoSenha(usuario.Email, usuario.Token, usuario.NomeCompleto);

                return true;
            }
            else
            {
                AdicionarMensagem(ETipoMensagem.ErroValidacao, "Usuário não encontrado");
                return false;
            }
        }

        public bool ValidarToken(string email, string token)
        {
            var usuario = AcessoNegocio.ObterUsuario(UsuarioSet, email.ToLower());

            if (usuario != null)
            {
                if (usuario.Token == token)
                {
                    if (DateTime.Now <= usuario.ExpiracaoToken)
                        return true;
                    else
                    {
                        AdicionarMensagem(ETipoMensagem.ErroValidacao, "Código expirado");
                        return false;
                    }
                }
                else
                {
                    AdicionarMensagem(ETipoMensagem.ErroValidacao, "Código inválido");
                    return false;
                }
            }
            else
            {
                AdicionarMensagem(ETipoMensagem.ErroValidacao, "Usuário não encontrado");
                return false;
            }
        }

        public bool AlterarSenha(string email, string senha)
        {
            var usuario = AcessoNegocio.ObterUsuario(UsuarioSet, email.ToLower());

            if (usuario != null)
            {
                usuario.ExpiracaoToken = DateTime.Now;
                usuario.Senha = Criptografia.Encrypt(senha.ToLower());
                usuario.DataOperacao = DateTime.Now;
                usuario.NaturezaOperacao = ENaturezaOperacao.A.ToString();
                usuario.UsuarioOperacao = usuario.UsuarioId;

                UsuarioSet.Atualizar(usuario);
                UnitOfWork.SalvarAlteracoes();

                return true;
            }
            else
            {
                AdicionarMensagem(ETipoMensagem.ErroValidacao, "Usuário não encontrado");
                return false;
            }
        }

        public void EnviaEmailRecuperacaoSenha(string email, string token, string nomeCompleto)
        {

            var corpo = ModeloEmail.RecuperacaoSenha(nomeCompleto, token);

            var envioEmail = new EnviarEmail
            {
                Destinatario = email,
                Assunto = $"Código de confirmação de acesso - {token}",
                Corpo = corpo,
                ModoHTML = true
            };

            envioEmail.Enviar();

        }

        #endregion
    }
}