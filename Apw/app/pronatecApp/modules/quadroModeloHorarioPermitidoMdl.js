var quadroModeloHorarioPermitidoMdl = angular.module('quadroModeloHorarioPermitidoMdl', ['globalMdl']);

quadroModeloHorarioPermitidoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/QuadroModeloHorarioPermitido/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['quadroModeloHorarioPermitidoMdl']);
});