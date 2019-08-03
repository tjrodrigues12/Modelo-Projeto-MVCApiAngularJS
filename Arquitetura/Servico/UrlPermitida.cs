using Arquitetura.Base;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Arquitetura.Servico
{
    [Serializable]
    public class UrlPermitida : IUrlPermitida
    {
        public int MenuId { get; set; }
        public string Url { get; set; }
        public IList<GrupoOperacao> Operacoes { get; set; }

        public UrlPermitida()
        {
            Operacoes = new List<GrupoOperacao>();
        }

        public List<string> ObterOperacoesParaPerfilSelecionado(int perfilId)
        {
            var operacoes = Operacoes.Where(e => e.PerfilId == perfilId).Select(e => e.Operacao).Distinct().ToList();

            return operacoes;
        }
    }
}