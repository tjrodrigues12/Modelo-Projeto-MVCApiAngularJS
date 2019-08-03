using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arquitetura.Util.Generic
{
    public class ModeloEmail
    {
        /// <summary>
        /// Modelo de recuperação de senha
        /// </summary>
        /// <param name="nomeCompleto">Nome da pessoa</param>
        /// <param name="token">token para recuperação de senha</param>
        /// <returns>String do corpo do e-mail</returns>
        public static string RecuperacaoSenha(string nomeCompleto, string token)
        {
            var modelo =
                "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<title> Recuperação de Senha do Sistema de Educação Profissional</title>"
                + "</head>"
                + "<body>"
                + "<img src='http://hom.ept.sed.ms.gov.br/assets/images/logo-estado.png' style = 'width: 250px; height:50px' />"
                + "<div style=\"background-color: white; border: 1px solid; border-color:black; text-align:center; \">"
                + "<h2 style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Recuperação de Senha</h2>"
                + $"<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;font-size:18px;\"> Prezado(a) { nomeCompleto},</p>"
                + $"<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"><strong> Seu código de confirmação de acesso é { token}</strong></p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Código válido por 10 minutos </p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"><strong> ATENÇÃO -</strong > Caso você não consiga utilizar o código,</p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> entre em contato com o suporte.</p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Atenciosamente,"
                + "<br><br>"
                + "Educação Profissional/SED/MS"
                + "</p>"
                + "<div style='border: 5px solid; border-color:green' ></div>"
                + "</div>"
                + "</body>"
                + "</html>";

            return modelo.Trim();
        }

        /// <summary>
        /// Modelo de envio de usuario e senha
        /// </summary>
        /// <param name="nomeCompleto">Nome da pessoa</param>
        /// <param name="token">token para recuperação de senha</param>
        /// <returns>String do corpo do e-mail</returns>
        public static string AcessoAoSistema(string nomeCompleto, string email, string token)
        {
            var modelo =
               "<!DOCTYPE html>"
               + "<html>"
               + "<head>"
               + "<title> Acesso ao Sistema de Educação Profissional</title>"
               + "</head>"
               + "<body>"
               + "<img src = \"http://hom.ept.sed.ms.gov.br/assets/images/logo-estado.png \" style = \"width: 250px; height:50px\" />"
               + "<div  style = \"background-color: white; border: 1px solid; border-color:black; text-align:center;\" >"
               + $"<h2> Prezado(a) {nomeCompleto},</h2>"
               + "<p> Você foi cadastrado no Sistema de Educação Profissional.</p>"
               + "<p> Complete seu cadastro acessando o seguinte endereço web </p>"
               + "<p><a href =\"http://www.ept.sed.ms.gov.br \">www.ept.sed.ms.gov.br</a></p>"
               + "<p> e clique em Primeiro Acesso.</p>"
               + $"<p><strong> Login: {email}</strong></p>"
               + $"<p><strong> Código: {token}</strong></p>"
               + "<br><br>"
               + "<p> Atenciosamente,<br>"
               + "Educação Profissional/SED/MS"
               + "</p>"
               + "<div style = \"border: 5px solid; border-color:green\" ></div>"
               + "</div>"
               + "</body>"
               + "</html>";
            return modelo.Trim();
        }

        /// <summary>
        /// Modelo de recuperação de senha
        /// </summary>
        /// <param name="nomeCompleto">Nome da pessoa</param>
        /// <param name="token">token para recuperação de senha</param>
        /// <returns>String do corpo do e-mail</returns>
        public static string PendenciaDocumentacao(string nomeCompleto, string observacoes)
        {
            var modelo =
                "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<title> Pendência de Cadastro do Sistema de Educação Profissional</title>"
                + "</head>"
                + "<body>"
                + "<img src='http://hom.ept.sed.ms.gov.br/assets/images/logo-estado.png' style = 'width: 250px; height:50px' />"
                + "<div style=\"background-color: white; border: 1px solid; border-color:black; text-align:center; \">"
                + "<h2 style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Pendência de Cadastro</h2>"
                + $"<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;font-size:18px;\"> Prezado(a) { nomeCompleto },</p>"
                + $"<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"><strong> Seu cadastro foi verificado e marcado com pendência.</strong></p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Favor acessar o sistema <a href =\"http://www.ept.sed.ms.gov.br \">www.ept.sed.ms.gov.br</a> e efetuar a(s) seguinte(s) correção(ões): </p>"
                + $"<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> { observacoes } </p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"><strong> ATENÇÃO -</strong > Caso você tenha alguma duvida,</p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> entre em contato com o suporte.</p>"
                + "<p style=\"padding:0;font-family:\"Segoe UI Light\", \"Segoe UI\", \"Helvetica Neue Medium\", Arial, sans-serif;\"> Atenciosamente,"
                + "<br><br>"
                + "Educação Profissional/SED/MS"
                + "</p>"
                + "<div style='border: 5px solid; border-color:green' ></div>"
                + "</div>"
                + "</body>"
                + "</html>";

            return modelo.Trim();
        }
    }
}
