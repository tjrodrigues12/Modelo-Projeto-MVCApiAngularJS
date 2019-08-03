var atualizacaoSalarialMdl = angular.module('atualizacaoSalarialMdl', ['globalMdl', 'ngFileUpload']);

atualizacaoSalarialMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/AtualizacaoSalarial/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/pesquisarProfissional', {
                templateUrl: baseUrl + 'PesquisarProfissional',
                controller: 'pesquisarProfissionalCtrl'
            })
            .when('/pesquisarHolerite', {
                templateUrl: baseUrl + 'PesquisarHolerite',
                controller: 'pesquisarHoleriteCtrl'
            })
            .when('/editar', {
                templateUrl: baseUrl + 'Editar',
                controller: 'editarCtrl'
            })
            .when('/editarHolerite', {
                templateUrl: baseUrl + 'EditarHolerite',
                controller: 'editarHoleriteCtrl'
            })
            .when('/incluir', {
                templateUrl: baseUrl + 'Incluir',
                controller: 'incluirCtrl'
            })
            .when('/incluirHolerite', {
                templateUrl: baseUrl + 'IncluirHolerite',
                controller: 'incluirHoleriteCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'PesquisarProfissional',
                controller: 'pesquisarProfissionalCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['atualizacaoSalarialMdl']);
});