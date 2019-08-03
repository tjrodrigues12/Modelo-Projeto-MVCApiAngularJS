parametroPagamentoMdl.controller('editarCtrl', ['$scope', 'parametroPagamentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {
            parametroPagamentoId: $scope.$parent.parametroPagamentoId
        };

        $scope.drop = {};

        $scope.opcoesLogicas = [{ valor: true }, { valor: false }];

        $scope.obterParametroPagamento = function () {
            $scope.loadTela = service.obterParametroPagamentoParaEditar($scope.dados.parametroPagamentoId).then(function (response) {
                $scope.dados = response.data;
                $scope.obterProgramas($scope.dados.programaId);
                $scope.obterProgramasCargos($scope.dados.programaCargoId);
                $scope.obterVerbasPagamentos($scope.dados.verbaPagamentoId);
            });
        }

        $scope.obterProgramas = function (programaId) {
            if (globalSvc.idValido($scope.dados.parametroPagamentoId)) {
                $scope.loadPro = service.obterProgramasParaEditar().then(function (response) {
                    $scope.programas = response.data;
                });
            }
            else $scope.programas = [];

            if (globalSvc.idValido(programaId)) $scope.dados.programaId = programaId;
            else {
                $scope.programaId = "";
                $scope.programasCargos = [];
                $scope.dados.programaCargoId = "";
            }
        }

        $scope.obterProgramasCargos = function (programaCargoId) {
            if (globalSvc.idValido($scope.dados.programaId)) {
                $scope.loadPc = service.obterProgramasCargosParaEditar($scope.dados.programaId).then(function (response) {
                    $scope.programasCargos = response.data;
                });
            }
            else $scope.programasCargos = [];

            if (globalSvc.idValido(programaCargoId)) $scope.dados.programaCargoId = programaCargoId;
            else {
                $scope.dados.programaCargoId = "";
            }
        }

        $scope.obterVerbasPagamentos = function (verbaPagamentoId) {
            $scope.loadVb = service.obterVerbasPagamentosParaEditar().then(function (response) {
                $scope.verbasPagamentos = response.data;
            });

            if (globalSvc.idValido(verbaPagamentoId)) $scope.dados.verbaPagamentoId = verbaPagamentoId;
            else {
                $scope.dados.verbaPagamentoId = "";
            }
        }

        $scope.editar = function () {

            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) {
                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) {
                        atualizarGrid();
                        $scope.redirecionarPesquisar();
                    }
                });
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        }

        function atualizarGrid() {

            var item = $scope.$parent.estadoPesquisar.grid.data.filter(x => x.parametroPagamentoId == $scope.dados.parametroPagamentoId)[0];

            if (globalSvc.valido(item)) {
                item.programa = $scope.drop.programa.selected.programa;
                item.programaCargo = $scope.drop.programaCargo.selected.programaCargo;
                item.verbaPagamento = $scope.drop.verbaPagamento.selected.verbaPagamento;
                item.ativo = $scope.dados.ativo;
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        var init = function () {
            if ($scope.dados.parametroPagamentoId != undefined && $scope.dados.parametroPagamentoId != null && $scope.dados.parametroPagamentoId > 0) {
                $scope.obterParametroPagamento();
            }
            else $scope.redirecionarPesquisar();
        };

        init();
    }
]);