portalTipoAcessoMdl.service('portalTipoAcessoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/PortalSistemas/PortalTipoAcesso/';

        this.obterDados = function () {
            return $http.get(serviceBase + "GetDados").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

    }
]);