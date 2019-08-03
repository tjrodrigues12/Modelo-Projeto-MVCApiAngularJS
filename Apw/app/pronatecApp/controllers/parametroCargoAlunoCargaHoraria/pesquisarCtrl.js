parametroCargoAlunoCargaHorariaMdl.controller('pesquisarCtrl', ['$scope', 'paramentroCargoAlunoCargaHorariaSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dados = $scope.estadoPesquisar;

        //#region Grid Definição

        $scope.template = '<div class="action-buttons">' +
                            '<a class="blue" href="" ng-click="grid.appScope.parametro(row.entity)"><i title="Parâmetros Carga Horária" class="icon-sitemap bigger-130"></i></a>' +
                            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir Vigência" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'dataInicioVigencia', displayName: 'Data de Início da Vigência', cellFilter: 'data', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'dataFimVigencia', displayName: 'Data de Final da Vigência', cellFilter: 'data', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterParametroGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterParametroGridDados();
            });
        }

        //#endregion

        //#region Obter Dados

        $scope.obterProgramas = function () {
            $scope.loadPrograma = service.obterProgramas().then(response => {
                $scope.listaProgramas = response.data;
                $scope.dados.filtro.programaCargoId = null;
            })
        }

        $scope.obterProgramasCargos = function () {
            $scope.dados.filtro.programaCargoId = null;
            if ($scope.dados.filtro.programaId == null || $scope.dados.filtro.programaId == undefined)
                $scope.dados.filtro.programaId = 0;

            $scope.loadCargo = service.obterProgramasCargos($scope.dados.filtro.programaId).then(response => {
                $scope.listaProgramaCargo = response.data;
            })

            if (!$scope.dados.filtro.programaId > 0) {
                $scope.dados.grid.data = null;
            }
        }

        $scope.obterParametroGridDados = function () {
            $scope.loadPesquisar = service.obterParametroVigenciaGridDadosParaPesquisar($scope.dados.filtro).then(response => {
                $scope.dados.grid.data = response.data.lista;
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

        //#endregion

        //#region Métodos

        $scope.manterListas = function () {
            $scope.$parent.listaProgramas = $scope.listaProgramas;
            $scope.$parent.listaProgramaCargo = $scope.listaProgramaCargo;
        }

        $scope.retornarDadosListas = function () {
            $scope.listaProgramas = $scope.$parent.listaProgramas;
            $scope.listaProgramaCargo = $scope.$parent.listaProgramaCargo;
        }

        //#endregion

        //#region Eventos

        $scope.onChangeDllProgramaCargo = function () {
            if (!$scope.dados.filtro.programaCargoId > 0)
                $scope.dados.grid.data = null;
        }

        $scope.pesquisar = function () {
            $scope.obterParametroGridDados();
        }

        $scope.incluir = function () {
            $scope.manterListas();
            $scope.redirecionarIncluirVigencia();
        }

        $scope.editar = function (item) {
            $scope.$parent.parametroVigenciaId = item.parametroVigenciaId;
            $scope.manterListas();
            $scope.redirecionarEditarVigencia();
        }

        $scope.excluir = function (item) {
            $scope.$parent.parametroVigenciaId = item.parametroVigenciaId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirParametroVigencia($scope.$parent.parametroVigenciaId).then(response => {
                if (response.data) {
                    $scope.obterParametroGridDados();
                }
            });
        }

        $scope.parametro = function (item) {
            $scope.$parent.parametroVigenciaId = item.parametroVigenciaId;
            $scope.manterListas();
            $scope.redirecionarParametro();
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dados == undefined || $scope.dados == null) { $scope.redirecionarPesquisar(); }

            if ($scope.dados.filtro.programaId > 0 && $scope.dados.filtro.programaCargoId > 0) {
                $scope.retornarDadosListas();
                $scope.obterParametroGridDados();
            }
            else {
                $scope.obterProgramas();
            }
            
        }

        $scope.init();

    }
]);