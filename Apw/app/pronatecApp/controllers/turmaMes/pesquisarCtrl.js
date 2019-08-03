turmaMesMdl.controller('pesquisarCtrl', ['$scope', 'turmaMesSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dados = $scope.$parent.gridDados;

        //#region Grid Definição

        $scope.template = '<div class="action-buttons">' +
                            '<a class="blue" href="" ng-if="!row.entity.turmaMesId > 0" ng-click="grid.appScope.incluir(row.entity)" ><i title="Marcar Alunos Programa" class="icon-group bigger-130"></i></a>' +
                            '<a class="green" href="" ng-if="row.entity.turmaMesId > 0" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="orange" href="" ng-if="row.entity.turmaMesId > 0" ng-click="grid.appScope.visualizar(row.entity)"><i title="Visualizar Alunos Programa" class="icon-book bigger-130"></i></a>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeTurma', displayName: 'Turma', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'turnoDescricao', displayName: 'Turno', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'quantidadeAlunosAtivos', displayName: 'Quantidade Alunos Ativos', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'curso', displayName: 'Curso', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programa', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'turmaMesId', displayName: 'Situação', cellFilter: 'situacaoTurmaMes', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', width: 60, cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
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
                $scope.obterTurmaMesGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterTurmaMesGridDados();
            });
        }

        //#endregion

        //#region Obter Dados

        $scope.obterAnoReferencia = function () {
            $scope.loadAno = service.obterAnoReferenciaParaPesquisar().then(response => {
                $scope.dados.anosReferencias = response.data;
            });
        }

        $scope.obterMeses = function () {
            $scope.dados.filtro.mesId = null;
            $scope.dados.grid.data = null;

            if ($scope.dados.filtro.anoReferencia > 0) {
                $scope.loadMeses = service.obterMesesParaPesquisar($scope.dados.filtro.anoReferencia).then(response => {
                    $scope.dados.mesRefencia = response.data;
                });
            }
        }

        $scope.obterProgramas = function () {
            $scope.loadPrograma = service.obterProgramasParaPesquisar().then(response => {
                $scope.dados.programas = response.data;
            });
        }

        $scope.obterCursos = function () {
            $scope.dados.filtro.cursoId = null;

            if ($scope.dados.filtro.programaId > 0) {
                $scope.loadCurso = service.obterCursosParaPesquisar($scope.dados.filtro.programaId).then(response => {
                    $scope.dados.cursos = response.data;
                });
            }
            else {
                $scope.dados.cursos = null;
            }
        }

        $scope.obterTurmaMesGridDados = function () {
            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                $scope.loadObterDados = service.obterTurmaMesParaPesquisar($scope.dados.filtro).then(response => {
                    $scope.dados.grid.data = response.data.lista;
                    $scope.dados.grid.totalItems = response.data.numeroRegistros;
                    if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                        if ($scope.dados.grid.data.length == 0) {
                            globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                        }
                    }
                });
            }
            else {
                $scope.dados.grid.data = null;
            }
        }

        //#endregion

        //#region Eventos

        $scope.pesquisar = function () {
            $scope.obterTurmaMesGridDados();
        }

        $scope.incluir = function (item) {
            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0 && item.turmaId > 0) {
                var dadosIncluir = {
                    anoReferencia: $scope.dados.filtro.anoReferencia, mesId: $scope.dados.filtro.mesId, turmaId: item.turmaId,
                    nomeTurma: item.nomeTurma, programa: item.programa, turnoDescricao: item.turnoDescricao, curso: item.curso
                };
                $scope.$parent.dadosIncluir = dadosIncluir;
                $scope.redirecionarIncluir();
            }
            else {
                globalSvc.mensagemNegativo("Ano Referência, Mês e/ou Turma Inválida!");
            }
        }

        $scope.editar = function (item) {
            if (item.turmaMesId > 0) {
                var dadosEditar = {
                    anoReferencia: $scope.dados.filtro.anoReferencia, mesId: $scope.dados.filtro.mesId, turmaId: item.turmaId, curso: item.curso,
                    nomeTurma: item.nomeTurma, programa: item.programa, turnoDescricao: item.turnoDescricao, turmaMesId: item.turmaMesId
                };
                $scope.$parent.dadosEditar = dadosEditar;
                $scope.redirecionarEditar();
            }
            else {
                globalSvc.mensagemNegativo("TurmaMesId Inválido!");
            }
        }

        $scope.visualizar = function (item) {
            if (item.turmaMesId > 0) {
                var dadosVisualizar = {
                    anoReferencia: $scope.dados.filtro.anoReferencia, mesId: $scope.dados.filtro.mesId, turmaId: item.turmaId, curso: item.curso,
                    nomeTurma: item.nomeTurma, programa: item.programa, turnoDescricao: item.turnoDescricao, turmaMesId: item.turmaMesId
                };
                $scope.$parent.dadosVisualizar = dadosVisualizar;
                $scope.redirecionarVisualizar();
            }
            else {
                globalSvc.mensagemNegativo("TurmaMesId Inválido!");
            }
        }

        $scope.pesquisaDetalhada = function () {
            $scope.detalharPesquisa = !$scope.detalharPesquisa;
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dados == undefined || $scope.dados == null) { $scope.redirecionarPesquisar(); }

            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                $scope.obterTurmaMesGridDados();
            }
            else {
                $scope.detalharPesquisa = false;
                $scope.obterAnoReferencia();
                $scope.obterProgramas();
            }
        }

        $scope.init();

    }
]);