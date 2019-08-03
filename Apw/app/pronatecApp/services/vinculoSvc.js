vinculoMdl.service('vinculoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Vinculo/';

        //#region Pesquisar Profissionais

        this.obterAnosReferenciasParaPesquisarVinculoProfissional = function (filtro) {
            return $http.get(serviceBase + "GetAnosReferenciasParaPesquisarVinculoProfissional", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasParaPesquisarVinculoProfissional = function (filtro) {
            return $http.get(serviceBase + "GetProgramasParaPesquisarVinculoProfissional", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargosParaPesquisarVinculoProfissional = function (filtro) {
            return $http.get(serviceBase + "GetProgramasCargosParaPesquisarVinculoProfissional", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterVinculoProfissionalGridDadosParaPesquisarVinculoProfissional = function (filtro) {
            return $http.get(serviceBase + "GetVinculoProfissionalGridDadosParaPesquisarVinculoProfissional", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Vínculos Profissional

        this.obterVinculosParaVinculosProfissional = function (pessoaId, anoReferencia, programaId, programaCargoId) {
            return $http.get(serviceBase + "GetVinculosParaVinculosProfissional", {
                params: {
                    pessoaId: pessoaId,
                    anoReferencia: anoReferencia,
                    programaId: programaId != undefined && programaId != null && programaId > 0 ? programaId : -1,
                    programaCargoId: programaCargoId != undefined && programaCargoId != null && programaCargoId > 0 ? programaCargoId : -1
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir

        this.obterProfissionalGridDadosParaIncluir = function (filtro) {
            return $http.get(serviceBase + "GetProfissionalGridDadosParaIncluir", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterProfissionalParaIncluir = function (pessoaId) {
            return $http.get(serviceBase + "GetProfissionalParaIncluir", {
                params: {
                    pessoaId: pessoaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterAnosReferenciasParaIncluir = function () {
            return $http.get(serviceBase + "GetAnosReferenciasParaIncluir").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasParaIncluir = function () {
            return $http.get(serviceBase + "GetProgramasParaIncluir").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargosParaIncluir = function (programaId) {
            return $http.get(serviceBase + "GetProgramasCargosParaIncluir", {
                params: {
                    programaId: programaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar

        this.obterVinculoParaEditar = function (vinculoId) {
            return $http.get(serviceBase + "GetVinculoParaEditar", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterAnosReferenciasParaEditar = function () {
            return $http.get(serviceBase + "GetAnosReferenciasParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasParaEditar = function () {
            return $http.get(serviceBase + "GetProgramasParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargosParaEditar = function (programaId) {
            return $http.get(serviceBase + "GetProgramasCargosParaEditar", {
                params: {
                    programaId: programaId
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

        //#region Alocar Administrativo

        this.obterVinculoParaAlocarAdministrativo = function (vinculoId) {
            return $http.get(serviceBase + "GetVinculoParaAlocarAdministrativo", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurnosParaAlocarAdministrativo = function () {
            return $http.get(serviceBase + "GetTurnosParaAlocarAdministrativo").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.alocarAdministrativo = function (dados) {
            return $http.put(serviceBase + "PutAlocarAdministrativo", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Alocar Docente

        this.obterVinculoParaAlocarDocente = function (vinculoId) {
            return $http.get(serviceBase + "GetVinculoParaAlocarDocente", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurnosParaAlocar = function () {
            return $http.get(serviceBase + "GetTurnosParaAlocarDocente").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.alocar = function (dados) {
            return $http.put(serviceBase + "PutAlocarDocente", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Alocar Docente Turma

        this.obterAnosReferenciasParaAlocarDocenteTurma = function (programaId) {
            return $http.get(serviceBase + "GetAnosReferenciasParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterAnosLetivosParaAlocarDocenteTurma = function (programaId, anoReferencia) {
            return $http.get(serviceBase + "GetAnosLetivosParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoReferencia: anoReferencia
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterCursosParaAlocarDocenteTurma = function (programaId, anoLetivoId) {
            return $http.get(serviceBase + "GetCursosParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoLetivoId: anoLetivoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterAnosFasesParaAlocarDocenteTurma = function (programaId, anoLetivoId, cursoId) {
            return $http.get(serviceBase + "GetAnosFasesParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoLetivoId: anoLetivoId,
                    cursoId: cursoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProjetosCiclosParaAlocarDocenteTurma = function (programaId, anoLetivoId, cursoId, anoFaseId) {
            return $http.get(serviceBase + "GetProjetosCiclosParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoLetivoId: anoLetivoId,
                    cursoId: cursoId,
                    anoFaseId: anoFaseId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurnosParaAlocarDocenteTurma = function (programaId, anoLetivoId, cursoId, anoFaseId, projetoCicloId) {
            return $http.get(serviceBase + "GetTurnosParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoLetivoId: anoLetivoId,
                    cursoId: cursoId,
                    anoFaseId: anoFaseId,
                    projetoCicloId: projetoCicloId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurmasParaAlocarDocenteTurma = function (programaId, anoLetivoId, cursoId, anoFaseId, projetoCicloId, turnoId) {
            return $http.get(serviceBase + "GetTurmasParaAlocarDocenteTurma", {
                params: {
                    programaId: programaId,
                    anoLetivoId: anoLetivoId,
                    cursoId: cursoId,
                    anoFaseId: anoFaseId,
                    projetoCicloId: projetoCicloId,
                    turnoId: turnoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurmasMatrizesDisciplinasParaAlocarDocenteTurma = function (turmaId, dataInicioVigencia) {
            return $http.get(serviceBase + "GetTurmasMatrizesDisciplinasParaAlocarDocenteTurma", {
                params: {
                    turmaId: turmaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                var disciplinas = (globalSvc.getResponse(response)).data;

                for (var i = 0; i < disciplinas.length; i++) {

                    var disciplina = disciplinas[i];

                    disciplina.possuiAlocacao = false;
                    disciplina.docente = "";
                    disciplina.dataInicioAlocacao = null;
                    disciplina.dataFinalAlocacao = null;

                    //#region Validar Vigência da Disciplina

                    var disciplinaInicioVigencia = globalSvc.converterData(disciplina.dataInicioVigencia);
                    var disciplinaFinalVigencia = globalSvc.converterData(disciplina.dataFinalVigencia);

                    if (dataInicioVigencia < disciplinaInicioVigencia || dataInicioVigencia > disciplinaFinalVigencia) {
                        disciplina.possuiAlocacao = true;
                        continue;
                    }

                    //#endregion

                    if (disciplina.alocacoes.length == 0) {
                        disciplina.dataInicioAlocacao = dataInicioVigencia;
                        disciplina.dataFinalAlocacao = disciplina.dataFinalVigencia;
                    }
                    else {

                        for (var j = 0; j < disciplina.alocacoes.length; j++) {
                            var alocacao = disciplina.alocacoes[j];
                            var inicioVigencia = globalSvc.converterData(alocacao.dataInicioVigencia);
                            var finalVigencia = globalSvc.converterData(alocacao.dataFinalVigencia);
                            if (dataInicioVigencia >= inicioVigencia && dataInicioVigencia <= finalVigencia) {
                                disciplina.possuiAlocacao = true;
                                disciplina.docente = alocacao.docente;
                                disciplina.dataInicioAlocacao = alocacao.dataInicioVigencia;
                                disciplina.dataFinalAlocacao = alocacao.dataFinalVigencia;
                                break;
                            }
                            else if (dataInicioVigencia < inicioVigencia) {
                                disciplina.possuiAlocacao = false;
                                disciplina.dataInicioAlocacao = dataInicioVigencia;
                                var novaDataFinalAlocacao = globalSvc.adicionarDias(inicioVigencia, -1);
                                if (disciplina.dataFinalAlocacao == null) disciplina.dataFinalAlocacao = novaDataFinalAlocacao;
                                else if (disciplina.dataFinalAlocacao > novaDataFinalAlocacao) disciplina.dataFinalAlocacao = novaDataFinalAlocacao;
                            }
                            else if (dataInicioVigencia > finalVigencia) {
                                disciplina.possuiAlocacao = false;
                                disciplina.dataInicioAlocacao = dataInicioVigencia;
                                disciplina.dataFinalAlocacao = disciplina.dataFinalVigencia;
                            }
                        }
                    }
                }

                response.data = disciplinas;

                return response;
            });
        }

        this.alocarDocente = function (dados) {
            return $http.put(serviceBase + "PutAlocarDocente", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir

        this.excluir = function (vinculoId) {
            return $http.delete(serviceBase + "DeleteExcluirVinculo", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }



        //#endregion

        //#region Vínculo Curso

        this.obterVinculoParaVinculoCurso = function (vinculoId) {
            return $http.get(serviceBase + "GetVinculoParaVinculoCurso", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterCursosParaVinculoCurso = function (vinculoId) {
            return $http.get(serviceBase + "GetCursosParaVinculoCurso", {
                params: {
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.vincularCursoParaVinculoCurso = function (dados) {
            return $http.put(serviceBase + "PutVincularCursoParaVinculoCurso", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
    }
]);