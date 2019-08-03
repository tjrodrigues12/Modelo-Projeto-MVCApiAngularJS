parametroPagamentoMdl.controller('incluirCtrl', ['$scope', 'parametroPagamentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {
            programaId: null,
            programaCargoId: null,
            verbaPagamentoId: null
        };

        $scope.drop = {};

        $scope.obterProgramas = function () {
            $scope.loadPro = service.obterProgramasParaIncluir().then(function (response) {
                $scope.programas = response.data;
            });

            $scope.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if (globalSvc.idValido($scope.dados.programaId)) {
                $scope.loadPc = service.obterProgramasCargosParaIncluir($scope.dados.programaId).then(function (response) {
                    $scope.programasCargos = response.data;
                });
            }
            else $scope.programasCargos = [];

            $scope.dados.programaCargoId = "";
        }

        $scope.obterVerbasPagamentos = function () {
            $scope.loadVb = service.obterVerbasPagamentosParaIncluir().then(function (response) {
                $scope.verbasPagamentos = response.data;
            });

            $scope.dados.verbaPagamentoId = "";
        }

        $scope.incluir = function () {

            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) {
                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        var init = function () {
            $scope.obterProgramas();
            $scope.obterVerbasPagamentos();
        };

        init();
    }
]);