var vinculoMdl = angular.module('vinculoMdl', ['globalMdl']);

vinculoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/Vinculo/';

        $routeProvider
            .when('/vinculos/profissional', {
                templateUrl: baseUrl + 'VinculosProfissional',
                controller: 'vinculosProfissionalCtrl'
            })
            .when('/pesquisar/profissional', {
                templateUrl: baseUrl + 'PesquisarVinculoProfissional',
                controller: 'pesquisarVinculoProfissionalCtrl'
            })
            .when('/incluir/selecao/profissional', {
                templateUrl: baseUrl + 'IncluirSelecaoProfissional',
                controller: 'incluirSelecaoProfissionalCtrl'
            })
            .when('/incluir/vinculo', {
                templateUrl: baseUrl + 'IncluirVinculo',
                controller: 'incluirVinculoCtrl'
            })
            .when('/editar', {
                templateUrl: baseUrl + 'Editar',
                controller: 'editarCtrl'
            })
            .when('/alocar/administrativo', {
                templateUrl: baseUrl + 'AlocarAdministrativo',
                controller: 'alocarAdministrativoCtrl'
            })
            .when('/alocar/docente', {
                templateUrl: baseUrl + 'AlocarDocente',
                controller: 'alocarDocenteCtrl'
            })
            .when('/alocar/docente/turma', {
                templateUrl: baseUrl + 'AlocarDocenteTurma',
                controller: 'alocarDocenteTurmaCtrl'
            })
            .when('/vincular/curso', {
                templateUrl: baseUrl + 'VincularCurso',
                controller: 'vincularCursoCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'PesquisarVinculoProfissional',
                controller: 'pesquisarVinculoProfissionalCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['vinculoMdl']);
});