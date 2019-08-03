sistemasMdl.controller("indexCtrl", ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisar = function () {
            return $location.path("/pesquisar");
        }

    }
]);