using System.Data.Entity;

using Arquitetura.Util.Generic;
using Arquitetura.Util;
using Dominio.PortalSistemas;
using Mapeamento.PortalSistemas;

namespace Mapeamento
{
    public partial class PortalSistemasContext : DbContext
    {
        public PortalSistemasContext(string connectionStringOrName)
            : base(GerenciadorConfiguracao.StringConexao)
        {
            Database.SetInitializer<PortalSistemasContext>(null);
        }

        public PortalSistemasContext()
            : this(GerenciadorConfiguracao.StringConexao)
        { }

        #region Sets

        #region A

        #endregion

        #region B

        #endregion

        #region C

        #endregion

        #region D

        #endregion

        #region E

        #endregion

        #region F

        #endregion

        #region G

        #endregion

        #region H

        #endregion

        #region I

        #endregion

        #region J

        #endregion

        #region K

        #endregion

        #region L

        #endregion

        #region M

        public virtual DbSet<Municipio> Municipio { get; set; }

        #endregion

        #region N

        #endregion

        #region O



        #endregion

        #region P

        public virtual DbSet<Perfil> Perfil { get; set; }
        public virtual DbSet<PerfisSistemas> PerfisSistemas { get; set; }
        public virtual DbSet<PermissaoPerfil> PermissaoPerfil { get; set; }
        public virtual DbSet<Pessoa> Pessoa { get; set; }
        public virtual DbSet<PessoaPerfil> PessoaPerfil { get; set; }
        public virtual DbSet<PortalGrupos> PortalGrupos { get; set; }
        public virtual DbSet<Dominio.PortalSistemas.PortalSistemas> PortalSistemas { get; set; }
        public virtual DbSet<PortalSistemasIconeMenu> PortalSistemasIconeMenu { get; set; }
        public virtual DbSet<PortalTipoAcessos> PortalTipoAcessos { get; set; }
        public virtual DbSet<PortalUsuarios> PortalUsuarios { get; set; }

        #endregion

        #region Q

        #endregion

        #region R

        #endregion

        #region S

        #endregion

        #region T

        #endregion

        #region U

        public virtual DbSet<UnidadeEscolar> UnidadeEscolar { get; set; }

        #endregion

        #region V

        #endregion

        #region W

        #endregion

        #region X

        #endregion

        #region Y

        #endregion

        #region Z

        #endregion

        #endregion

        #region Construtor

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            #region A

            #endregion

            #region B

            #endregion

            #region C

            #endregion

            #region D

            #endregion

            #region E

            #endregion

            #region F

            #endregion

            #region G

            #endregion

            #region H

            #endregion

            #region I

            #endregion

            #region J

            #endregion

            #region K

            #endregion

            #region L

            #endregion

            #region M

            modelBuilder.Configurations.Add(new MunicipioConfiguration());

            #endregion

            #region N

            #endregion

            #region O



            #endregion

            #region P

            modelBuilder.Configurations.Add(new PerfilConfiguration());
            modelBuilder.Configurations.Add(new PerfisSistemasConfiguration());
            modelBuilder.Configurations.Add(new PermissaoPerfilConfiguration());
            modelBuilder.Configurations.Add(new PessoaConfiguration());
            modelBuilder.Configurations.Add(new PessoaPerfilConfiguration());
            modelBuilder.Configurations.Add(new PortalGruposConfiguration());
            modelBuilder.Configurations.Add(new PortalTipoAcessosConfiguration());
            modelBuilder.Configurations.Add(new PortalSistemasConfiguration());
            modelBuilder.Configurations.Add(new PortalSistemasIconeMenuConfiguration());
            modelBuilder.Configurations.Add(new PortalUsuariosConfiguration());

            #endregion

            #region Q

            #endregion

            #region R

            #endregion

            #region S

            #endregion

            #region T

            #endregion

            #region U

            modelBuilder.Configurations.Add(new UnidadeEscolarConfiguration());

            #endregion

            #region V

            #endregion

            #region W

            #endregion

            #region X

            #endregion

            #region Y

            #endregion

            #region Z

            #endregion

        }

        #endregion
    }
}