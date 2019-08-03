folhaPagamentoMdl.service('folhaPagamentoSvc', ['$http', 'globalSvc', '$filter',
    function ($http, globalSvc, $filter) {

        var serviceBase = '/api/Pronatec/FolhaPagamento/';

        //#region Pesquisar

        this.obterAnosCompetenciasParaPesquisar = function () {
            return $http.get(serviceBase + "GetAnosCompetenciasParaPesquisar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterMesesCompetenciasParaPesquisar = function (anoCompetencia) {
            return $http.get(serviceBase + "GetMesesCompetenciasParaPesquisar", {
                params: {
                    anoCompetencia: anoCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterFolhasPagamentosGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetFolhasPagamentosGridParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Detalhes

        this.obterFolhaPagamentoParaDetalhes = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetFolhaPagamentoParaDetalhes", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterFolhasLancamentosGridDadosParaDetalhes = function (filtro) {
            return $http.get(serviceBase + "GetFolhasLancamentosGridDadosParaDetalhes", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterDownloadContribuintesParaDetalhes = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetDownloadContribuintesParaDetalhes", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                if (!response.data.result) return globalSvc.getResponse(response);

                return $http.get(serviceBase + "GetDownloadContribuintesResultParaDetalhes", {
                    responseType: 'arraybuffer',
                    params: {
                        folhaPagamentoId: folhaPagamentoId
                    }
                })
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDownloadLancamentosParaDetalhes = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetDownloadLancamentosParaDetalhes", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                if (!response.data.result) return globalSvc.getResponse(response);

                return $http.get(serviceBase + "GetDownloadLancamentosResultParaDetalhes", {
                    responseType: 'arraybuffer',
                    params: {
                        folhaPagamentoId: folhaPagamentoId
                    }
                })
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterPlanilhaPagamentoParaDetalhes = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetPlanilhaPagamentoParaDetalhes", {
                responseType: 'arraybuffer',
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            })
        }

        this.excluirFolhaPagamentoParaDetalhes = function (folhaPagamentoId) {
            return $http.delete(serviceBase + "DeleteExcluirParaDetalhes", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }


        //#endregion

        //#region Gerar

        //this.obterFolhasPagamentosParaGerar = function () {
        //    return $http.get(serviceBase + "GetFolhasPagamentosParaGerar").then(function (response) {
        //        return globalSvc.getResponse(response);
        //    })
        //};

        this.obterAnosCompetenciasParaGerar = function () {
            return $http.get(serviceBase + "GetAnosCompetenciasParaGerar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterMesesCompetenciasParaGerar = function (dados) {
            return $http.get(serviceBase + "GetMesesCompetenciasParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterMunicipiosParaGerar = function (dados) {
            return $http.get(serviceBase + "GetMunicipiosParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia,
                    mesCompetencia: dados.mesCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterUnidadesEscolaresParaGerar = function (dados) {
            return $http.get(serviceBase + "GetUnidadesEscolaresParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia,
                    mesCompetencia: dados.mesCompetencia,
                    municipioId: globalSvc.idValido(dados.municipioId) ? dados.municipioId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProgramasParaGerar = function (dados) {
            return $http.get(serviceBase + "GetProgramasParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia,
                    mesCompetencia: dados.mesCompetencia,
                    municipioId: globalSvc.idValido(dados.municipioId) ? dados.municipioId : -1,
                    unidadeEscolarId: globalSvc.idValido(dados.unidadeEscolarId) ? dados.unidadeEscolarId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProgramasCargosParaGerar = function (dados) {
            return $http.get(serviceBase + "GetProgramasCargosParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia,
                    mesCompetencia: dados.mesCompetencia,
                    municipioId: globalSvc.idValido(dados.municipioId) ? dados.municipioId : -1,
                    unidadeEscolarId: globalSvc.idValido(dados.unidadeEscolarId) ? dados.unidadeEscolarId : -1,
                    programaId: globalSvc.idValido(dados.programaId) ? dados.programaId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.gerarFolhaPagamentoParaGerar = function (dados) {
            return $http.get(serviceBase + "GetGerarFolhaPagamentoParaGerar", {
                params: {
                    anoCompetencia: dados.anoCompetencia,
                    mesCompetencia: dados.mesCompetencia,
                    municipioId: globalSvc.idValido(dados.municipioId) ? dados.municipioId : -1,
                    unidadeEscolarId: globalSvc.idValido(dados.unidadeEscolarId) ? dados.unidadeEscolarId : -1,
                    programaId: globalSvc.idValido(dados.programaId) ? dados.programaId : -1,
                    programaCargoId: globalSvc.idValido(dados.programaCargoId) ? dados.programaCargoId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Editar

        this.obterFolhaPagamentoParaEditar = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetFolhaPagamentoParaEditar", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.editar = function (dados) {
            return $http.put(serviceBase + "PutEditar", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir

        this.excluir = function (folhaPagamentoId) {
            return $http.delete(serviceBase + "DeleteExcluirFolhaPagamento", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region lançamento

        this.obterMunicipiosParaLancamentos = function () {
            return $http.get(serviceBase + "GetMunicipiosParaLancamentos").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterUnidadesEscolaresParaLancamentos = function (municipioId) {
            return $http.get(serviceBase + "GetUnidadesEscolaresParaLancamentos", {
                params: {
                    municipioId: municipioId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProgramasParaLancamentos = function () {
            return $http.get(serviceBase + "GetProgramasParaLancamentos").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterCargosParaLancamentos = function (programaId) {
            return $http.get(serviceBase + "GetCargosParaLancamentos", {
                params: {
                    programaId: programaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterFolhaPagamentoParaLancamentos = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetFolhaPagamentoParaLancamentos", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterVerbasParaLancamentos = function () {
            return $http.get(serviceBase + "GetVerbasParaLancamentos").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };


        this.obterLancamentosParaLancamentos = function (filtro) {
            return $http.get(serviceBase + "GetLancamentosParaLancamentos", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.salvarLancamento = function (lancamento) {
            return $http.post(serviceBase + "PostSalvarLancamento", lancamento).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.editarLancamento = function (lancamento) {
            return $http.put(serviceBase + "PutEditarLancamento", lancamento).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Pesquisar Planilha Pagamento Docente

        this.obterAnosCompetenciasParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetAnosCompetenciasParaPesquisarPlanilhaPagamentoDocente").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterMesesCompetenciasParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetMesesCompetenciasParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoCompetencia: globalSvc.idValido(filtro.anoCompetencia) ? filtro.anoCompetencia : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterAnosLetivosParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetAnosLetivosParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoCompetencia: globalSvc.idValido(filtro.anoCompetencia) ? filtro.anoCompetencia : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterCursosParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetCursosParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterTiposOFertasParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetTiposOfertasParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1,
                    cursoId: globalSvc.idValido(filtro.cursoId) ? filtro.cursoId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProgramasParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetProgramasParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1,
                    cursoId: globalSvc.idValido(filtro.cursoId) ? filtro.cursoId : -1,
                    tipoOfertaId: globalSvc.idValido(filtro.tipoOfertaId) ? filtro.tipoOfertaId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProjetosCiclosParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetProjetosCiclosParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1,
                    cursoId: globalSvc.idValido(filtro.cursoId) ? filtro.cursoId : -1,
                    tipoOfertaId: globalSvc.idValido(filtro.tipoOfertaId) ? filtro.tipoOfertaId : -1,
                    programaId: globalSvc.idValido(filtro.programaId) ? filtro.programaId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterAnosFasesParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetAnosFasesParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1,
                    cursoId: globalSvc.idValido(filtro.cursoId) ? filtro.cursoId : -1,
                    tipoOfertaId: globalSvc.idValido(filtro.tipoOfertaId) ? filtro.tipoOfertaId : -1,
                    programaId: globalSvc.idValido(filtro.programaId) ? filtro.programaId : -1,
                    projetoCicloId: globalSvc.idValido(filtro.projetoCicloId) ? filtro.projetoCicloId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterTurnosParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetTurnosParaPesquisarPlanilhaPagamentoDocente", {
                params: {
                    anoLetivoId: globalSvc.idValido(filtro.anoLetivoId) ? filtro.anoLetivoId : -1,
                    cursoId: globalSvc.idValido(filtro.cursoId) ? filtro.cursoId : -1,
                    tipoOfertaId: globalSvc.idValido(filtro.tipoOfertaId) ? filtro.tipoOfertaId : -1,
                    programaId: globalSvc.idValido(filtro.programaId) ? filtro.programaId : -1,
                    projetoCicloId: globalSvc.idValido(filtro.projetoCicloId) ? filtro.projetoCicloId : -1,
                    anoFaseId: globalSvc.idValido(filtro.anoFaseId) ? filtro.anoFaseId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterTurmasGridDadosParaPesquisarPlanilhaPagamentoDocente = function (filtro) {
            return $http.get(serviceBase + "GetTurmasGridParaPesquisarPlanilhaPagamentoDocente", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Lançar Planilha Pagamento Docente

        this.obterTurmaParaLancarPlanilhaPagamentoDocente = function (turmaId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + "GetTurmaParaLancarPlanilhaPagamentoDocente", {
                params: {
                    turmaId: turmaId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterFolhasLancamentosParaLancarPlanilhaPagamentoDocente = function (turmaId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + "GetFolhasLancamentosParaLancarPlanilhaPagamentoDocente", {
                params: {
                    turmaId: turmaId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterParametrosPagamentosParaLancarPlanilhaPagamentoDocente = function () {
            return $http.get(serviceBase + "GetParametrosPagamentosParaLancarPlanilhaPagamentoDocente").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.salvarLancamentoParaLancarPlanilhaPagamentoDocente = function (form) {
            return $http.put(serviceBase + "PostSalvarLancamentoParaLancarPlanilhaPagamentoDocente", form).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.imprimirPlanilhaPagamentoDocente = function (turmaId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + 'GetImprimirPlanilhaPagamentoDocente', {
                responseType: 'arraybuffer',
                params: {
                    turmaId: turmaId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            })
        }

        //#endregion

        //#region Pesquisar Planilha Pagamento Administrativo

        this.obterAnosCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo = function (filtro) {
            return $http.get(serviceBase + "GetAnosCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterMesesCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo = function (filtro) {
            return $http.get(serviceBase + "GetMesesCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo", {
                params: {
                    anoCompetencia: globalSvc.idValido(filtro.anoCompetencia) ? filtro.anoCompetencia : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterCursosGridDadosParaPesquisarPlanilhaPagamentoAdministrativo = function (filtro) {
            return $http.get(serviceBase + "GetCursosGridParaPesquisarPlanilhaPagamentoAdministrativo", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Lançar Planilha Pagamento Administrativo

        this.obterCursoParaLancarPlanilhaPagamentoAdministrativo = function (cursoId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + "GetCursoParaLancarPlanilhaPagamentoAdministrativo", {
                params: {
                    cursoId: cursoId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterFolhasLancamentosParaLancarPlanilhaPagamentoAdministrativo = function (cursoId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + "GetFolhasLancamentosParaLancarPlanilhaPagamentoAdministrativo", {
                params: {
                    cursoId: cursoId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterParametrosPagamentosParaLancarPlanilhaPagamentoAdministrativo = function () {
            return $http.get(serviceBase + "GetParametrosPagamentosParaLancarPlanilhaPagamentoAdministrativo").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.salvarLancamentoParaLancarPlanilhaPagamentoAdministrativo = function (form) {
            return $http.put(serviceBase + "PostSalvarLancamentoParaLancarPlanilhaPagamentoAdministrativo", form).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.imprimirPlanilhaPagamentoAdministrativo = function (cursoId, anoCompetencia, mesCompetencia) {
            return $http.get(serviceBase + 'GetImprimirPlanilhaPagamentoAdministrativo', {
                responseType: 'arraybuffer',
                params: {
                    cursoId: cursoId,
                    anoCompetencia: anoCompetencia,
                    mesCompetencia: mesCompetencia
                }
            })
        }

        //#endregion

        //#region Pesquisar Lote

        this.obterSituacoesLotePagamento = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetSituacoesLotePagamento", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterLotePagamentoGridDados = function (filtro) {
            return $http.get(serviceBase + "GetLotePagamentoGridDados", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.excluirLotePagamento = function (folhaPagamentoId) {
            return $http.delete(serviceBase + "DeleteExcluirLotePagamento", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Detalhes Lote

        this.obterDetalhesLotePagamento = function (folhaLotePagamentoId) {
            return $http.get(serviceBase + "GetDetalhesLotePagamento", {
                params: {
                    folhaLotePagamentoId: folhaLotePagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Gerar Lote

        this.obterProgramaCargos = function (folhaPagamentoId) {
            return $http.get(serviceBase + "GetProgramaCargos", {
                params: {
                    folhaPagamentoId: folhaPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterGridFolhaLancamentos = function (folhaPagamentoId, programaCargoId) {
            return $http.get(serviceBase + "GetGridFolhaLancamentos", {
                params: {
                    folhaPagamentoId: folhaPagamentoId,
                    programaCargoId: programaCargoId > 0 ? programaCargoId : 0
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.gerarLotePagamento = function (loteDados) {
            return $http.post(serviceBase + "postGerarLotePagamento", loteDados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion
    }
]);