acessoMdl.controller('indexCtrl', ['$scope', '$location', '$window',
    function ($scope, $location, $window) {

        $scope.redirecionarLogin = function () {
            return $location.path("/login");
        }

        $scope.redirecionarPrimeiroAcesso = function () {
            return $location.path("/primeiroAcesso");
        }

        $scope.redirecionarEsqueciMinhaSenha = function () {
            return $location.path("/esqueciMinhaSenha");
        }

        $scope.redirecionarHome = function () {
            return $window.location.href = '/home';
        }
    }
]);