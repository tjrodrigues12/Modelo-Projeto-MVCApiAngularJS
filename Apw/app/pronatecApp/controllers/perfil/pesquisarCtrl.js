perfilMdl.controller('pesquisarCtrl', ['$scope', 'perfilSvc', 'globalSvc', 'uiGridConstants', '$filter',
    function ($scope, service, globalSvc, uiGridConstants, $filter) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterPerfisGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.template = '<div class="action-buttons">'
                        + '<a class="green" href="" ng-click="grid.appScope.menu(row.entity)"><i title="Menu" class="icon-flag bigger-130"></i></a>'
                        + '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>'
                        + '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nivel', displayName: 'Nível', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'descricao', displayName: 'Perfil', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                    $scope.dados.filtro.ordenacao = sortColumns[0].name
                }
                $scope.obterPerfisGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterPerfisGridDados();
            });
        }

        $scope.obterPerfisGridDados = function () {
            $scope.loadTela = service.obterPerfisGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.TotalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        $scope.menu = function (item) {
            $scope.$parent.perfilSelecionado = {
                descricao: item.descricao,
                perfilId: item.perfilId
            }
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarMenu();
        };

        $scope.editar = function (item) {
            $scope.$parent.perfilId = item.perfilId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };

        $scope.excluir = function (item) {
            $scope.perfilParaExcluir = item.perfilId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadTela = service.excluir($scope.perfilParaExcluir).then(function (response) {
                if (response.data) {
                    $scope.obterPerfisGridDados();
                    $scope.perfilParaExcluir = null;
                    globalSvc.mensagemPositivo("Registro excluído com sucesso!");
                }
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        $scope.init();

    }
]);