var atualizacaoCadastralMdl = angular.module('atualizacaoCadastralMdl', ['globalMdl', 'ngFileUpload']);

atualizacaoCadastralMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/AtualizacaoCadastral/';

        $routeProvider
            .when('/dadosCadastrais', {
                templateUrl: baseUrl + 'dadosCadastrais',
                controller: 'dadosCadastraisCtrl'
            })
            .when('/dadosResidenciais', {
                templateUrl: baseUrl + 'dadosResidenciais',
                controller: 'dadosResidenciaisCtrl'
            })
            .when('/dadosBancarios', {
                templateUrl: baseUrl + 'dadosBancarios',
                controller: 'dadosBancariosCtrl'
            })
            .when('/dadosAcademicos', {
                templateUrl: baseUrl + 'dadosAcademicos',
                controller: 'dadosAcademicosCtrl'
            })
            .when('/dadosProfissionais', {
                templateUrl: baseUrl + 'dadosProfissionais',
                controller: 'dadosProfissionaisCtrl'
            })
            .when('/vinculoTrabalho', {
                templateUrl: baseUrl + 'vinculoTrabalho',
                controller: 'vinculoTrabalhoCtrl'
            })
            .when('/uploadDocumentos', {
                templateUrl: baseUrl + 'uploadDocumentos',
                controller: 'uploadDocumentosCtrl'
            })
            .when('/termoCompromisso', {
                templateUrl: baseUrl + 'termoCompromisso',
                controller: 'termoCompromissoCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'dadosPessoais',
                controller: 'dadosPessoaisCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['atualizacaoCadastralMdl']);
});