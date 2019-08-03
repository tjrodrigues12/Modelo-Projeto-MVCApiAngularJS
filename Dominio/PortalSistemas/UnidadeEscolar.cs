using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class UnidadeEscolar
    {
        public int UnidadeEscolarId { get; set; }
        public string Nome { get; set; }
        public int SituacaoFuncionamentoId { get; set; }
        public int DependenciaAdmId { get; set; }
        public string TipoEndereco { get; set; }
        public int MunicipioId { get; set; }
        public int EstadoId { get; set; }
        public string Email { get; set; }
        public int? GeoEstruturaId { get; set; }
        public bool AtivaNoSistema { get; set; }
        public bool? EscolaPrincipal { get; set; }
        public int? UnidadeEscolarUrhId { get; set; }
        public int? UnidadePrincipalId { get; set; }
        public int TipoEstruturaId { get; set; }
        public bool? Ativo { get; set; }
        public virtual Municipio Municipio { get; set; }

    }
}
