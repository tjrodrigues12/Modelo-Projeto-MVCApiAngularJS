OrgaoExpedicaoDocumentoMdl.controller('pesquisarCtrl', ['$scope', 'OrgaoExpedicaoDocumentoSvc', 'globalSvc', 'uiGridConstants', '$filter',
    function ($scope, service, globalSvc, uiGridConstants, $filter) {

        $scope.dados = $scope.$parent.estadoPesquisar;


        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            //{ field: 'orgaoExpedicaoDocumentoIdentificacaoId', displayName: 'ID', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'descricao', displayName: 'Descricao', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'sigla', displayName: 'Sigla', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
        ];

        $scope.obterOrgaoExpedicaoDocumentoGridDados = function () {
            $scope.loadTela = service.obterDadosOrgaoExpedicaoDocumentoGrid($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.length == 0) {
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
                $scope.obterOrgaoExpedicaoDocumentoGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterOrgaoExpedicaoDocumentoGridDados();
            });
        }

        $scope.excluir = function (item) {
            $scope.$parent.orgaoExpedicaoDocumentoIdentificacaoId = item.orgaoExpedicaoDocumentoIdentificacaoId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadTela = service.excluir($scope.$parent.orgaoExpedicaoDocumentoIdentificacaoId).then(function (response) {
                if (response.data)
                    $scope.obterOrgaoExpedicaoDocumentoGridDados();
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.orgaoExpedicaoDocumentoIdentificacaoId = item.orgaoExpedicaoDocumentoIdentificacaoId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterOrgaoExpedicaoDocumentoGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.init();

    }
]);