sistemasMdl.service('sistemasSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/PortalSistemas/Sistemas/';

        this.obterSistemasPermitidos = function () {
            return $http.get(serviceBase + "GetSistemasPermitidos").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

    }
]);