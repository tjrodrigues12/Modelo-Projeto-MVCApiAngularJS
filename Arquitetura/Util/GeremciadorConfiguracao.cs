using System;
using System.Configuration;
using Arquitetura.Base;

namespace Arquitetura.Util
{
    public static class GerenciadorConfiguracao
    {
        public static int CodGsiModulo => Convert.ToInt32(ConfigurationManager.AppSettings["CodGSIModulo"]);
        public static int UsuarioIdDesenvolvimento => Convert.ToInt32(ConfigurationManager.AppSettings["UsuarioIdDesenvolvimento"]);
        public static int GrupoIdDesenvolvimento => Convert.ToInt32(ConfigurationManager.AppSettings["GrupoIdDesenvolvimento"]);
        public static int GeoEstruturaIdDesenvolvimento => Convert.ToInt32(ConfigurationManager.AppSettings["GeoEstruturaIdDesenvolvimento"]);
        public static EAppAmbiente AppAmbiente => ConfigurationManager.AppSettings["AppAmbiente"].ParseToEnumAppAmbiente();
        public static bool ValidarAutorizacao => Convert.ToBoolean(ConfigurationManager.AppSettings["ValidarAutorizacao"]);
        public static string CatalogoBancoDados => AppAmbiente.ObtemCatalogoBancoDados();
        public static string StringConexao => AppAmbiente.ObterStringConexao();
        public static string NomeBancoDados => AppAmbiente.ObtemNomeBancoDados();
        public static string UsuarioBancoDados => AppAmbiente.ObtemUsuarioBancoDados();
        public static string SenhaUsuarioBancoDados => AppAmbiente.ObtemSenhaUsuarioBancoDados();
        public static string DomainRelatorio => ConfigurationManager.AppSettings["DomainRelatorio"].ToString();
        public static string UserRelatorio => ConfigurationManager.AppSettings["UserRelatorio"].ToString();
        public static string PassRelatorio => ConfigurationManager.AppSettings["PassRelatorio"].ToString();
        public static string ServidorDeRelatorio => ConfigurationManager.AppSettings["ServidorDeRelatorio"].ToString();
        public static string PastaDoRelatorio => AppAmbiente.ObterPastaServidor();
    }
}
