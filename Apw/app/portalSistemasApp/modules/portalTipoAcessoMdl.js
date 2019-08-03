var portalTipoAcessoMdl = angular.module('portalTipoAcessoMdl', ['globalMdl']);

portalTipoAcessoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/PortalSistemas/PortalTipoAcesso/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/incluir', {
                templateUrl: baseUrl + 'Incluir',
                controller: 'incluirCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['portalTipoAcessoMdl']);
});