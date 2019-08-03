sistemasMdl.controller('pesquisarCtrl', ['$scope', 'sistemasSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        //#region Obter Dados

        $scope.obterSistemas = function () {
            $scope.loadSistema = service.obterSistemasPermitidos().then(response => {
                $scope.sistemas = response.data;
            });
        }

        //#endregion

        function init() {
            $scope.obterSistemas();
        }

        init();

    }
]);