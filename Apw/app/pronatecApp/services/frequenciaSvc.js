frequenciaMdl.service('frequenciaSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Frequencia/';

        //#region Pesquisar
        this.obterAnoReferenciaParaPesquisar = function () {
            return $http.get(serviceBase + 'GetAnoReferenciaParaPesquisar').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMesParaPesquisar = function (anoReferencia) {
            return $http.get(serviceBase + 'GetMesReferenciaParaPesquisar', { params: { anoReferencia: anoReferencia } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterFolhaFrequenciaGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + 'GetObterFolhaFrequenciaParaPesquisarGridDados', { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Pesquisar Docente

        this.obterAnosReferenciasParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetAnosReferenciasParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMesesReferenciasParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetMesesReferenciasParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMunicipiosParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetMunicipiosParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUnidadesEscolaresParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetUnidadesEscolaresParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetProgramasParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargosParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetProgramasCargosParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterFrequenciaGridDadosParaPesquisarRelatorioFrequencia = function (filtro) {
            return $http.get(serviceBase + "GetFrequenciaGridDadosParaPesquisarRelatorioFrequencia", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.gerarRelatorio = function (mes, ano, vinculoId) {
            return $http.get(serviceBase + "GerarRelatorio", {
                params: {
                    mes: mes,
                    ano: ano,
                    vinculoId: vinculoId
                },
                responseType: 'arraybuffer'
            })
        }

        this.gerarRelatorioFolhaDocente = function (mes, ano, vinculoId, turmaId) {
            return $http.get(serviceBase + "GetImprimirFolhaFrequenciaDocente", {
                params: {
                    mes: mes,
                    ano: ano,
                    vinculoId: vinculoId,
                    turmaId: turmaId
                },
                responseType: 'arraybuffer'
            })
        }

        this.obtemTurmasParaImprimirFolhaDocente = function (mes, ano, vinculoId) {
            return $http.get(serviceBase + "GetTurmasParaImprimirFolhaDocente", {
                params: {
                    mes: mes,
                    ano: ano,
                    vinculoId: vinculoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
      
        //#endregion Pesquisar Docente

        //#region Upload Arquivo

        this.salvarArquivo = function (dados) {
            return $http.post(serviceBase + 'PostSalvarArquivoFrequenciaAssinada', dados).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

        //#region Download Folha de Frequencia Assinada

        this.downloadFolhaAssinada = function (arquivoId) {
            return $http.get(serviceBase + "GetDownloadFrequenciaAssinada", {
                responseType: 'arraybuffer',
                params: {
                    arquivoId: arquivoId
                }
            });
        }

        //#endregion

        //#region Excluir frequencia Assinada

        this.excluirArquivoFrequenciaAssinada = function (folhafrequenciaId) {
            return $http.delete(serviceBase + 'DeleteExcluirArquivoFrequenciaAssinada', { params: { folhafrequenciaId: folhafrequenciaId } }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

        //#region Docente

        this.obtemMeses = function () {
            return $http.get(serviceBase + "GetMeses").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obtemTurnos = function (vinculoId) {
            return $http.get(serviceBase + "GetTurnos", { params: { vinculoId: vinculoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obtemOcorrencias = function () {
            return $http.get(serviceBase + "GetOcorrencias").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
         }

        this.obtemFolhaDocente = function (folhaFrequenciaId) {
             return $http.get(serviceBase + "GetFolhaDocente", { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                 return globalSvc.getResponse(response);
             }, response => {
                 globalSvc.extrairMensagens(response);
             });
         }

        this.gerarFolhaFrequenciaDocente = function (parametro) {
             return $http.get(serviceBase + "GetGerarFolhaFrequenciaDocente", {
                 params: parametro
             }).then(response => {
                 return globalSvc.getResponse(response);
             }, response => {
                 globalSvc.extrairMensagens(response);
             });
         }

        this.salvarFolhaDocente = function (modelView) {
             return $http.post(serviceBase + "PostSalvarFolhaDocente", modelView).then(response => {
                 return globalSvc.getResponse(response);
             }, response => {
                 globalSvc.extrairMensagens(response);
             });
         }

        this.adicionarDocumento = function (pessoaDocumentoForm) {
             return $http.post(serviceBase + "PostAdicionarDocumento", pessoaDocumentoForm).then(response => {
                 return globalSvc.getResponse(response);
             }, response => {
                 globalSvc.extrairMensagens(response);
             });
         }

        //#endregion Docente
        
        //#region Administrativo

        //#region Obter Horario Turnos Permitidos

        this.obterDadosHorariosPermitidos = function () {
            return $http.get(serviceBase + 'GetObterDadosHorariosPermitidos').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Pesquisar Quadro Modelo

        this.obterQuadroModeloParaPesquisarGridDados = function () {
            return $http.get(serviceBase + 'GetObterQuadroModeloParaPesquisarGridDados').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }        

        //#endregion

        //#region Incluir Quadro Modelo

        this.incluirQuadroModelo = function (dadosIncluir) {
            return $http.post(serviceBase + 'PostIncluirQuadroModelo', dadosIncluir).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Visualizar Quadro Modelo

        this.obterVisualizarDadosQuadroModeloService = function (quadroModeloId) {
            return $http.get(serviceBase + 'GetDadosQuadroModeloParaVisualizar', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir Quadro Modelo
        this.excluirQuadroModelo = function (quadroModeloId) {
            return $http.delete(serviceBase + 'DeleteQuadroModelo', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Gerar Folha Frequencia

        this.obterQuadroModeloParaIncluirFrequencia = function (vinculoId) {
            return $http.get(serviceBase + 'GetObterQuadroModeloParaIncluirFrequencia', { params: { vinculoId: vinculoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterQuadroModeloGerarFrequencia = function (quadroModeloId) {
            return $http.get(serviceBase + 'GetObterQuadroModeloGerarFrequencia', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterQuantidadeAlunos = function (dados) {
            return $http.get(serviceBase + 'GetObterQuantidadeAlunos', { params: dados }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosMontarFolha = function (dadosMontarFolha) {
            return $http.get(serviceBase + 'GetObterDadosMontarFolha', { params: dadosMontarFolha }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluirGerarFrequenciaAdministrativo = function (folhaFrequencia) {
            return $http.post(serviceBase + 'PostIncluirFrequenciaAdministrativo', folhaFrequencia).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarQuadroModeloPersonalizado = function (dadosQuadroPersonalizado) {
            return $http.post(serviceBase + 'PostSalvarQuadroModeloPersonalizado', dadosQuadroPersonalizado).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir Frequencia

        this.excluirFolhaFrequencia = function (folhaFrequenciaId) {
            return $http.delete(serviceBase + 'DeleteFolhaFrequencia', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Folha de Frequência

        this.obterFrequenciaAdministrativoParaEditar = function (folhaFrequenciaId) {
            return $http.get(serviceBase + 'GetObterFrequenciaAdministrativoParaEditar', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarEditarFolhaFrequencia = function (dados) {
            return $http.post(serviceBase + 'PostEditarFolhaFrequencia', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Quadro Modelo

        this.obterDadosQuadroModeloParaEditar = function (quadroModeloId) {
            return $http.get(serviceBase + 'GetObterDadosQuadroModeloParaEditar', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarEditarQuadroModelo = function (dadosQuadroModelo) {
            return $http.post(serviceBase + 'PostSalvarEditarQuadroModelo', dadosQuadroModelo).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Imprimir Relatorio

        this.imprimirFolhaFrequenciaAdministrativo = function (folhaFrequenciaId) {
            return $http.get(serviceBase + 'GetImprimirFolhaFrequenciaAdministrativo', {
                responseType: 'arraybuffer',
                 params: {
                     folhaFrequenciaId: folhaFrequenciaId
                }
            })
        }

        //#endregion

        //#region Folha Ponto

        this.obterDadosFolhaPonto = function (folhaFrequenciaId) {
            return $http.get(serviceBase + 'GetObterDadosFolhaPonto', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.alterarOcorrenciaFrequencia = function (dados) {
            return $http.post(serviceBase + 'PostAlterarPontoFrequencia', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosTipoOcorrencia = function () {
            return $http.get(serviceBase + 'GetObterDadosTipoOcorrencia').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            })
        }

        //#endregion
       
        //#endregion Administrativo
       
    }
]);