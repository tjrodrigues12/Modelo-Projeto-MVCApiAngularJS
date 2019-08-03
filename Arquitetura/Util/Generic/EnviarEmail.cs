using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Mail;
using System.IO;

namespace Arquitetura.Util.Generic
{
    public class EnviarEmail
    {
        private EnderecoEmail _Remetente = new EnderecoEmail("naoresponda@sed.ms.gov.br", "Sistemas - SED/MS", "sedti2007", "smtp2.ms.gov.br");
        private EnderecoEmail _MascararEmail;
        private bool _HTML;
        private string _Assunto;
        private string _Corpo = string.Empty;
        private MailAddressCollection _ListaDestinatario = new MailAddressCollection();
        private MailAddressCollection _ListaCc = new MailAddressCollection();
        private MailAddressCollection _ListaCco = new MailAddressCollection();
        private List<EmailAnexos> _Anexos = new List<EmailAnexos>();

        /// <summary>
        /// Adicione o Destinatário, é possivel adicionar vários e-mails.
        /// </summary>
        /// <param name="Email"></param>
        public string Destinatario
        {
            set { _ListaDestinatario.Add(value); }
        }

        /// <summary>
        /// Adicione e-mail com Cópia, é possivel adicionar vários e-mails.
        /// </summary>
        /// <param name="Email"></param>
        public string CopiaCc
        {
            set { _ListaCc.Add(value); }
        }

        /// <summary>
        /// Adicione e-mail Cópia Oculta, é possivel adicionar vários e-mails.
        /// </summary>
        /// <param name="Email"></param>
        public string CopiaCco
        {
            set { _ListaCco.Add(value); }
        }

        /// <summary>
        /// Informe o Corpo do e-mail
        /// </summary>
        public string Corpo
        {
            get { return _Corpo; }
            set { _Corpo = value; }
        }

        /// <summary>
        /// Informe o Assunto do e-mail
        /// </summary>
        public string Assunto
        {
            get { return _Assunto; }
            set { _Assunto = value; }
        }

        /// <summary>
        /// Informe se o corpo do e-mail foi escrito em HTML
        /// </summary>
        public bool ModoHTML
        {
            get { return _HTML; }
            set { _HTML = value; }
        }

        /// <summary>
        /// Informe o Remetente. Esta opção irá alterar o remetente padrão do sistema 'naoresponda@sed.ms.gov.br'.
        /// </summary>
        /// <param name="Email"></param>
        /// <param name="Nome"></param>
        /// <param name="Senha"></param>
        /// <param name="Stmtp"></param>
        public void Remetente(string Email, string Nome, string Senha, string Stmtp)
        {
            _Remetente = new EnderecoEmail(Email, Nome, Senha, Stmtp);
        }

        /// <summary>
        /// Informe um e-mail e nome se você deseja mandar e-mail mascarado com outras credenciais,
        /// </summary>
        /// <param name="Email"></param>
        /// <param name="Nome"></param>
        public void MascararEmail(string Email, string Nome)
        {
            _MascararEmail = new EnderecoEmail(Email, Nome);
        }

        /// <summary>
        /// Anexar arquivos. você pode adicionar vários arquivos por esta função.
        /// </summary>
        /// <param name="NomeAnexo"></param>
        /// <param name="Anexo"></param>
        /// <param name="MediaType"></param>
        public void AnexarArquivo(string NomeAnexo, Stream Anexo, string MediaType = "")
        {
            _Anexos.Add(new EmailAnexos(NomeAnexo, Anexo, MediaType));
        }

        public void Enviar()
        {
            try
            {
                SmtpClient cliente = new SmtpClient();
                MailMessage email = new System.Net.Mail.MailMessage();

                //Seta credenciais para autenticação - usuário e senha - para envio do email
                cliente.Credentials = new System.Net.NetworkCredential(_Remetente._Email, _Remetente._Senha);

                //Seta o Host utilizado
                cliente.Host = _Remetente._Smtp;

                cliente.UseDefaultCredentials = true;

                //Título do email
                if (string.IsNullOrEmpty(this.Assunto))
                    throw new Exception("O Assunto não foi informado!");
                email.Subject = this.Assunto;

                //Endereço de destino. Você poderá adicionar mais de um
                if (_ListaDestinatario.Count <= 0)
                    throw new Exception("O(s)destinatário(s) não foi(am) informado(s)!");

                foreach (MailAddress addaddress in _ListaDestinatario)
                {
                    email.To.Add(addaddress);
                }

                //Texto do email
                email.Body = this.Corpo;

                //Endereço de quem está enviando o email
                if (_MascararEmail != null)
                    email.From = new MailAddress(_MascararEmail._Email, _MascararEmail._Nome);
                else
                    email.From = new MailAddress(_Remetente._Email, _Remetente._Nome);

                //------------------------------------------------------------------------------------------------------
                //As propriedade a seguir são opcionais
                //------------------------------------------------------------------------------------------------------

                //Anexos do email
                if (_Anexos.Count > 0)
                {
                    foreach (EmailAnexos anexo in _Anexos)
                    {
                        if (string.IsNullOrWhiteSpace(anexo._MediaType))
                            email.Attachments.Add(new Attachment(anexo._Anexo, anexo._NomeAnexo, anexo._MediaType));
                        else
                            email.Attachments.Add(new Attachment(anexo._Anexo, anexo._NomeAnexo));
                    }
                }

                //Com Cópia para
                if (_ListaCc.Count > 0)
                {
                    foreach (MailAddress addaddress in _ListaCc)
                    {
                        email.CC.Add(addaddress);
                    }
                }

                //Com Cópia Oculta para
                if (_ListaCco.Count > 0)
                {
                    foreach (MailAddress addaddress in _ListaCco)
                    {
                        email.Bcc.Add(addaddress);
                    }
                }

                //Endereço para resposta
                if (_MascararEmail != null)
                    //  email.ReplyTo = new MailAddress(_MascararEmail._Email, _MascararEmail._Nome);

                    //Endereço de quem enviou
                    email.Sender = new MailAddress(_Remetente._Email, _Remetente._Nome);

                //Encoding do corpo do email
                email.BodyEncoding = System.Text.Encoding.UTF8;
                //Seta o tipo de notificação
                email.DeliveryNotificationOptions = DeliveryNotificationOptions.OnSuccess;
                //Especifica se o corpo do email é HTML ou não
                email.IsBodyHtml = this.ModoHTML;
                //Prioridade do email
                email.Priority = MailPriority.Normal;


                if (ConfigurationManager.AppSettings["AppAmbiente"].ToLower() == "producao" || ConfigurationManager.AppSettings["AppAmbiente"].ToLower() == "homologacao")
                    cliente.Send(email);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    class EmailAnexos
    {
        public string _NomeAnexo { get; set; }
        public Stream _Anexo { get; set; }
        public string _MediaType { get; set; }

        public EmailAnexos(string NomeAnexo, Stream Anexo)
        {
            _NomeAnexo = NomeAnexo;
            _Anexo = Anexo;
        }

        public EmailAnexos(string NomeAnexo, Stream Anexo, string MediaType)
        {
            _NomeAnexo = NomeAnexo;
            _Anexo = Anexo;
            _MediaType = MediaType;
        }
    }

    class EnderecoEmail
    {
        public string _Email { get; set; }
        public string _Nome { get; set; }
        public string _Senha { get; set; }
        public string _Smtp { get; set; }

        public EnderecoEmail(string Email, string Nome)
        {
            _Email = Email;
            _Nome = Nome;
        }

        public EnderecoEmail(string Email, string Nome, string Senha, string Smtp)
        {
            _Email = Email;
            _Nome = Nome;
            _Senha = Senha;
            _Smtp = Smtp;

        }

    }
}
