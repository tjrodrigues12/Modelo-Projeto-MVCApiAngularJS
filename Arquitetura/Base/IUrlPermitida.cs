using System.Collections.Generic;

namespace Arquitetura.Base
{
    public interface IUrlPermitida
    {
        int MenuId { get; set; }
        string Url { get; set; }
        IList<GrupoOperacao> Operacoes { get; set; }

        List<string> ObterOperacoesParaPerfilSelecionado(int perfilId);
    }
}
