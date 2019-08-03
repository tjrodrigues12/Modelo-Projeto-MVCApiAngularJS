var usuarioPerfilUnidadeEscolarMdl = angular.module('usuarioPerfilUnidadeEscolarMdl', ['globalMdl']);

usuarioPerfilUnidadeEscolarMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/UsuarioPerfilUnidadeEscolar/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/perfil', {
                templateUrl: baseUrl + 'Perfil',
                controller: 'perfilCtrl'
            })
            .when('/unidadeEscolar', {
                templateUrl: baseUrl + 'UnidadeEscolar',
                controller: 'unidadeEscolarCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['usuarioPerfilUnidadeEscolarMdl']);
});