using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class PortalSistemas
    {
        public int SistemaId { get; set; }
        public int? CodigoGSI { get; set; }
        public string SiglaGSI { get; set; }
        public string SenhaGSI { get; set; }
        public string NomeSistema { get; set; }
        public string DescricaoSistema { get; set; }
        public string Sigla { get; set; }
        public string IconeURL { get; set; }
        public string LinkSistema { get; set; }
        public string LinkSistemaHomologacao { get; set; }
        public int? TipoAcessoId { get; set; }
        public DateTime? DataAbertura { get; set; }
        public DateTime? DataFechamento { get; set; }
        public bool SistemaPublico { get; set; }
        public bool DivulgarSistema { get; set; }
        public bool? AutorizarPreCadastro { get; set; }
        public string Status { get; set; }
        public int? Ordem { get; set; }
        public byte[] Imagem { get; set; }
        public string Extensao { get; set; }
        public int? UsuarioResponsavelID { get; set; }
        public bool? EnviarEmailAutomatico { get; set; }
        public string EmailResponsavel { get; set; }
        public int? TipoSistemaId { get; set; }
        public string ImagemSistema { get; set; }
        public string EnderecoRepositorio { get; set; }
        public string BancoDados { get; set; }
        public int? SetorResponsavel { get; set; }
        public byte[] Manual { get; set; }
        public string ManualExtensao { get; set; }
        //public virtual PortalTipoAcessos PortalTipoAcessos { get; set; }
        //public virtual PortalSistemasTipos PortalSistemasTipos { get; set; }
    }
}
