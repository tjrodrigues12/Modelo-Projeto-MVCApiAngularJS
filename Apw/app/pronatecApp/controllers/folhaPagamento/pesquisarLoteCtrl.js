folhaPagamentoMdl.controller('pesquisarLoteCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarLote;

        $scope.obterSituacoesLotePagamento = function () {
            $scope.loadSituacoesLotePagamento = service.obterSituacoesLotePagamento($scope.$parent.folhaPagamentoId).then(response => {
                $scope.dados.situacoesLotePagamento = response.data;
            });
        };

        $scope.pesquisar = function () {
            $scope.obterGridDados();
        };

        $scope.template = '<div class="action-buttons">'
				            + '<a class="green" href="" ng-click="grid.appScope.detalhes(row.entity)"><i title="Detalhes" class="icon-list bigger-130"></i></a>'
                            + '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'
                            + '</div>';

        $scope.dados.grid.columnDefs = [
            { field: 'descricao', displayName: 'Descrição', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'valorBruto', displayName: 'Valor Bruto', cellFilter: 'moeda', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'valorInss', displayName: 'Valor Inss', cellFilter: 'moeda', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'quantidadeLancamentos', displayName: 'Lançamentos', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'quantidadeLancamentosPagos', displayName: 'Lançamentos Pagos', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'situacao', displayName: 'Situação', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
        ];

        $scope.dados.grid.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length === 0) {
                    $scope.dados.filtro.orientacao = null;
                    $scope.dados.filtro.ordenacao = null;
                } else {
                    $scope.dados.filtro.orientacao = sortColumns[0].sort.direction;
                    $scope.dados.filtro.ordenacao = sortColumns[0].name;
                }
                $scope.obterGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterGridDados();
            });
        };

        $scope.obterGridDados = function () {
            $scope.loadGridDados = service.obterLotePagamentoGridDados($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null && $scope.dados.grid.data.length == 0) {
                    globalService.mensagemNegativo("Nenhum registro encontrado!");
                }
            });
        }

        $scope.detalhes = function (item) {
            $scope.$parent.folhaLotePagamentoId = item.folhaLotePagamentoId;
            $scope.$parent.manterEstadoPesquisarLote($scope.dados);
            $scope.redirecionarDetalhesLote();
        }

        $scope.excluir = function (item) {
            $scope.folhaLotePagamentoIdParaExcluir = item.folhaLotePagamentoId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadExcluir = service.excluirLotePagamento($scope.folhaLotePagamentoIdParaExcluir).then(function (response) {
                if (response.data) {
                    globalSvc.mensagemPositivo("Registro excluído com sucesso!");
                    $scope.obterGridDados();
                }
            });
        }

        function init() {
            if ($scope.$parent.folhaPagamentoId > 0) {
                $scope.dados.filtro.folhaPagamentoId = $scope.$parent.folhaPagamentoId;
                if (!$scope.dados.filtro.situacaoFolhaPagamentoId)
                    $scope.obterSituacoesLotePagamento();
            }
            else
                $scope.redirecionarPesquisar();
        }

        init();

    }
]);