var atualizacaoSalarialPerfilProfissionalMdl = angular.module('atualizacaoSalarialPerfilProfissionalMdl', ['globalMdl', 'ngFileUpload']);

atualizacaoSalarialPerfilProfissionalMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/AtualizacaoSalarialPerfilProfissional/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/editar', {
                templateUrl: baseUrl + 'Editar',
                controller: 'editarCtrl'
            })
            .when('/incluir', {
                templateUrl: baseUrl + 'Incluir',
                controller: 'incluirCtrl'
            })
            .when('/incluirHolerite', {
                templateUrl: baseUrl + 'IncluirHolerite',
                controller: 'incluirHoleriteCtrl'
            })            
            .when('/pesquisarHolerite', {
                templateUrl: baseUrl + 'PesquisarHolerite',
                controller: 'pesquisarHoleriteCtrl'
            })
            .when('/editarHolerite', {
                templateUrl: baseUrl + 'EditarHolerite',
                controller: 'editarHoleriteCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['atualizacaoSalarialPerfilProfissionalMdl']);
});