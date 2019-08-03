menuMdl.service('menuSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Menu/';

        //#region Pesquisar

        this.obterMenus = function () {
            return $http.get(serviceBase + "GetMenus").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Incluir

        this.incluirMenu = function (menu) {
            return $http.post(serviceBase + "PostIncluirMenu", menu).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Editar

        this.editarMenu = function (menu) {
            return $http.put(serviceBase + "PutEditarMenu", menu).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Excluir

        this.excluirMenu = function (menuId) {
            return $http.delete(serviceBase + "DeleteExcluirMenu", {
                params: {
                    menuId: menuId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Operacoes

        this.salvarOperacoes = function (listaMenuOperacoesItem) {
            return $http.post(serviceBase + "PostSalvarOperacoes", listaMenuOperacoesItem).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion Operacoes
    }
]);