var frequenciaMdl = angular.module('frequenciaMdl', ['globalMdl', 'ngFileUpload']);

frequenciaMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/Frequencia/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })           
            .when('/imprimir/folhadocente', {
                templateUrl: baseUrl + 'ImprimirFolhaDocente',
                controller: 'imprimirFolhaDocenteCtrl'
            })
            .when('/pesquisarRelatorioFrequencia', {
                templateUrl: baseUrl + 'pesquisarRelatorioFrequencia',
                controller: 'pesquisarRelatorioFrequenciaCtrl'
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
            .when('/registroOcorrenciaAdministrativo', {
                templateUrl: baseUrl + 'RegistroOcorrenciaAdministrativo',
                controller: 'registroOcorrenciaAdministrativoCtrl'
            })
            .when('/registroOcorrenciaDocente', {
                templateUrl: baseUrl + 'RegistroOcorrenciaDocente',
                controller: 'registroOcorrenciaDocenteCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['frequenciaMdl']);
});