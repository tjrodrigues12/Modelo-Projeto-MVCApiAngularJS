using System.Collections.Generic;

namespace Arquitetura.Base
{
    public interface IUsuarioAutenticacao
    {
        int UsuarioId { get; }
        string Email { get; set; }
        string NomeCompleto { get; }
        bool AtualizarCadastro { get; set; }
        bool MostrarTrocaPerfilUnidadeEscolar { get; set; }
        int PerfilId { get; set; }
        string Perfil { get; set; }
        string Municipio { get; set; }
        int UnidadeEscolarId { get; set; }
        string UnidadeEscolar { get; set; }
        bool SimularAcesso { get; set; }
        int? UsuarioIdLogin { get; set; }
        int AreaId { get; set; }

        List<IOperacaoUsuario> OperacoesAutorizadas { get; }
        List<IUrlPermitida> UrlsPermitidas { get; }
        string MenuHtml { get; }
        List<IItemMenu> ListaItensMenu { get; }
        List<string> ListaSistemasSiglas { get; set; }
        void RecarregarMenu();
    }
}