folhaPagamentoMdl.controller('detalhesCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.obterFolhaPagamento = function () {
            $scope.loadTela = service.obterFolhaPagamentoParaDetalhes($scope.$parent.folhaPagamentoId).then(function (response) {
                $scope.dados = response.data;
                $scope.obterLancamentosFolhaPagamentoGridDados();
            });
        }

        //#region Lançamentos

        $scope.lancamento = {
            grid: {
                paginationPageSizes: [10, 20],
                paginationPageSize: 10,
                enableColumnMenus: false,
                i18n: 'pt-br',
                columnDefs: [
                  { field: 'nomeProfissional', displayName: 'Profissional', width: 450, enableFiltering: false, cellTooltip: function (row, col) { return row.entity[col.field] } },
                  { field: 'cargaHorariaReferencia', displayName: 'CH', cellFilter: 'decimal', enableFiltering: false, headerCellClass: 'grid-align-right', cellClass: 'grid-align-right' },
                  { field: 'valorReferencia', displayName: "Valor Bruto", cellFilter: 'moeda', enableFiltering: false, headerCellClass: 'grid-align-right', cellClass: 'grid-align-right' },
                  { field: 'valorInss', displayName: "Valor INSS", cellFilter: 'moeda', enableFiltering: false, headerCellClass: 'grid-align-right', cellClass: 'grid-align-right' },
                  { field: 'valorDesconto', displayName: "Outros Descontos", cellFilter: 'moeda', enableFiltering: false, headerCellClass: 'grid-align-right', cellClass: 'grid-align-right' },
                  { field: 'valorReferenciaLiquida', displayName: "Valor Líquido", cellFilter: 'moeda', enableFiltering: false, headerCellClass: 'grid-align-right', cellClass: 'grid-align-right' }
                ]
            },
            filtro: {
                pagina: 1,
                tamanhoPagina: 10,
                orientacao: null,
                ordenacao: null,
                folhaPagamentoId: $scope.$parent.folhaPagamentoId
            }
        }

        $scope.lancamento.grid.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length === 0) {
                    $scope.lancamento.filtro.orientacao = null;
                    $scope.lancamento.filtro.ordenacao = null;
                } else {
                    $scope.lancamento.filtro.orientacao = sortColumns[0].sort.direction;
                    $scope.lancamento.filtro.ordenacao = sortColumns[0].name;
                }
                $scope.obterLancamentosFolhaPagamentoGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.lancamento.filtro.pagina = newPage;
                $scope.lancamento.filtro.tamanhoPagina = pageSize;
                $scope.obterLancamentosFolhaPagamentoGridDados();
            });
        }

        $scope.obterLancamentosFolhaPagamentoGridDados = function () {
            $scope.loadfl = service.obterFolhasLancamentosGridDadosParaDetalhes($scope.lancamento.filtro).then(function (response) {
                $scope.lancamento.grid.totalItems = response.data.numeroRegistros;
                $scope.lancamento.grid.data = response.data.lista;
            }, function (response) {
                globalService.tratarErroResponse(response);
            });
        }

        //#endregion

        $scope.gerarContribuintes = function () {

            globalSvc.limparMensagens();

            $scope.loadTela = service.obterDownloadContribuintesParaDetalhes($scope.dados.folhaPagamentoId).then(function (response) {

                if (response.data !== false) {

                    var nomeArquivo = "Lote_Contribuintes";
                    nomeArquivo += "_" + $scope.dados.mesCompetencia;
                    nomeArquivo += "_" + $scope.dados.anoCompetencia;
                    nomeArquivo += ".txt";

                    globalSvc.saveData(response.data, nomeArquivo);
                }
            });
        }

        $scope.gerarLancamentos = function () {

            globalSvc.limparMensagens();

            $scope.loadTela = service.obterDownloadLancamentosParaDetalhes($scope.dados.folhaPagamentoId).then(function (response) {

                if (response.data !== false) {

                    var nomeArquivo = "Lote_Lancamentos";
                    nomeArquivo += "_" + $scope.dados.mesCompetencia;
                    nomeArquivo += "_" + $scope.dados.anoCompetencia;
                    nomeArquivo += ".txt";

                    globalSvc.saveData(response.data, nomeArquivo);
                }
            });
        }

        $scope.exportarPlanilhaPagamento = function () {

            globalSvc.limparMensagens();

            $scope.loadTela = service.obterPlanilhaPagamentoParaDetalhes($scope.dados.folhaPagamentoId).then(function (response) {

                if (response.data !== false) {

                    var nomeArquivo = "Planilha_Pagamento";
                    nomeArquivo += "_" + $scope.dados.mesCompetencia;
                    nomeArquivo += "_" + $scope.dados.anoCompetencia;
                    nomeArquivo += ".xls";

                    globalSvc.saveData(response.data, nomeArquivo);
                }
            });
        }

        $scope.excluirFolhaPagamento = function () {

            globalSvc.limparMensagens();

            $scope.loadTela = service.excluirFolhaPagamentoParaDetalhes($scope.dados.folhaPagamentoId).then(function (response) {
                if (response.data) {
                    $('.modal-backdrop').hide();
                    atualizarGrid();
                    $scope.redirecionarPesquisar();
                }
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        function atualizarGrid() {

            var list = $scope.$parent.estadoPesquisar.grid.data;

            var ind = globalSvc.getIndex(list, 'folhaPagamentoId', $scope.dados.folhaPagamentoId);

            if (ind != -1) list.splice(ind, 1);
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }

        function init() {
            if ($scope.$parent.folhaPagamentoId) {
                $scope.obterFolhaPagamento();
            }
            else {
                $scope.$parent.redirecionarPesquisar();
            }
        };

        init();
    }
]);