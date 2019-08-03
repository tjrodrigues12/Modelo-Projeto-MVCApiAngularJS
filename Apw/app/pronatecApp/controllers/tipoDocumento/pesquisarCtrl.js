tipoDocumentoMdl.controller('pesquisarCtrl', ['$scope', 'tipoDocumentoSvc', 'globalSvc', 'uiGridConstants', '$filter',
    function ($scope, service, globalSvc, uiGridConstants, $filter) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterTipoDocumentosGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.template = '<div class="action-buttons">'
                        + '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>'
                        + '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'documento', displayName: 'TipoDocumento', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'obrigatorio', displayName: 'Obrigatório', cellFilter: 'logico', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'validarComFormacao', displayName: 'Validar com Formação', cellFilter: 'logico', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'validarComTrabalho', displayName: 'Validar com Trabalho', cellFilter: 'logico', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'validarComProfissao', displayName: 'Validar com Profissão', cellFilter: 'logico', disableHidding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterTipoDocumentosGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterTipoDocumentosGridDados();
            });
        }

        $scope.obterTipoDocumentosGridDados = function () {
            $scope.loadTela = service.obterTipoDocumentosGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.TotalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.tipoDocumentoId = item.tipoDocumentoId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };

        $scope.excluir = function (item) {
            $scope.$parent.tipoDocumentoId = item.tipoDocumentoId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadTela = service.excluir($scope.$parent.tipoDocumentoId).then(function (response) {
                if (response.data)
                    $scope.obterTipoDocumentosGridDados();
            });
        }

        $scope.init();
        
    }
]);