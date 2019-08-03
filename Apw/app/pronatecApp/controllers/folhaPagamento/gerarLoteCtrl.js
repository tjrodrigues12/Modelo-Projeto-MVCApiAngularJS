folhaPagamentoMdl.controller('gerarLoteCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService', '$interval',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService, $interval) {

        $scope.loteDados = {
            folhaPagamentoId: $scope.$parent.folhaPagamentoId,
            valorReferencia: 0,
            valorInss: 0,
            descricao: null,
            listaFolhasLancamentos: []
        };

        $scope.obterProgramaCargos = function () {
            $scope.loadProgramaCargos = service.obterProgramaCargos($scope.$parent.folhaPagamentoId).then(response => {
                $scope.programaCargos = response.data;
            });
        };

        $scope.pesquisar = function () {
            if (new validationService().checkFormValidity($scope.formLoteDados)) {
                $scope.obterGridFolhaLancamentos();
            }
            else
                globalSvc.mensagemNegativo("Informe uma descrição para o lote");            
        };

        $scope.obterGridFolhaLancamentos = function () {
            $scope.loadGridFolhaLancamentos = service.obterGridFolhaLancamentos($scope.$parent.folhaPagamentoId, $scope.programaCargoId).then(response => {
                $scope.gridFolhaLancamentos = response.data;
            });
        };

        $scope.marcarTodos = function () {
            $scope.loteDados.valorReferencia = 0;
            $scope.loteDados.valorInss = 0;

            if ($scope.todos) {
                $scope.gridFolhaLancamentos.forEach(item => {
                    item.marcado = $scope.todos
                    somarValorLote(item)
                });
            }
            else {
                $scope.gridFolhaLancamentos.forEach(item => {
                    item.marcado = $scope.todos
                });
            }
        };

        $scope.marcarItem = function (item) {
            somarValorLote(item);
            validarTodosMarcados();
        };

        $scope.gerar = function () {
            if ($scope.gridFolhaLancamentos) {
                $scope.gridFolhaLancamentos.forEach(item => {
                    if (item.marcado) {
                        item.listaFolhasLancamentos.forEach(folha => {
                            $scope.loteDados.listaFolhasLancamentos.push(folha);
                        });
                    }
                });

                if ($scope.loteDados.listaFolhasLancamentos.length > 0) {

                    $scope.loadGerarLotePagamento = service.gerarLotePagamento($scope.loteDados).then(response => {
                        if (response.data) {
                            globalSvc.mensagemPositivo("Lote gerado com sucesso!");
                            $scope.redirecionarPesquisarLote();
                        }
                    });
                }
                else
                    globalSvc.mensagemNegativo("Nenhum registro foi selecionado");
            }
        };

        var somarValorLote = function (item) {
            if (item.marcado) {
                $scope.loteDados.valorReferencia += item.valorReferencia;
                $scope.loteDados.valorInss += item.valorInss;
            }
            else {
                $scope.loteDados.valorReferencia -= item.valorReferencia;
                $scope.loteDados.valorInss -= item.valorInss;
            }
        };

        var validarTodosMarcados = function () {
            var todosMarcados = $scope.gridFolhaLancamentos.every(x => { return x.marcado == true });
            $scope.todos = todosMarcados;
        };

        var init = function () {
            if ($scope.$parent.folhaPagamentoId > 0)
                $scope.obterProgramaCargos();
            else
                $scope.redirecionarPesquisarLote();
        };

        init();
    }
]);