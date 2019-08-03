folhaFrequenciaAdministrativoMdl.service('folhaFrequenciaAdministrativoSvc', ['$http','globalSvc',
    function ($http, globalSvc) {

        var urlBase = '/api/Pronatec/FolhaFrequenciaAdministrativo/'

        //#region Pesquisar
        this.obterAnoReferenciaParaPesquisar = function () {
            return $http.get(urlBase + 'GetAnoReferenciaParaPesquisar').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMesParaPesquisar = function (anoReferencia) {
            return $http.get(urlBase + 'GetMesReferenciaParaPesquisar', { params: { anoReferencia: anoReferencia } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterFolhaFrequenciaGridDadosParaPesquisar = function (filtro) {
            return $http.get(urlBase + 'GetObterFolhaFrequenciaParaPesquisarGridDados', { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Pesquisar Quadro Modelo

        this.obterQuadroModeloParaPesquisarGridDados = function () {
            return $http.get(urlBase + 'GetObterQuadroModeloParaPesquisarGridDados').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }        

        //#endregion

        //#region Incluir Quadro Modelo

        this.incluirQuadroModelo = function (dadosIncluir) {
            return $http.post(urlBase + 'PostIncluirQuadroModelo', dadosIncluir).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Visualizar Quadro Modelo

        this.obterVisualizarDadosQuadroModeloService = function (quadroModeloId) {
            return $http.get(urlBase + 'GetDadosQuadroModeloParaVisualizar', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir Quadro Modelo
        this.excluirQuadroModelo = function (quadroModeloId) {
            return $http.delete(urlBase + 'DeleteQuadroModelo', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Gerar Folha Frequencia

        this.obterQuadroModeloParaIncluirFrequencia = function (vinculoId) {
            return $http.get(urlBase + 'GetObterQuadroModeloParaIncluirFrequencia', { params: { vinculoId: vinculoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterQuadroModeloGerarFrequencia = function (quadroModeloId) {
            return $http.get(urlBase + 'GetObterQuadroModeloGerarFrequencia', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosMontarFolha = function (dadosMontarFolha) {
            return $http.get(urlBase + 'GetObterDadosMontarFolha', { params: dadosMontarFolha }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluirGerarFrequenciaAdministrativo = function (folhaFrequencia) {
            return $http.post(urlBase + 'PostIncluirFrequenciaAdministrativo', folhaFrequencia).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarQuadroModeloPersonalizado = function (dadosQuadroPersonalizado) {
            return $http.post(urlBase + 'PostSalvarQuadroModeloPersonalizado', dadosQuadroPersonalizado).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir Frequencia

        this.excluirFolhaFrequencia = function (folhaFrequenciaId) {
            return $http.delete(urlBase + 'DeleteFolhaFrequencia', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Folha de Frequência

        this.obterFrequenciaAdministrativoParaEditar = function (folhaFrequenciaId) {
            return $http.get(urlBase + 'GetObterFrequenciaAdministrativoParaEditar', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarEditarFolhaFrequencia = function (dados) {
            return $http.post(urlBase + 'PostEditarFolhaFrequencia', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Quadro Modelo

        this.obterDadosQuadroModeloParaEditar = function (quadroModeloId) {
            return $http.get(urlBase + 'GetObterDadosQuadroModeloParaEditar', { params: { quadroModeloId: quadroModeloId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarEditarQuadroModelo = function (dadosQuadroModelo) {
            return $http.post(urlBase + 'PostSalvarEditarQuadroModelo', dadosQuadroModelo).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Imprimir Relatorio

        this.imprimirFolhaFrequenciaAdministrativo = function (folhaFrequenciaId) {
            return $http.get(urlBase + 'GetImprimirFolhaFrequenciaAdministrativo', {
                responseType: 'arraybuffer',
                 params: {
                     folhaFrequenciaId: folhaFrequenciaId
                }
            })
        }

        //#endregion

        //#region Folha Ponto

        this.obterDadosFolhaPonto = function (folhaFrequenciaId) {
            return $http.get(urlBase + 'GetObterDadosFolhaPonto', { params: { folhaFrequenciaId: folhaFrequenciaId } }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.alterarPontoFrequencia = function (dados) {
            return $http.post(urlBase + 'PostAlterarPontoFrequencia', dados).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

        //#region Upload Arquivo

        this.salvarArquivo = function (dados) {
            return $http.post(urlBase + 'PostSalvarArquivoFrequenciaAssinada', dados).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

        //#region Download Folha de Frequencia Assinada

        this.downloadFolhaAssinada = function (arquivoId) {
            return $http.get(urlBase + "GetDownloadFrequenciaAssinada", {
                responseType: 'arraybuffer',
                params: {
                    arquivoId: arquivoId
                }
            });
        }

        //#endregion

        //#region Excluir frequencia Assinada

        this.excluirArquivoFrequenciaAssinada = function (folhafrequenciaId) {
            return $http.delete(urlBase + 'DeleteExcluirArquivoFrequenciaAssinada', { params: { folhafrequenciaId: folhafrequenciaId } }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

    }
]);