perfilMdl.service('perfilSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Perfil/';

        //#region Editar

        this.obterPerfil = function (perfilId) {
            return $http.get(serviceBase + "GetPerfilPorId", {
                params: {
                    perfilId: perfilId
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

        //#region Incluir

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Pesquisar

        this.obterPerfisGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetPerfisGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Excluir

        this.excluir = function (perfilId) {
            return $http.delete(serviceBase + "DeleteExcluirPerfil", {
                params: { perfilId: perfilId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Menu

        this.obterPerfilMenus = function (perfilId) {
            return $http.get(serviceBase + "GetPerfilMenus", {
                params: {
                    perfilId: perfilId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.marcarDesmarcarPerfilMenu = function (perfilId, menuId) {
            return $http.get(serviceBase + "marcarDesmarcarPerfilMenu", {
                params: {
                    perfilId: perfilId,
                    menuId: menuId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };


        this.marcarDesmarcarPerfilMenuOperacao = function (operacao) {
            return $http.put(serviceBase + "PutMarcarDesmarcarPerfilMenuOperacao", operacao).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };      

        //#endregion
    }
]);