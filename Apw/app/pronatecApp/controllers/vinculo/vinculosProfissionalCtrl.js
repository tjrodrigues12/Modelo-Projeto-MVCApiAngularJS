vinculoMdl.controller('vinculosProfissionalCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService', '$location',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService, $location) {

        $scope.dados = $scope.$parent.estadoVinculosProfissional;

        $scope.obterVinculos = function () {
            $scope.loadTela = service.obterVinculosParaVinculosProfissional($scope.dados.pessoaId, $scope.dados.anoReferencia, $scope.dados.programaId, $scope.dados.programaCargoId).then(function (response) {
                $scope.vinculos = response.data;
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.vinculoId = item.vinculoId;
            $scope.redirecionarEditar();
        };

        $scope.alocar = function (item) {
            $scope.$parent.vinculoId = item.vinculoId;
            $scope.$parent.estadoAlocarDocente = null;

            if (item.tipoVinculoId == 1) $scope.redirecionarAlocar();
            else $scope.redirecionarAlocarDocente();
        };

        $scope.vincularCurso = function (item) {
            $scope.$parent.vinculoId = item.vinculoId;
            $scope.redirecionarVincularCurso();
        };

        $scope.excluir = function (item) {
            $scope.$parent.vinculoId = item.vinculoId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadTela = service.excluir($scope.$parent.vinculoId).then(function (response) {
                if (response.data)
                    $scope.obterVinculos();
            });
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisarProfissional();
        };

        $scope.init = function () {

            if ($scope.dados != undefined && $scope.dados != null && $scope.dados.pessoaId > 0) {
                $scope.obterVinculos();
            }
            else $scope.redirecionarPesquisarProfissional();
        }

        $scope.init();
    }
]);