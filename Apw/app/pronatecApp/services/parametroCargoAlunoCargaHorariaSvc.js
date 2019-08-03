parametroCargoAlunoCargaHorariaMdl.service('paramentroCargoAlunoCargaHorariaSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/ParametroCargoAlunoCargaHoraria/';

        //#region Consultas Básicas
        this.obterProgramas = function () {
            return $http.get(serviceBase + "GetObterProgramas").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasCargos = function (programaId) {
            return $http.get(serviceBase + "GetObterProgramaCargo", { params: { programaId: programaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Pesquisar Vigência

        this.obterParametroVigenciaGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + 'GetObterParametroVigenciaGridDadosParaPesquisar', { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir Vigência

        this.incluirParametroVigencia = function (dados) {
            return $http.post(serviceBase + 'PostIncluirParametroVigencia', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar Vigência

        this.obterDadosParametroVigenciaParaEditar = function (parametroVigenciaId) {
            return $http.get(serviceBase + 'GetObterDadosParametroVigenciaParaEditar', { params: { parametroVigenciaId: parametroVigenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.editarParametroVigencia = function (dados) {
            return $http.post(serviceBase + 'PostEditarParametroVigencia', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir Vigência
        this.excluirParametroVigencia = function (parametroVigenciaId) {
            return $http.delete(serviceBase + "DeleteExcluirParametroVigencia", {
                params: { parametroVigenciaId: parametroVigenciaId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Parametro Carga Horária

        //#region Pesquisar

        this.obterDadosVigencia = function (parametroVigenciaId) {
            return $http.get(serviceBase + 'GetObterDadosVigencia', { params: { parametroVigenciaId: parametroVigenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosParametrosParaPesquisar = function (parametroVigenciaId) {
            return $http.get(serviceBase + 'GetObterDadosParametrosParaPesquisar', { params: { parametroVigenciaId: parametroVigenciaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir

        this.incluirParametroCargaHoraria = function (dados) {
            return $http.post(serviceBase + 'PostIncluirParametroCargaHoraria', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar

        this.obterDadosParametroParaEditar = function (parametroCargoAlunoCargaHorariaId) {
            return $http.get(serviceBase + 'GetObterDadosParametroParaEditar', { params: { parametroCargoAlunoCargaHorariaId: parametroCargoAlunoCargaHorariaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.editarParametroCargaHoraria = function (dados) {
            return $http.post(serviceBase + 'PostEditarParametroCargaHoraria', dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Excluir
        this.excluirParametroCargaHoraria = function (parametroCargoAlunoCargaHorariaId) {
            return $http.delete(serviceBase + "DeleteExcluirParametroCargaHoraria", {
                params: { parametroCargoAlunoCargaHorariaId: parametroCargoAlunoCargaHorariaId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#endregion

    }
]);