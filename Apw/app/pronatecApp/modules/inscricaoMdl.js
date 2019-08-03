var inscricaoMdl = angular.module('inscricaoMdl', ['globalMdl']);

inscricaoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/Inscricao/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/incluir', {
                templateUrl: baseUrl + 'Incluir',
                controller: 'incluirCtrl'
            })
            .when('/editar', {
                templateUrl: baseUrl + 'Editar',
                controller: 'editarCtrl'
            })
            .when('/pesquisar/candidatos', {
                templateUrl: baseUrl + 'PesquisarCandidatos',
                controller: 'pesquisarCandidatosCtrl'
            })
            .when('/detalhes/candidato', {
                templateUrl: baseUrl + 'DetalhesInscricaoCandidato',
                controller: 'detalhesInscricaoCandidatoCtrl'
            })
            .when('/autorizar/candidatos', {
                templateUrl: baseUrl + 'PesquisarAutorizar',
                controller: 'pesquisarAutorizarCtrl'
            })
            .when('/autorizar', {
                templateUrl: baseUrl + 'Autorizar',
                controller: 'autorizarCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'PesquisarCandidatos',
                controller: 'pesquisarCandidatosCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['inscricaoMdl']);
});