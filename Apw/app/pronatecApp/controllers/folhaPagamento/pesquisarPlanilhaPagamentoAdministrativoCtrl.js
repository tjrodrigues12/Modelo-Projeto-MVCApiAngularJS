folhaPagamentoMdl.controller('pesquisarPlanilhaPagamentoAdministrativoCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarPlanilhaPagamentoAdministrativo;

        $scope.template = '<div class="action-buttons">' +
                            '<a class="green" href="" ng-click="grid.appScope.lancar(row.entity)"><i title="Detalhes" class="icon-list bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'competencia', displayName: 'Competência', width: 100, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programa', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'curso', displayName: 'Curso', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'alocados', displayName: 'Alocados', width: 85, disableHiding: true },
            { name: 'templateAcoes', displayName: '', width: 85, cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
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
            $scope.loadAc = service.obterAnosCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo($scope.dados.filtro).then(function (response) {
                $scope.dados.anosCompetencias = response.data;
                if (globalSvc.objValido($scope.dados.anosCompetencias)) {
                    if ($scope.dados.anosCompetencias.length == 0) $scope.dados.anosCompetencias = null;
                    else if ($scope.dados.anosCompetencias.length == 1) {
                        $scope.dados.filtro.anoCompetencia = $scope.dados.anosCompetencias[0].anoCompetencia;
                        $scope.obterMesesCompetencias();
                    }
                }
            });

            $scope.dados.filtro.anoCompetencia = "";
            $scope.dados.mesesCompetencias = [];
            $scope.dados.filtro.mesCompetencia = "";
        }

        $scope.obterMesesCompetencias = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoCompetencia)) {
                $scope.loadMc = service.obterMesesCompetenciasParaPesquisarPlanilhaPagamentoAdministrativo($scope.dados.filtro).then(function (response) {
                    $scope.dados.mesesCompetencias = response.data;
                    if (globalSvc.objValido($scope.dados.mesesCompetencias)) {
                        if ($scope.dados.mesesCompetencias.length == 0) $scope.dados.mesesCompetencias = null;
                        else if ($scope.dados.mesesCompetencias.length == 1) {
                            $scope.dados.filtro.mesCompetencia = $scope.dados.mesesCompetencias[0].mesCompetencia;
                        }
                    }
                });
            }
            else $scope.dados.mesesCompetencias = [];

            $scope.dados.filtro.mesCompetencia = "";
        }

        $scope.obterGridDados = function () {
            $scope.loadTela = service.obterCursosGridDadosParaPesquisarPlanilhaPagamentoAdministrativo($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null && $scope.dados.grid.data.length == 0) {
                    globalService.mensagemNegativo("Nenhum registro encontrado!");
                }
            });
        }

        $scope.lancar = function (item) {
            $scope.$parent.cursoId = item.cursoId;
            $scope.$parent.anoCompetencia = item.anoCompetencia;
            $scope.$parent.mesCompetencia = item.mesCompetencia;
            $scope.$parent.manterEstadoPesquisarPlanilhaPagamentoAdministrativo($scope.dados);
            $scope.redirecionarLancarPlanilhaPagamentoAdministrativo();
        }

        $scope.pesquisar = function () {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

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