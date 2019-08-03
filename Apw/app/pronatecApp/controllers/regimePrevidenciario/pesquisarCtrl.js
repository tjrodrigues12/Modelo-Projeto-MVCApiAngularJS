regimePrevidenciarioMdl.controller('pesquisarCtrl', ['$scope', 'regimePrevidenciarioSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'descricao', displayName: 'Descricao', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'sigla', displayName: 'Sigla', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
        ];

        $scope.obterRegimePrevidenciarioGridDados = function () {
            $scope.loadTela = service.obterDadosRegimePrevidenciarioGrid($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.lenght == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

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
                $scope.obterRegimePrevidenciarioGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterRegimePrevidenciarioGridDados();
            });
        }

        $scope.excluir = function (item) {
            $scope.$parent.regimePrevidenciarioId = item.regimePrevidenciarioId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadTela = service.excluir($scope.$parent.regimePrevidenciarioId).then(function (response) {
                if (response.data)
                    $scope.obterRegimePrevidenciarioGridDados();
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.regimePrevidenciarioId = item.regimePrevidenciarioId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };        

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterRegimePrevidenciarioGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.init();

    }
])