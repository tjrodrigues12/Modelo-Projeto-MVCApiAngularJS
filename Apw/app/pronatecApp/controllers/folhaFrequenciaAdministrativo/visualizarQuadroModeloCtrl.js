folhaFrequenciaAdministrativoMdl.controller('visualizarQuadroModeloCtrl', ['$scope', 'folhaFrequenciaAdministrativoSvc', 'globalSvc',
    function ($scope, service, globalSvc) {
        $scope.quadroModeloId = $scope.$parent.quadroModeloId;

        $scope.obterVisualizarDadosQuadroModelo = function () {
            $scope.loadTela = service.obterVisualizarDadosQuadroModeloService($scope.quadroModeloId).then(function (response) {
                $scope.dadosVisualizar = response.data;
            });
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisarQuadroModelo();
        }

        $scope.init = function () {
            if ($scope.quadroModeloId == undefined || $scope.quadroModeloId == null) { $scope.redirecionarPesquisarQuadroModelo(); }

            $scope.obterVisualizarDadosQuadroModelo();
        }

        $scope.init();

    }
]);