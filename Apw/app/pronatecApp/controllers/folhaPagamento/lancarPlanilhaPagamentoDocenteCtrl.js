folhaPagamentoMdl.controller('lancarPlanilhaPagamentoDocenteCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, $filter, validationService) {

        $scope.dados = {};

        $scope.drop = {};

        $scope.obterParametrosPagamentos = function () {
            $scope.loadPp = service.obterParametrosPagamentosParaLancarPlanilhaPagamentoDocente().then(function (response) {
                $scope.parametrosPagamentos = response.data;
                $scope.obterTurma();
                $scope.obterFolhasLancamentos();
            });
        };

        $scope.obterTurma = function () {
            $scope.loadTur = service.obterTurmaParaLancarPlanilhaPagamentoDocente($scope.dados.turmaId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                $scope.dados = response.data;
            });
        };

        $scope.obterFolhasLancamentos = function () {
            $scope.loadFl = service.obterFolhasLancamentosParaLancarPlanilhaPagamentoDocente($scope.dados.turmaId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                $scope.folhasLancamentos = response.data;
            });
        };

        $scope.calcularTotal = function (item) {
            item.valorReferencia = 0;
            item.verbaReferencia = 0;
            if (globalSvc.objValido(item.parametroPagamento.selected)) {
                var verbaRefencia = item.parametroPagamento.selected.valor;
                item.valorReferencia = item.cargaHorariaReferencia * verbaRefencia;
                item.verbaReferencia = verbaRefencia;
            }
        }

        $scope.filterParametrosPagamentos = function (item) {
            item.parametrosPagamentos = $filter('filtroPorId')($scope.parametrosPagamentos, 'programaCargoId', item.programaCargoId);
        }

        $scope.gerarName = function () {
            globalSvc.gerarName();
        };

        $scope.imprimir = function () {
            $scope.loadTela = service.imprimirPlanilhaPagamentoDocente($scope.dados.turmaId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                globalSvc.saveData(response.data, "PlanilhaPagamentoDocente.pdf");
            });
        };

        $scope.salvar = function (item) {

            globalSvc.limparMensagens();

            if (!validarCamposObrigatorios(item)) return;

            $scope.loadTela = service.salvarLancamentoParaLancarPlanilhaPagamentoDocente(item).then(response => {
                if (response.data > 0) {
                    item.folhaLancamentoId = response.data;
                    globalSvc.mensagemPositivo("Dados gravados com sucesso!");
                }
            });
        };

        var validarCamposObrigatorios = function (item) {
            globalSvc.limparMensagens();
            return validarCampoVerba(item.verbaPagamentoId)
            && validarCampoHoras(item.cargaHorariaReferencia);
        };

        var validarCampoVerba = function (verba) {
            if (verba > 0) return true;

            globalSvc.mensagemNegativo("Informe a verba do pagamento");
            return false;
        };

        var validarCampoHoras = function (horas) {
            if (horas > 0) return true;

            globalSvc.mensagemNegativo("Informe as horas trabalhadas");
            return false;
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisarPlanilhaPagamentoDocente();
        }

        function init() {
            /* Verificação para manter o estado da tela pesquisa */
            if (!globalSvc.idValido($scope.$parent.turmaId)) $scope.voltar();

            $scope.dados.turmaId = $scope.$parent.turmaId;
            $scope.dados.anoCompetencia = $scope.$parent.anoCompetencia;
            $scope.dados.mesCompetencia = $scope.$parent.mesCompetencia;

            $scope.obterParametrosPagamentos();
        }

        init();

    }
]);