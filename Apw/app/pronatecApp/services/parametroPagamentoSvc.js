parametroPagamentoMdl.service('parametroPagamentoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/ParametroPagamento/';

        //#region Pesquisar

        this.obterProgramasParaPesquisar = function () {
            return $http.get(serviceBase + "GetProgramasParaPesquisar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargosParaPesquisar = function (programaId) {
            return $http.get(serviceBase + "GetProgramasCargosParaPesquisar", {
                params: {
                    programaId: programaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterVerbasPagamentosParaPesquisar = function (programaId, programaCargoId) {
            return $http.get(serviceBase + "GetVerbasPagamentosParaPesquisar", {
                params: {
                    programaId: programaId,
                    programaCargoId: programaCargoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterParametrosPagamentosGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetParametrosPagamentosGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Incluir

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

        this.obterVerbasPagamentosParaIncluir = function () {
            return $http.get(serviceBase + "GetVerbasPagamentosParaIncluir").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluir = function (dados) {
            return $http.put(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar

        this.obterParametroPagamentoParaEditar = function (parametroPagamentoId) {
            return $http.get(serviceBase + "GetParametroPagamentoParaEditar", {
                params: {
                    parametroPagamentoId: parametroPagamentoId
                }
            }).then(response => {
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

        this.obterVerbasPagamentosParaEditar = function () {
            return $http.get(serviceBase + "GetVerbasPagamentosParaEditar").then(response => {
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

        this.excluir = function (parametroPagamentoId) {
            return $http.delete(serviceBase + "DeleteExcluirParametroPagamento", {
                params: {
                    parametroPagamentoId: parametroPagamentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
    }
]);