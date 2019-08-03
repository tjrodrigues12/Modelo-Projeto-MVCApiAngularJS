var OrgaoExpedicaoDocumentoMdl = angular.module('OrgaoExpedicaoDocumentoMdl', ['globalMdl', 'ngFileUpload']);

OrgaoExpedicaoDocumentoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Pronatec/OrgaoExpedicaoDocumento/';

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
            .otherwise({
                templateUrl: baseUrl + 'Pesquisar',
                controller: 'pesquisarCtrl'
            })    
    }    
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['OrgaoExpedicaoDocumentoMdl'])
})