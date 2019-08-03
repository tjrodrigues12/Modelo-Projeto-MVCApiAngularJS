folhaPagamentoMdl.controller('pesquisarPlanilhaPagamentoDocenteCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarPlanilhaPagamentoDocente;

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.lancar(row.entity)"><i title="Detalhes" class="icon-list bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'competencia', displayName: 'Competência', width: 100, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'anoLetivo', displayName: 'Ano Letivo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'curso', displayName: 'Curso', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'anoFase', displayName: 'Ano / Fase', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'turno', displayName: 'Turno', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'nomeTurma', displayName: 'Turma', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
            $scope.loadAc = service.obterAnosCompetenciasParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                $scope.dados.anosCompetencias = response.data;
                if (globalSvc.objValido($scope.dados.anosCompetencias)) {
                    if ($scope.dados.anosCompetencias.length == 0) $scope.dados.anosCompetencias = null;
                    else if ($scope.dados.anosCompetencias.length == 1) {
                        $scope.dados.filtro.anoCompetencia = $scope.dados.anosCompetencias[0].anoCompetencia;
                        $scope.obterMesesCompetencias();
                        $scope.obterCursos();
                    }
                }
            });

            $scope.dados.filtro.anoCompetencia = "";
            $scope.dados.mesesCompetencias = [];
            $scope.dados.filtro.mesCompetencia = "";
            $scope.dados.anosLetivos = [];
            $scope.dados.filtro.anoLetivoId = "";
            $scope.dados.cursos = [];
            $scope.dados.filtro.cursoId = "";
            $scope.dados.tiposOfertas = [];
            $scope.dados.filtro.tipoOfertaId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.projetosCiclos = [];
            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterMesesCompetencias = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoCompetencia)) {
                $scope.loadMc = service.obterMesesCompetenciasParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
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

        $scope.obterAnosLetivos = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoCompetencia)) {
                $scope.loadAl = service.obterAnosLetivosParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.anosLetivos = response.data;
                    if (globalSvc.objValido($scope.dados.anosLetivos)) {
                        if ($scope.dados.anosLetivos.length == 0) $scope.dados.anosLetivos = null;
                        else if ($scope.dados.anosLetivos.length == 1) {
                            $scope.dados.filtro.anoLetivoId = $scope.dados.anosLetivos[0].anoLetivoId;
                            $scope.obterCursos();
                        }
                    }
                });
            }
            else $scope.dados.anosLetivos = [];

            $scope.dados.filtro.anoLetivoId = "";
            $scope.dados.cursos = [];
            $scope.dados.filtro.cursoId = "";
            $scope.dados.tiposOfertas = [];
            $scope.dados.filtro.tipoOfertaId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.projetosCiclos = [];
            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterCursos = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoLetivoId)) {
                $scope.loadAl = service.obterCursosParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.cursos = response.data;
                    if (globalSvc.objValido($scope.dados.cursos)) {
                        if ($scope.dados.cursos.length == 0) $scope.dados.cursos = null;
                        else if ($scope.dados.cursos.length == 1) {
                            $scope.dados.filtro.cursoId = $scope.dados.cursos[0].cursoId;
                            $scope.obterTiposOfertas();
                        }
                    }
                });
            }
            else $scope.dados.cursos = [];

            $scope.dados.filtro.cursoId = "";
            $scope.dados.tiposOfertas = [];
            $scope.dados.filtro.tipoOfertaId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.projetosCiclos = [];
            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterTiposOfertas = function () {
            if (globalSvc.idValido($scope.dados.filtro.cursoId)) {
                $scope.loadTo = service.obterTiposOFertasParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.tiposOfertas = response.data;
                    if (globalSvc.objValido($scope.dados.tiposOfertas)) {
                        if ($scope.dados.tiposOfertas.length == 0) $scope.dados.tiposOfertas = null;
                        else if ($scope.dados.tiposOfertas.length == 1) {
                            $scope.dados.filtro.tipoOfertaId = $scope.dados.tiposOfertas[0].tipoOfertaId;
                            $scope.obterProgramas();
                        }
                    }
                });
            }
            else $scope.dados.tiposOfertas = [];

            $scope.dados.filtro.tipoOfertaId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.projetosCiclos = [];
            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterProgramas = function () {
            if (globalSvc.idValido($scope.dados.filtro.tipoOfertaId)) {
                $scope.loadProg = service.obterProgramasParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.programas = response.data;
                    if (globalSvc.objValido($scope.dados.programas)) {
                        if ($scope.dados.programas.length == 0) $scope.dados.programas = null;
                        else if ($scope.dados.programas.length == 1) {
                            $scope.dados.filtro.programaId = $scope.dados.programas[0].programaId;
                            $scope.obterProjetosCiclos();
                        }
                    }
                });
            }
            else $scope.dados.programas = [];

            $scope.dados.filtro.programaId = "";
            $scope.dados.projetosCiclos = [];
            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterProjetosCiclos = function () {
            if (globalSvc.idValido($scope.dados.filtro.programaId)) {
                $scope.loadPc = service.obterProjetosCiclosParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.projetosCiclos = response.data;
                    if (globalSvc.objValido($scope.dados.projetosCiclos)) {
                        if ($scope.dados.projetosCiclos.length == 0) $scope.dados.projetosCiclos = null;
                        else if ($scope.dados.projetosCiclos.length == 1) {
                            $scope.dados.filtro.projetoCicloId = $scope.dados.projetosCiclos[0].projetoCicloId;
                            $scope.obterAnosFases();
                        }
                    }
                });
            }
            else $scope.dados.projetosCiclos = [];

            $scope.dados.filtro.projetoCicloId = "";
            $scope.dados.anosFases = [];
            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterAnosFases = function () {
            if (globalSvc.idValido($scope.dados.filtro.projetoCicloId)) {
                $scope.loadAf = service.obterAnosFasesParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.anosFases = response.data;
                    if (globalSvc.objValido($scope.dados.anosFases)) {
                        if ($scope.dados.anosFases.length == 0) $scope.dados.anosFases = null;
                        else if ($scope.dados.anosFases.length == 1) {
                            $scope.dados.filtro.anoFaseId = $scope.dados.anosFases[0].anoFaseId;
                            $scope.obterTurnos();
                        }
                    }
                });
            }
            else $scope.dados.anosFases = [];

            $scope.dados.filtro.anoFaseId = "";
            $scope.dados.turnos = [];
            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterTurnos = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoFaseId)) {
                $scope.loadTur = service.obterTurnosParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                    $scope.dados.turnos = response.data;
                    if (globalSvc.objValido($scope.dados.turnos)) {
                        if ($scope.dados.turnos.length == 0) $scope.dados.turnos = null;
                        else if ($scope.dados.turnos.length == 1) {
                            $scope.dados.filtro.turnoId = $scope.dados.turnos[0].turnoId;
                        }
                    }
                });
            }
            else $scope.dados.turnos = [];

            $scope.dados.filtro.turnoId = "";
        }

        $scope.obterGridDados = function () {
            $scope.loadTela = service.obterTurmasGridDadosParaPesquisarPlanilhaPagamentoDocente($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null && $scope.dados.grid.data.length == 0) {
                    globalService.mensagemNegativo("Nenhum registro encontrado!");
                }
            });
        }

        $scope.lancar = function (item) {
            $scope.$parent.turmaId = item.turmaId;
            $scope.$parent.anoCompetencia = item.anoCompetencia;
            $scope.$parent.mesCompetencia = item.mesCompetencia;
            $scope.$parent.manterEstadoPesquisarPlanilhaPagamentoDocente($scope.dados);
            $scope.redirecionarLancarPlanilhaPagamentoDocente();
        }

        $scope.pesquisar = function () {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            $scope.obterGridDados();
        }

        $scope.pesquisaDetalhada = function () {
            $scope.dados.filtro.pesquisaDetalhada = !$scope.dados.filtro.pesquisaDetalhada;
        }

        function init() {
            /* Verificação para manter o estado da tela pesquisa */
            if ($scope.dados.filtro.anoCompetencia == undefined || $scope.dados.filtro.anoCompetencia == null) {
                $scope.dados.anosCompetencias = [];
                $scope.dados.mesesCompetencias = [];
                $scope.dados.anosLetivos = [];
                $scope.dados.cursos = [];
                $scope.dados.tiposOfertas = [];
                $scope.dados.programas = [];
                $scope.dados.projetosCiclos = [];
                $scope.dados.anosFases = [];
                $scope.dados.turnos = [];
                $scope.obterAnosCompetencias();
            }
        }

        init();
    }
]);