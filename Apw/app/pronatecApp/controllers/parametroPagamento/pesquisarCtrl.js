parametroPagamentoMdl.controller('pesquisarCtrl', ['$scope', 'parametroPagamentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.opcoesLogicas = [{ valor: true }, { valor: false }];

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'programa', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programaCargo', displayName: 'Cargo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'verbaPagamento', displayName: 'Verba', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'ativo', displayName: 'Situação', cellFilter: 'ativo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterParametrosPagamentosGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterParametrosPagamentosGridDados();
            });
        }

        $scope.obterProgramas = function () {
            $scope.loadPro = service.obterProgramasParaPesquisar().then(function (response) {
                $scope.dados.programas = response.data;
            });

            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
            $scope.dados.verbasPagamentos = [];
            $scope.dados.filtro.verbaPagamentoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if ($scope.dados.filtro.programaId != undefined && $scope.dados.filtro.programaId != null && $scope.dados.filtro.programaId > 0) {
                $scope.loadPc = service.obterProgramasCargosParaPesquisar($scope.dados.filtro.programaId).then(function (response) {
                    $scope.dados.programasCargos = response.data;
                });
            }
            else $scope.dados.programasCargos = [];

            $scope.dados.filtro.programaCargoId = "";
            $scope.dados.verbasPagamentos = [];
            $scope.dados.filtro.verbaPagamentoId = "";
        }

        $scope.obterVerbasPagamentos = function () {
            if ($scope.dados.filtro.programaCargoId != undefined && $scope.dados.filtro.programaCargoId != null && $scope.dados.filtro.programaCargoId > 0) {
                $scope.loadVp = service.obterVerbasPagamentosParaPesquisar($scope.dados.filtro.programaId, $scope.dados.filtro.programaCargoId).then(function (response) {
                    $scope.dados.verbasPagamentos = response.data;
                });
            }
            else $scope.dados.verbasPagamentos = [];

            $scope.dados.filtro.verbaPagamentoId = "";
        }

        $scope.obterParametrosPagamentosGridDados = function () {
            $scope.loadTela = service.obterParametrosPagamentosGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                if ((response.data.numeroRegistros / response.data.tamanhoPagina) < $scope.dados.filtro.pagina) $scope.dados.filtro.pagina = 1;
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

        $scope.pesquisar = function () {
            $scope.obterParametrosPagamentosGridDados();
        }

        $scope.pesquisaDetalhada = function () {
            $scope.dados.pesquisaDetalhada = !$scope.dados.pesquisaDetalhada;
        }

        $scope.pesquisaOcultada = function () {
            $scope.dados.pesquisaOcultada = !$scope.dados.pesquisaOcultada;
        }

        function validarPesquisar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        $scope.editar = function (item) {
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.$parent.parametroPagamentoId = item.parametroPagamentoId;
            $scope.redirecionarEditar();
        };

        $scope.excluir = function (item) {
            $scope.$parent.parametroPagamentoId = item.parametroPagamentoId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadTela = service.excluir($scope.$parent.parametroPagamentoId).then(function (response) {
                if (response.data) $scope.obterParametrosPagamentosGridDados();
            });
        }

        function init() {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterProgramas();
            }
            else $scope.redirecionarPesquisar();
        }

        init();
    }
]);