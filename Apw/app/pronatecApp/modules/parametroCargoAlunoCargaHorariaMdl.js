var parametroCargoAlunoCargaHorariaMdl = angular.module('parametroCargoAlunoCargaHorariaMdl', ['globalMdl']);

parametroCargoAlunoCargaHorariaMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/ParametroCargoAlunoCargaHoraria/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/parametro', {
                templateUrl: baseUrl + 'Parametro',
                controller: 'parametroCtrl'
            })
            .when('/incluirVigencia', {
                templateUrl: baseUrl + 'IncluirVigencia',
                controller: 'incluirVigenciaCtrl'
            })
            .when('/editarVigencia', {
                templateUrl: baseUrl + 'EditarVigencia',
                controller: 'editarVigenciaCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })    
    }    
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['parametroCargoAlunoCargaHorariaMdl'])
})