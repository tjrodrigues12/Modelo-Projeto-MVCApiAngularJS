using System.Collections.Generic;

namespace Arquitetura.Base
{
    public interface IBaseSistema
    {
        /// <summary>
        /// Adiciona uma Mensagem
        /// </summary>
        /// <param name="mensagem">Única mensagem a ser adicionada</param>
        void AdicionarMensagem(Mensagem mensagem);

        /// <summary>
        /// Adiciona uma lista de mensagens
        /// </summary>
        /// <param name="mensagens">Lista a ser adicionada às mensagens já existentes</param>
        void AdicionarMensagem(List<Mensagem> mensagens);

        /// <summary>
        /// Adiciona uma mensagem
        /// </summary>
        /// <param name="tipoMensagem">Tipo da mensagem</param>
        /// <param name="texto">Texto da mensagem</param>
        void AdicionarMensagem(ETipoMensagem tipoMensagem, string texto);

        /// <summary>
        /// Adiciona uma mensagem de Erro
        /// </summary>
        /// <param name="texto">Texto da mensagem</param>
        void AdicionarMensagem(string texto);

        /// <summary>
        /// Limpa todas as mensagens armazenadas na instância corrente
        /// </summary>
        void LimparMensagens();

        /// <summary>
        /// Todas as mensagens que foram adicionadas na mesma thread
        /// </summary>
        List<Mensagem> ObterMensagens();
    }
}