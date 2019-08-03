using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.PortalSistemas
{
    public class Pessoa
    {
        public int PessoaId { get; set; }
        public int? PessoaRhId { get; set; }
        public string Cpf { get; set; }
        public string NomeCompleto { get; set; }
        public string Sexo { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime? DataNascimento { get; set; }
        public bool DadosAtualizados { get; set; }
        public bool Ativo { get; set; }
    }
}
