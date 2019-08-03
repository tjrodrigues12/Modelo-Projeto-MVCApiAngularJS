simularAcessoMdl.service('simularAcessoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/PortalSistemas/SimularAcesso/';

        this.obterAcessos = function (filtro) {
            return $http.get(serviceBase + "GetAcessos", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.simularAcesso = function (dados) {
            return $http.post(serviceBase + "PostSimularAcesso", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

    }
]);