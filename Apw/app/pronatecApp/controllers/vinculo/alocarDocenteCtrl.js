vinculoMdl.controller('alocarDocenteCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoAlocarDocente;

        $scope.opcoesLogicas = [
            { valor: true },
            { valor: false }
        ];

        $scope.drop = {};

        $scope.obterVinculo = function () {
            $scope.loadTela = service.obterVinculoParaAlocarDocente($scope.$parent.vinculoId).then(function (response) {
                $scope.dados = response.data;
                $scope.dados.atualizarCargaHoraria = false;
            });
        }

        //#region Alocação

        $scope.adicionar = function () {
            $scope.$parent.manterEstadoAlocarDocente($scope.dados);
            $scope.$parent.redirecionarAlocarDocenteTurma();
        }

        $scope.excluir = function (item) {
            var index = $scope.dados.alocacoes.indexOf(item);
            if (index != -1) $scope.dados.alocacoes.splice(index, 1);
        }

        //#endregion

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            //if (!validarCargaHoraria()) return false;

            $scope.loadTela = service.alocarDocente($scope.dados).then(function (response) {
                if (response.data == true) {
                    $scope.redirecionarVinculosProfissional();
                }
            });
        }

        function validarCargaHoraria() {

            var chAlocacoes = 0;

            for (var i = 0; i < $scope.dados.alocacoes.length; i++) {
                chAlocacoes += $scope.dados.alocacoes[i].cargaHoraria;
            }

            if (chAlocacoes > $scope.dados.cargaHoraria) {
                globalSvc.mensagemNegativo("A CH das alocações não pode ser superior a CH do vínculo!");
                return false;
            }

            return true;
        }

        $scope.voltar = function () {
            $scope.redirecionarVinculosProfissional();
        };

        function init() {
            if ($scope.$parent.vinculoId) {
                if ($scope.dados == undefined || $scope.dados == null) {
                    $scope.obterVinculo();
                }
            }
            else {
                $scope.$parent.redirecionarVinculosProfissional();
            }
        };

        init();
    }
]);