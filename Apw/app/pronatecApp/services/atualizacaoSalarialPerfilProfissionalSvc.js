atualizacaoSalarialPerfilProfissionalMdl.service('atualizacaoSalarialPerfilProfissionalSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {
        
        var urlBase = '/api/Pronatec/AtualizacaoSalarialPerfilProfissional/'

        //#region Pesquisar
        this.obterDadosProfissional = function () {
            return $http.get(urlBase + 'GetDadosVinculosTrabalho').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Editar
        this.obterVinculoProfissional = function (pessoaTrabalhoId) {
            return $http.get(urlBase + 'GetVinculoTrabalho', { params: { pessoaTrabalhoId: pessoaTrabalhoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        
        this.editar = function (dados) {
            return $http.put(urlBase + 'PutEditar', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Incluir

        this.obterRegimePrevidenciario = function () {
            return $http.get(urlBase + 'GetRegimePrevidenciario').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTipoSalario = function () {
            return $http.get(urlBase + 'GetTipoSalario').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTipoContratoTrabalho = function () {
            return $http.get(urlBase + 'GetTipoContratoTrabalho').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluir = function (dados) {
            return $http.post(urlBase + 'PostIncluirPessoaTrabalho', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir
        this.excluir = function (pessoaTrabalhoId) {
            return $http.delete(urlBase + 'DeletePessoaTrabalho', { params: { pessoaTrabalhoId: pessoaTrabalhoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Pesquisar Holerite
        this.obterAnoReferencia = function (pessoaTrabalhoId) {
            return $http.get(urlBase + 'GetAnosReferenciasParaPesquisarHolerite', { params: { pessoaTrabalhoId: pessoaTrabalhoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterPessoaTrabalhoHoleriteGridDadosService = function (filtro) {
            return $http.get(urlBase + 'GetPessoaTrabalhoHoleriteGridDados', { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterHoleriteDownload = function (arquivoId) {
            return $http.get(urlBase + "GetDownloadHolerite", {
                responseType: 'arraybuffer',
                params: {
                    arquivoId: arquivoId
                }
            })
        }

        this.excluirHolerite = function (pessoaTrabalhoHoleriteId) {
            return $http.delete(urlBase + 'DeleteExcluirHoleritePessoaTrabalhoHolerite', { params: { pessoaTrabalhoHoleriteId: pessoaTrabalhoHoleriteId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir Holerite

        this.obterAnoReferenciaParaIncluirHolerite = function () {
            return $http.get(urlBase + 'GetAnosReferenciaParaIncluirHolerite').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMesReferenciaParaIncluirHolerite = function (anoReferencia) {
            return $http.get(urlBase + 'GetMesesReferenciaParaIncluirHolerite', { params: { anoReferencia: anoReferencia } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosPessoaTrabalhoParaIncluirHolerite = function (pessoaTrabalhoId) {
            return $http.get(urlBase + 'GetObterDadosPessoaTrabalhoParaIncluirHolerite', { params: { pessoaTrabalhoId: pessoaTrabalhoId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluirHolerite = function (dados) {
            return $http.post(urlBase + 'PostPessoaTrabalhoHolerite', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Holerite

        this.obterAnoReferenciaHoleriteParaEditar = function (pessoaTrabalhoHoleriteId) {
            return $http.get(urlBase + 'GetAnoReferenciaPessoaTrabalhoHoleriteParaEditar', { params: { pessoaTrabalhoHoleriteId: pessoaTrabalhoHoleriteId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosPessoaTrabalhoHoleriteParaEditar = function (pessoaTrabalhoHoleriteId) {
            return $http.get(urlBase + 'GetDadosPessoaTrabalhoHoleriteParaEditar', { params: { pessoaTrabalhoHoleriteId: pessoaTrabalhoHoleriteId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.atualizarDadosPessoaTrabalhoHoleriteParaEditar = function (pessoaTrabalhoHolerite) {
            return $http.post(urlBase + 'PostAtualizarDadosPessoaTrabalhoHoleriteParaEditar', pessoaTrabalhoHolerite).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.atualizarHoleritePessoaTrabalhoHolerite = function (pessoaTrabalhoHoleriteAtualizarForm) {
            return $http.post(urlBase + 'PostAtualizarAnexoHolerite', pessoaTrabalhoHoleriteAtualizarForm).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
    }
]);