folhaPagamentoMdl.controller('lancarPlanilhaPagamentoAdministrativoCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, $filter, validationService) {

        $scope.dados = {};

        $scope.drop = {};

        $scope.obterParametrosPagamentos = function () {
            $scope.loadPp = service.obterParametrosPagamentosParaLancarPlanilhaPagamentoAdministrativo().then(function (response) {
                $scope.parametrosPagamentos = response.data;
                $scope.obterCurso();
                $scope.obterFolhasLancamentos();
            });
        };

        $scope.obterCurso = function () {
            $scope.loadCur = service.obterCursoParaLancarPlanilhaPagamentoAdministrativo($scope.dados.cursoId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                $scope.dados = response.data;
            });
        };

        $scope.obterFolhasLancamentos = function () {
            $scope.loadFl = service.obterFolhasLancamentosParaLancarPlanilhaPagamentoAdministrativo($scope.dados.cursoId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
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
            $scope.loadTela = service.imprimirPlanilhaPagamentoAdministrativo($scope.dados.cursoId, $scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                globalSvc.saveData(response.data, "PlanilhaPagamentoAdministrativo.pdf");
            });
        }

        $scope.salvar = function (item) {

            globalSvc.limparMensagens();

            if (!validarCamposObrigatorios(item)) return;

            $scope.loadTela = service.salvarLancamentoParaLancarPlanilhaPagamentoAdministrativo(item).then(response => {
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
            $scope.redirecionarPesquisarPlanilhaPagamentoAdministrativo();
        }

        function init() {
            /* Verificação para manter o estado da tela pesquisa */
            if (!globalSvc.idValido($scope.$parent.cursoId)) $scope.voltar();

            $scope.dados.cursoId = $scope.$parent.cursoId;
            $scope.dados.anoCompetencia = $scope.$parent.anoCompetencia;
            $scope.dados.mesCompetencia = $scope.$parent.mesCompetencia;

            $scope.obterParametrosPagamentos();
        }

        init();

    }
]);