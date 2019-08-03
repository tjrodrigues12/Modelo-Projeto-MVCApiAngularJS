instituicaoFormacaoMdl.controller('pesquisarCtrl', ['$scope', 'instituicaoFormacaoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'
                             
        $scope.dados.grid.columnDefs = [
            { field: 'descricao', displayName: 'Instituição / Formação', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'sigla', displayName: 'Sigla', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterInstituicoesFormacoesGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterInstituicoesFormacoesGridDados();
            });
        }

        $scope.pesquisar = function () {

            globalSvc.limparMensagens();

            if (!new validationService().checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return;
            }

            $scope.obterInstituicoesFormacoesGridDados();
        }

        $scope.obterInstituicoesFormacoesGridDados = function () {
            $scope.loadTela = service.obterInstituicoesFormacoesGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null && $scope.dados.grid.data.length == 0) globalSvc.mensagemNegativo("Nenhum registro encontrado!");
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.instituicaoFormacaoId = item.instituicaoFormacaoId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };

        $scope.excluir = function (item) {
            $scope.$parent.instituicaoFormacaoId = item.instituicaoFormacaoId;
        }

        $scope.confirmarExcluir = function (bool) {
            $scope.loadTela = service.excluir($scope.$parent.instituicaoFormacaoId).then(function (response) {
                if (response.data) $scope.obterInstituicoesFormacoesGridDados();
            });
        }

        $scope.init = function () {
            if (globalSvc.objValido($scope.dados) && globalSvc.strValido($scope.dados.filtro.textoPesquisa)) {
                $scope.obterInstituicoesFormacoesGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.init();
    }
]);