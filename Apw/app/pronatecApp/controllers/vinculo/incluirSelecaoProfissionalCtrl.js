vinculoMdl.controller('incluirSelecaoProfissionalCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoIncluir;

        $scope.dados.grid.columnDefs = [
             { field: 'nomeCompleto', displayName: 'Nome', width: 500, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
             { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', width: 170, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
             { field: 'dataNascimento', displayName: 'Data de Nascimento', cellFilter: 'data', width: 170, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
             { field: 'sexo', displayName: 'Sexo', cellFilter: 'sexo', width: 170, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } }
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
                $scope.obterProfissionalGridDados();
            });
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.dados.pessoaId = ($scope.dados.pessoaId != row.entity.pessoaId) ? row.entity.pessoaId : 0;
            }.bind(this));
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterProfissionalGridDados();
            });
        }

        $scope.obterProfissionalGridDados = function () {
            $scope.loadTela = service.obterProfissionalGridDadosParaIncluir($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

        $scope.avancar = function () {
            globalSvc.limparMensagens();
            if ($scope.dados.pessoaId != undefined && $scope.dados.pessoaId != null && $scope.dados.pessoaId > 0) {
                $scope.dados.passo = 2;
                $scope.$parent.manterEstadoIncluir($scope.dados);
                $scope.$parent.redirecionarIncluir();
            }
            else {
                globalSvc.mensagemNegativo("Selecione o profissional a ser vinculado!");
            }            
        };

        var init = function () {
            if ($scope.dados != undefined && $scope.dados != null
                && $scope.dados.passo != undefined && $scope.dados.passo != null && $scope.dados.passo == 1) {
                if ($scope.gridApi != undefined && $scope.gridApi != null && $scope.gridApi.selection != undefined && $scope.gridApi.selection != null) {
                    $scope.gridApi.selection.clearSelectedRows();
                }
            }
            else $scope.$parent.redirecionarVinculosProfissional();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisarProfissional();
        };

    }
]);