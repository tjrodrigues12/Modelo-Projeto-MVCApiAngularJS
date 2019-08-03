var acessoMdl = angular.module('acessoMdl', ['globalMdl']);

acessoMdl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        var baseUrl = '/Acesso/';

        $routeProvider
            .when('/login', {
                templateUrl: baseUrl + 'Login',
                controller: 'loginCtrl'
            })
            .when('/primeiroAcesso', {
                templateUrl: baseUrl + 'PrimeiroAcesso',
                controller: 'primeiroAcessoCtrl'
            })
            .when('/esqueciMinhaSenha', {
                templateUrl: baseUrl + 'EsqueciMinhaSenha',
                controller: 'esqueciMinhaSenhaCtrl'
            })
            .otherwise({
                templateUrl: baseUrl + 'Login',
                controller: 'loginCtrl'
            });
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app"), ['acessoMdl']);
});