var folhaPagamentoMdl = angular.module('folhaPagamentoMdl', ['globalMdl']);

folhaPagamentoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/FolhaPagamento/';

        $routeProvider
            .when('/pesquisar', {
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })
            .when('/pesquisarLote', {
                templateUrl: baseUrl + 'PesquisarLote',
                controller: 'pesquisarLoteCtrl'
            })
            .when('/gerar', {
                templateUrl: baseUrl + 'Gerar',
                controller: 'gerarCtrl'
            })
            .when('/gerarLote', {
                templateUrl: baseUrl + 'GerarLote',
                controller: 'gerarLoteCtrl'
            })
            .when('/editar', {
                templateUrl: baseUrl + 'Editar',
                controller: 'editarCtrl'
            })
            .when('/lancamento', {
                templateUrl: baseUrl + 'Lancamento',
                controller: 'lancamentoCtrl'
            })
            .when('/detalhes', {
                templateUrl: baseUrl + 'Detalhes',
                controller: 'detalhesCtrl'
            })
            .when('/detalhesLote', {
                templateUrl: baseUrl + 'DetalhesLote',
                controller: 'detalhesLoteCtrl'
            })
            .when('/pesquisar/planilha/pagamento/docente', {
                templateUrl: baseUrl + 'PesquisarPlanilhaPagamentoDocente',
                controller: 'pesquisarPlanilhaPagamentoDocenteCtrl'
            })
            .when('/lancar/planilha/pagamento/docente', {
                templateUrl: baseUrl + 'LancarPlanilhaPagamentoDocente',
                controller: 'lancarPlanilhaPagamentoDocenteCtrl'
            })
            .when('/pesquisar/planilha/pagamento/administrativo', {
                templateUrl: baseUrl + 'PesquisarPlanilhaPagamentoAdministrativo',
                controller: 'pesquisarPlanilhaPagamentoAdministrativoCtrl'
            })
            .when('/lancar/planilha/pagamento/administrativo', {
                templateUrl: baseUrl + 'LancarPlanilhaPagamentoAdministrativo',
                controller: 'lancarPlanilhaPagamentoAdministrativoCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['folhaPagamentoMdl']);
});