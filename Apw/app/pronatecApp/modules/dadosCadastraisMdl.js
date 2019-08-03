var dadosCadastraisMdl = angular.module('dadosCadastraisMdl', ['globalMdl']);

dadosCadastraisMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        var baseUrl = '/Pronatec/DadosCadastrais/';

        $routeProvider
            .when('/detalhes', {
                templateUrl: baseUrl + 'detalhes',
                controller: 'detalhesCtrl'
            })            
            .otherwise({
                templateUrl: baseUrl + 'detalhes',
                controller: 'detalhesCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['dadosCadastraisMdl']);
});