frequenciaMdl.controller('pesquisarQuadroModeloCtrl', ['$scope', 'frequenciaSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        //#region Obter Dados

        $scope.obterQuadroModeloGridDados = function () {
            $scope.loadTela = service.obterQuadroModeloParaPesquisarGridDados().then(function (response) {
                $scope.quadroModelo = response.data;
            });
        }

        //#endregion

        //#region Eventos
        $scope.editar = function (item) {
            $scope.$parent.quadroModeloId = item.quadroModeloId;
            $scope.redirecionarEditarQuadroModelo();
        }

        $scope.excluir = function (item) {
            $scope.quadroModeloId = item.quadroModeloId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirQuadroModelo($scope.quadroModeloId).then(function (response) {
                if (response.data) { $scope.obterQuadroModeloGridDados(); }
            });
        }

        $scope.visualizar = function (item) {
            $scope.$parent.quadroModeloId = item.quadroModeloId;
            $scope.redirecionarVisualizarQuadroModelo();
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }
        //#endregion

        $scope.init = function () {
            $scope.obterQuadroModeloGridDados();
        }

        $scope.init();
    }
]);