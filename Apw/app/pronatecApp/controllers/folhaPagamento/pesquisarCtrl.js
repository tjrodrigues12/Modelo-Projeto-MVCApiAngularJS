folhaPagamentoMdl.controller('pesquisarCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.template = '<div class="action-buttons">' 
				            + '<a class="green" href="" ng-click="grid.appScope.detalhes(row.entity)"><i title="Detalhes" class="icon-list bigger-130"></i></a>'
                            + '<a class="green" href="" ng-click="grid.appScope.lote(row.entity)"><i title="Lotes" class="icon-exchange bigger-130"></i></a>'
                            + '</div>';

        $scope.dados.grid.columnDefs = [
            { field: 'dataOperacao', displayName: 'Data', cellFilter: 'data:"dd/MM/yyyy HH:mm"', width: 130, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'anoCompetencia', displayName: 'Ano / Competência', width: 100, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'mesCompetencia', displayName: 'Mês / Competência', width: 100, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'descricao', displayName: 'Descrição', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'versao', displayName: 'Versão', width: 85, cellFilter: 'versaoPagamento', disableHiding: true },
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
        }

        $scope.obterAnosCompetencias = function () {
            $scope.loadAc = service.obterAnosCompetenciasParaPesquisar().then(function (response) {
                $scope.dados.anosCompetencias = response.data;
                if ($scope.dados.anosCompetencias != undefined && $scope.dados.anosCompetencias != null) {
                    if ($scope.dados.anosCompetencias.length == 0) $scope.dados.anosCompetencias = null;
                    else if ($scope.dados.anosCompetencias.length == 1) {
                        $scope.dados.filtro.anoCompetencia == $scope.dados.anosCompetencias[0].anoCompetencia;
                        $scope.obterMesesCompetencias();
                    }
                }
            });

            $scope.dados.filtro.anoCompetencia = "";
            $scope.dados.mesesCompetencias = [];
            $scope.dados.filtro.mesCompetencia = "";
        };

        $scope.obterMesesCompetencias = function () {
            if ($scope.dados.filtro.anoCompetencia != undefined && $scope.dados.filtro.anoCompetencia != null && $scope.dados.filtro.anoCompetencia > 0) {
                $scope.loadMc = service.obterMesesCompetenciasParaPesquisar($scope.dados.filtro.anoCompetencia).then(function (response) {
                    $scope.dados.mesesCompetencias = response.data;
                    if ($scope.dados.mesesCompetencias != undefined && $scope.dados.mesesCompetencias != null) {
                        if ($scope.dados.mesesCompetencias.length == 0) $scope.dados.mesesCompetencias = null;
                        else if ($scope.dados.mesesCompetencias.length == 1) {
                            $scope.dados.filtro.mesCompetencia == $scope.dados.mesesCompetencias[0].mesCompetencia;
                        }
                    }
                });
            }
            else $scope.dados.mesesCompetencias = [];

            $scope.dados.filtro.mesCompetencia = "";
        };

        $scope.obterGridDados = function () {
            $scope.loadTela = service.obterFolhasPagamentosGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null && $scope.dados.grid.data.length == 0) {
                    globalService.mensagemNegativo("Nenhum registro encontrado!");
                }
            });
        }

        $scope.detalhes = function (item) {
            $scope.$parent.folhaPagamentoId = item.folhaPagamentoId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarDetalhes();
        }

        $scope.lote = function (item) {
            $scope.$parent.folhaPagamentoId = item.folhaPagamentoId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarPesquisarLote();
        }

        $scope.pesquisar = function () {

            globalSvc.limparMensagens();

            $scope.obterGridDados();
        }

        function init() {
            /* Verificação para manter o estado da tela pesquisa */
            if ($scope.dados.filtro.anoCompetencia == undefined || $scope.dados.filtro.anoCompetencia == null) {
                $scope.dados.anosCompetencias = [];
                $scope.dados.mesesCompetencias = [];
                $scope.obterAnosCompetencias();
            }
        }

        init();

    }
]);