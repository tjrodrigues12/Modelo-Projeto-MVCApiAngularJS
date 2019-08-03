var folhaFrequenciaAdministrativoMdl = angular.module('folhaFrequenciaAdministrativoMdl', ['globalMdl', 'ngFileUpload']);

folhaFrequenciaAdministrativoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/FolhaFrequenciaAdministrativo/';
        
        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/pesquisarQuadroModelo', {
                templateUrl: baseUrl + 'PesquisarQuadroModelo',
                controller: 'pesquisarQuadroModeloCtrl'
            })
            .when('/incluirQuadroModelo', {
                templateUrl: baseUrl + 'IncluirQuadroModelo',
                controller: 'incluirQuadroModeloCtrl'
            })
            .when('/gerarFolhaFrequenciaAdministrativo', {
                templateUrl: baseUrl + 'GerarFolhaFrequenciaAdministrativo',
                controller: 'gerarFolhaFrequenciaAdministrativoCtrl'
            })
            .when('/visualizarQuadroModelo', {
                templateUrl: baseUrl + 'VisualizarQuadroModelo',
                controller: 'visualizarQuadroModeloCtrl'
            })
            .when('/editarFolhaFrequenciaAdministrativo', {
                templateUrl: baseUrl + 'EditarFolhaFrequenciaAdministrativo',
                controller: 'editarFolhaFrequenciaAdministrativoCtrl'
            })
            .when('/editarQuadroModelo', {
                templateUrl: baseUrl + 'EditarQuadroModelo',
                controller: 'editarQuadroModeloCtrl'
            })
            .when('/folhaPonto', {
                templateUrl: baseUrl + 'FolhaPonto',
                controller: 'folhaPontoCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['folhaFrequenciaAdministrativoMdl']);
});