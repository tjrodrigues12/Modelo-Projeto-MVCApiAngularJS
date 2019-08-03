using Arquitetura.Util.Generic;
using System.ComponentModel;

namespace Arquitetura.Base
{
    public enum ETipoMensagem
    {
        [StringValue("Atenção")]
        Atencao = 1,
        [StringValue("Erro de validação")]
        ErroValidacao = 2,
        [StringValue("Falha do sistema")]
        FalhaSistema = 3,
        [StringValue("Sucesso")]
        Sucesso = 4
    }

    public enum ENaturezaOperacao
    {
        [StringValue("I")]
        I,
        [StringValue("A")]
        A,
        [StringValue("E")]
        E
    }    

    public enum EAuthorize
    {
        [StringValue("ByPass")]
        ByPass,
        [StringValue("Gestor")]
        Gestor,
        [StringValue("Bloquear")]
        Bloquear,
        [StringValue("Não identificada")]
        NaoIdentificada
    }

    public enum EAppAmbiente
    {
        [StringValue("Desenvolvimento")]
        Desenvolvimento,
        [StringValue("Homologação")]
        Homologacao,
        [StringValue("Produção")]
        Producao
    }

    public enum EFormatoRelatorio
    {
        [Description(".pdf")]
        PDF = 1,

        [Description(".xls")]
        EXCEL = 2,

        [Description(".doc")]
        WORD = 3,

        [Description(".htm")]
        MHTML = 4
    }

    public enum ETipoArquivo
    {
        [Int32Value(1)]
        [StringValue("application/pdf")]
        PDF,

        [Int32Value(2)]
        [StringValue("application/vnd.ms-excel")]
        XLS,

        [Int32Value(3)]
        [StringValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")]
        XLSX,

        [Int32Value(4)]
        [StringValue("application/msword")]
        DOC,

        [Int32Value(5)]
        [StringValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document")]
        DOCX,

        [Int32Value(6)]
        [StringValue("application/vnd.ms-powerpoint")]
        PPT,

        [Int32Value(7)]
        [StringValue("application/vnd.openxmlformats-officedocument.presentationml.presentation")]
        PPTX,

        [Int32Value(8)]
        [StringValue("image/jpeg")]
        JPEG,

        [Int32Value(9)]
        [StringValue("image/jpg")]
        JPG,

        [Int32Value(10)]
        [StringValue("image/png")]
        PNG,

        [Int32Value(11)]
        [StringValue("application/hta")]
        HTM,

        [Int32Value(12)]
        [StringValue("application/octet-stream")]
        OCTECT
    }

    public enum ETipoPessoa
    {
        Física = 1,
        Jurídica = 2
    }

    public enum ESituacaoUsuario
    {
        [Int32Value(1)]
        [StringValue("Ativo")]
        Ativo = 1,
        [Int32Value(2)]
        [StringValue("Inativo")]
        Inativo = 2
    }    

    public enum ESituacao
    {
        [Int32Value(1)]
        [StringValue("Ativo")]
        Ativo = 1,
        [Int32Value(2)]
        [StringValue("Inativo")]
        Inativo = 2
    }

    public enum ETurno
    {
        [Int32Value(1)]
        [StringValue("Matutino")]
        Matutino = 1,
        [Int32Value(2)]
        [StringValue("Vespertino")]
        Vespertino = 2,
        [Int32Value(3)]
        [StringValue("Noturno")]
        Noturno = 3
    }

    public enum ETipoAcessoSistema
    {
        [Int32Value(2)]
        [StringValue("Aberto")]
        Aberto = 2,
        [Int32Value(3)]
        [StringValue("AutenticacaoPropria")]
        AutenticacaoPropria = 3,
    }

    public enum EPortalSistemasArea
    {
        [Int32Value(1)]
        [StringValue("SED")]
        SED = 1,
        [Int32Value(2)]
        [StringValue("Escolas")]
        Escolas = 2,
        [Int32Value(3)]
        [StringValue("Professor")]
        Professor = 3,
    }

    public enum EFiltroSimularAcesso
    {
        [Int32Value(1)]
        [StringValue("Login")]
        Login = 1,
        [Int32Value(2)]
        [StringValue("Nome")]
        Nome = 2,
        [Int32Value(3)]
        [StringValue("Email")]
        Email = 3,
        [Int32Value(4)]
        [StringValue("Municipio")]
        Municipio = 4,
        [Int32Value(5)]
        [StringValue("UnidadeEscolar")]
        UnidadeEscolar = 5,
        [Int32Value(6)]
        [StringValue("Cpf")]
        Cpf = 6
    }

    public enum EStatus
    {
        [StringValue("A")]
        A,
        [StringValue("D")]
        D,
        [StringValue("S")]
        S
    }
}
