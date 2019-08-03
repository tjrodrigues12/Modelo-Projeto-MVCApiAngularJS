var pessoaMdl = angular.module('pessoaMdl', ['globalMdl', 'ngFileUpload']);

pessoaMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/Pessoa/';

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
            .when('/pesquisarAprovar', {
                templateUrl: baseUrl + 'PesquisarAprovar',
                controller: 'pesquisarAprovarCtrl'
            })
            .when('/aprovar', {
                templateUrl: baseUrl + 'Aprovar',
                controller: 'aprovarCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            });
    }
]);

pessoaMdl.filter('labelSituacaoAprovacao', function () {
    return function (valor, label, tipo) {
        if (label == undefined || label == null) label = "Não entrou no sistema";
        if (valor === undefined) return label;
        if (valor === null) return label;
        if (valor === '') return label;
        if (tipo != undefined && tipo != null && tipo != '') valor = tipo == "prefix" ? label + valor : valor + label;
        return valor;
    };
});

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['pessoaMdl']);
});