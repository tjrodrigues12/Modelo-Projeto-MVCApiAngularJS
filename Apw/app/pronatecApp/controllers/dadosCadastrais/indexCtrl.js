dadosCadastraisMdl.controller('indexCtrl', ['$scope', 'dadosCadastraisSvc', 'globalSvc', '$location',
    function ($scope, service, globalSvc, $location) {

        $scope.redirecionarDetalhes = function () {
            return $location.path("/detalhes");
        }
    }
]);