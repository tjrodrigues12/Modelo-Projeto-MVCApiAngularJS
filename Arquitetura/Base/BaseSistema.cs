using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Remoting.Messaging;

namespace Arquitetura.Base
{
    public abstract class BaseSistema : IBaseSistema
    {
        private static ReadOnlyCollection<Mensagem> Mensagens
        {
            get { return (ReadOnlyCollection<Mensagem>) CallContext.GetData("Mensagens"); }
            set { CallContext.SetData("Mensagens", value); }
        }
        
        protected BaseSistema()
        {
            if (Mensagens == null)
                Mensagens = new List<Mensagem>().AsReadOnly();
        }

        /// <summary>
        /// Adiciona uma Mensagem
        /// </summary>
        /// <param name="mensagem">Única mensagem a ser adicionada</param>
        public virtual void AdicionarMensagem(Mensagem mensagem)
        {
            var msgs = Mensagens.ToList();
            msgs.Add(mensagem);
            Mensagens = msgs.AsReadOnly();
        }

        /// <summary>
        /// Adiciona uma lista de mensagens
        /// </summary>
        /// <param name="mensagens">Lista a ser adicionada às mensagens já existentes</param>
        public virtual void AdicionarMensagem(List<Mensagem> mensagens)
        {
            var msgs = Mensagens.ToList();
            msgs.AddRange(mensagens);
            Mensagens = msgs.AsReadOnly();
        }

        /// <summary>
        /// Adiciona uma mensagem
        /// </summary>
        /// <param name="tipoMensagem">Tipo da mensagem</param>
        /// <param name="texto">Texto da mensagem</param>
        public virtual void AdicionarMensagem(ETipoMensagem tipoMensagem, string texto)
        {
            var msgs = Mensagens.ToList();
            msgs.Add(new Mensagem(tipoMensagem, texto));
            Mensagens = msgs.AsReadOnly();
        }

        /// <summary>
        /// Adiciona uma mensagem de Erro
        /// </summary>
        /// <param name="texto">Texto da mensagem</param>
        public virtual void AdicionarMensagem(string texto)
        {
            var msgs = Mensagens.ToList();
            msgs.Add(new Mensagem(texto));
            Mensagens = msgs.AsReadOnly();
        }

        /// <summary>
        /// Limpa todas as mensagens armazenadas na instância corrente
        /// </summary>
        public virtual void LimparMensagens()
        {
            Mensagens = new List<Mensagem>().AsReadOnly();
        }

        public List<Mensagem> ObterMensagens()
        {
            return Mensagens.ToList();
        }

        /// <summary>
        /// Todas as mensagems de sucesso
        /// </summary>
        public List<Mensagem> MensagensSucesso
        {
            get { return Mensagens.Where(m => m.TipoMensagem == ETipoMensagem.Sucesso).ToList(); }
        }

        /// <summary>
        /// Todas as mensagems de erro de validação e falha de sistema
        /// </summary>
        public List<Mensagem> MensagensErro
        {
            get
            {
                return Mensagens.Where(m =>
                    m.TipoMensagem == ETipoMensagem.ErroValidacao ||
                    m.TipoMensagem == ETipoMensagem.FalhaSistema).ToList();
            }
        }

        /// <summary>
        /// Todas as mensagems de erro de validação, falha de sistema e atenção
        /// </summary>
        public List<Mensagem> MensagensErroAtencao
        {
            get
            {
                return Mensagens.Where(m =>
                    m.TipoMensagem == ETipoMensagem.ErroValidacao ||
                    m.TipoMensagem == ETipoMensagem.FalhaSistema ||
                    m.TipoMensagem == ETipoMensagem.Atencao).ToList();
            }
        }

        /// <summary>
        /// Todas as mensagems de erro de validação
        /// </summary>
        public List<Mensagem> MensagensErroValidacao
        {
            get { return Mensagens.Where(m => m.TipoMensagem == ETipoMensagem.ErroValidacao).ToList(); }
        }

        /// <summary>
        /// Todas as mensagems de falha do sistema
        /// </summary>
        public List<Mensagem> MensagensFalhaSistema
        {
            get { return Mensagens.Where(m => m.TipoMensagem == ETipoMensagem.FalhaSistema).ToList(); }
        }

        /// <summary>
        /// Todas as mensagems de atenção
        /// </summary>
        public List<Mensagem> MensagensAtencao
        {
            get { return Mensagens.Where(m => m.TipoMensagem == ETipoMensagem.Atencao).ToList(); }
        }

        /// <summary>
        /// Existe alguma mensagem de erro ou atenção?
        /// </summary>
        public bool ExistemErros
        {
            get { return Mensagens.Count > 0 && Mensagens.Any(m => m.TipoMensagem != ETipoMensagem.Sucesso); }
        }

        /// <summary>
        /// Existe alguma mensagem?
        /// </summary>
        public bool ExistemMensagens => Mensagens.Count > 0;
    }
}
