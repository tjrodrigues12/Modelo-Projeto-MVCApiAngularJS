atualizacaoSalarialMdl.controller('pesquisarProfissionalCtrl', ['$scope', 'atualizacaoSalarialSvc', 'globalSvc', 'uiGridConstants', '$filter',
    function ($scope, service, globalSvc, uiGridConstants, $filter) {

        $scope.dadosPesquisarProfissionais = $scope.$parent.pesquisarProfissional;

        //#region Grid
        $scope.template = '<div class="action-buttons">' +
                            '<a class="blue" href="" ng-click="grid.appScope.vinculos(row.entity)"><i title="Vínculos" class="icon-zoom-in bigger-130"></i></a></div>'

        $scope.dadosPesquisarProfissionais.grid.columnDefs = [
            { field: 'nomeCompleto', displayName: 'Nome do Profissional', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpf', displayName: 'CPF do Profissional', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
        ];

        $scope.dadosPesquisarProfissionais.grid.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length === 0) {
                    $scope.dadosPesquisarProfissionais.filtro.orientacao = null;
                    $scope.dadosPesquisarProfissionais.filtro.ordenacao = null;
                } else {
                    $scope.dadosPesquisarProfissionais.filtro.orientacao = sortColumns[0].sort.direction;
                    $scope.dadosPesquisarProfissionais.filtro.ordenacao = sortColumns[0].name;
                }
                $scope.obterProfissionaisGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dadosPesquisarProfissionais.filtro.pagina = newPage;
                $scope.dadosPesquisarProfissionais.filtro.tamanhoPagina = pageSize;
                $scope.obterProfissionaisGridDados();
            });
        }

        //#endregion

        //#region Busca Grid
        $scope.obterProfissionaisGridDados = function () {
            $scope.loadTela = service.obterPesquisarProfissionaisGridDados($scope.dadosPesquisarProfissionais.filtro).then(function (response) {
                $scope.dadosPesquisarProfissionais.grid.totalItems = response.data.numeroRegistros;
                $scope.dadosPesquisarProfissionais.grid.data = response.data.lista;
                if ($scope.dadosPesquisarProfissionais.grid.data != undefined && $scope.dadosPesquisarProfissionais.grid.data != null) {
                    if ($scope.dadosPesquisarProfissionais.grid.data.length == undefined || $scope.dadosPesquisarProfissionais.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }
        //#endregion

        $scope.vinculos = function (item) {
            $scope.$parent.usuarioId = item.usuarioId;
            $scope.redirecionarPesquisar();
        }

        $scope.pesquisar = function () {
            $scope.obterProfissionaisGridDados();
        }

        $scope.init = function () {
            if ($scope.dadosPesquisarProfissionais == undefined || $scope.dadosPesquisarProfissionais == null) {
                $scope.redirecionarPesquisar();
            }
            else { $scope.obterProfissionaisGridDados(); }
        }

        $scope.init();

    }
]);