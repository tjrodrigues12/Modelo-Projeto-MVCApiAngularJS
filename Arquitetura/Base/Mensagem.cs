namespace Arquitetura.Base
{
    public class Mensagem
    {
        /// <summary>
        /// Identifica o tipo de mensagem
        /// </summary>
        public ETipoMensagem TipoMensagem { get; private set; }
        /// <summary>
        /// Texto desta mensagem
        /// </summary>
        public string Texto { get; set; }

        /// <summary>
        /// Construtor
        /// </summary>
        /// <param name="tipoMensagem">Tipo de mensagem</param>
        /// <param name="texto">Texto da mensagem</param>
        public Mensagem(ETipoMensagem tipoMensagem, string texto)
        {
            TipoMensagem = tipoMensagem;
            Texto = texto;
        }

        /// <summary>
        /// Construtor, cria uma mensagem de erro
        /// </summary>
        /// <param name="texto">Texto da mensagem</param>
        public Mensagem(string texto)
            : this(ETipoMensagem.ErroValidacao, texto)
        { }
    }
}
