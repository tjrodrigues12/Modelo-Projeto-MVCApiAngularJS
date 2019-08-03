usuarioMdl.service('usuarioSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Usuario/';

        //#region Pesquisar

        this.obterPerfis = function () {
            return $http.get(serviceBase + "GetPerfis").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUsuariosGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetUsuariosGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.alterarEmail = function (dados) {
            return $http.put(serviceBase + "PutAlterarEmail", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Edição

        this.obterUsuarioParaEditar = function (usuarioId) {
            return $http.get(serviceBase + "GetUsuarioParaEditar", {
                params: {
                    usuarioId: usuarioId
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

        this.excluir = function (usuarioId) {
            return $http.delete(serviceBase + "DeleteExcluir", {
                params: {
                    usuarioId: usuarioId
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