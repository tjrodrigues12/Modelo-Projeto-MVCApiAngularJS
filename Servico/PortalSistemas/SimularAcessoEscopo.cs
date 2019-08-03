using Arquitetura.Base;
using Arquitetura.Dominio;
using Arquitetura.Servico;
using Arquitetura.Util.Generic;
using Dominio.PortalSistemas;
using Dominio.PortalSistemas.ModelView.SimularAcesso;
using Mapeamento;
using Negocio.PortalSistemas;
using Repositorio.PortalSistemas.Sets;
using System;
using System.Linq;
using System.Linq.Dynamic;
using System.Transactions;

namespace Servico.PortalSistemas
{
    public class SimularAcessoEscopo : BaseEscopo<PortalSistemasContext>
    {

        #region Sets

        private PortalUsuariosSet PortalUsuariosSet { get; set; }
        private UnidadeEscolarSet UnidadeEscolarSet { get; set; }
        private PortalGruposSet PortalGruposSet { get; set; }
        private PessoaSet PessoaSet { get; set; }
        private SimularAcessoNegocio SimularAcessoNegocio { get; set; }

        #endregion

        #region Construtor

        public SimularAcessoEscopo()
        {
            PortalUsuariosSet = new PortalUsuariosSet(UnitOfWork);
            UnidadeEscolarSet = new UnidadeEscolarSet(UnitOfWork);
            PortalGruposSet = new PortalGruposSet(UnitOfWork);
            PessoaSet = new PessoaSet(UnitOfWork);
            SimularAcessoNegocio = new SimularAcessoNegocio();
        }

        #endregion

        #region Pesquisar

        public GridDados<SimularAcessoGridDados> ObterAcessos(SimularAcessoGridFiltro filtro, int usuarioId)
        {
            var ordenacao = string.IsNullOrEmpty(filtro.Ordenacao) ? "Municipio, UnidadeEscolar, NomeCompleto ASC" : string.Format("{0} {1}", filtro.Ordenacao, filtro.Orientacao.ToUpper());

            var usuarios = SimularAcessoNegocio.ObterUsuarios(PortalUsuariosSet);

            #region Filtro

            if (!string.IsNullOrWhiteSpace(filtro.Busca))
            {
                switch (filtro.FiltroId)
                {
                    case (int)EFiltroSimularAcesso.Login:
                        {
                            usuarios = usuarios.Where(x => x.Login.Contains(filtro.Busca));
                            break;
                        }
                    case (int)EFiltroSimularAcesso.Nome:
                        {
                            usuarios = usuarios.Where(x => x.NomeUsuario.Contains(filtro.Busca));
                            break;
                        }
                    case (int)EFiltroSimularAcesso.Email:
                        {
                            usuarios = usuarios.Where(x => x.Email.Contains(filtro.Busca));
                            break;
                        }
                    case (int)EFiltroSimularAcesso.Municipio:
                        {
                            usuarios = usuarios.Where(x => x.UnidadeEscolar.Municipio.NomeMunicipio.Contains(filtro.Busca));
                            break;
                        }
                    case (int)EFiltroSimularAcesso.UnidadeEscolar:
                        {
                            usuarios = usuarios.Where(x => x.UnidadeEscolar.Nome.Contains(filtro.Busca));
                            break;
                        }
                    case (int)EFiltroSimularAcesso.Cpf:
                        {
                            var Cpf = Recursos.LimparTexto(filtro.Busca);
                            usuarios = usuarios.Where(x => x.Cpf.Contains(Cpf));
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }

            #endregion

            var result = usuarios.Select(x => new SimularAcessoGridDados
            {
                Cpf = x.Cpf,
                Dominio = x.Dominio,
                Email = x.Email,
                GsiUsuarioId = x.GSIUsuarioId,
                Login = x.Login,
                Municipio = x.UnidadeEscolar.Municipio.NomeMunicipio,
                UnidadeEscolar = x.UnidadeEscolar.Nome,
                NomeCompleto = x.NomeUsuario
            });

            return new GridDados<SimularAcessoGridDados>
            {
                NumeroRegistros = result.Count(),
                TamanhoPagina = filtro.TamanhoPagina,
                Lista = result.OrderBy(ordenacao)
                    .Skip(filtro.TamanhoPagina * (filtro.Pagina - 1))
                    .Take(filtro.TamanhoPagina)
            };
        }

        #endregion

        #region Simular Acesso

        public void ManterDadosPortalUsuario(int GeoEstruturaUE, 
            int UsuarioId,
            string NomeUsuario,
            string Email,
            string LoginAd, 
            string NomeDominio, 
            int GrupoId, 
            string NomeGrupo)
        {
            using (var ts = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }))
            {
                try
                {
                    var unidadeEscolar = SimularAcessoNegocio.ObterUnidadeEscolarPorGeoEstruturaId(UnidadeEscolarSet, GeoEstruturaUE);
                    var usuario = SimularAcessoNegocio.ObterPortalUsuarioPorLoginAdNomeDominio(PortalUsuariosSet, LoginAd, NomeDominio);
                    var grupo = SimularAcessoNegocio.ObterGrupoPorId(PortalGruposSet, GrupoId);

                    #region Mantêm Grupo

                    if (grupo == null)
                    {
                        grupo = new PortalGrupos
                        {
                            GrupoId = GrupoId,
                            Descricao = NomeGrupo,
                            Status = true
                        };

                        PortalGruposSet.Incluir(grupo);
                    }
                    else
                    {
                        grupo.Descricao = NomeGrupo;
                        PortalGruposSet.Atualizar(grupo);
                    }

                    #endregion

                    #region Mantêm Usuário


                    if (usuario == null) //Incluir
                    {
                        usuario = new PortalUsuarios
                        {
                            GSIUsuarioId = UsuarioId,
                            GeoEstruturaId = GeoEstruturaUE,
                            Login = LoginAd,
                            NomeUsuario = NomeUsuario,
                            Dominio = NomeDominio,
                            Email = Email,
                            Status = EStatus.A.ToString()
                        };

                        if (unidadeEscolar != null) usuario.UnidadeEscolarId = unidadeEscolar.UnidadeEscolarId;

                        PortalUsuariosSet.Incluir(usuario);
                    }
                    else//Atualizar
                    {
                        usuario.GSIUsuarioId = UsuarioId;
                        usuario.GeoEstruturaId = GeoEstruturaUE;
                        if (unidadeEscolar != null) usuario.UnidadeEscolarId = unidadeEscolar.UnidadeEscolarId;
                        usuario.Login = LoginAd;
                        usuario.NomeUsuario = NomeUsuario;
                        usuario.Dominio = NomeDominio;
                        usuario.Email = Email;
                        usuario.Status = EStatus.A.ToString();

                        PortalUsuariosSet.Atualizar(usuario);
                    }

                    #endregion

                    UnitOfWork.SalvarAlteracoes();
                    ts.Complete();
                }
                catch (Exception)
                {
                    ts.Dispose();
                    throw;
                }
            }
        }

        public Pessoa ObterPessoa(int UsuarioId)
        {
            return SimularAcessoNegocio.ObterPessoaPorId(PessoaSet, UsuarioId);
        }

        #endregion

    }
}
