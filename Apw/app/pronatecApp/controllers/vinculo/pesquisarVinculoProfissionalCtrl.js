vinculoMdl.controller('pesquisarVinculoProfissionalCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarProfissional;

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.vinculos(row.entity)"><i title="Vínculos" class="icon-list bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeProfissional', displayName: 'Nome do Profissional', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpfProfissional', displayName: 'CPF do Profissional', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'tipo', displayName: 'Tipo de Vínculo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cargaHoraria', displayName: 'Carga Horária', cellFilter: 'decimal', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterVinculoProfissionalGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterVinculoProfissionalGridDados();
            });
        }

        $scope.obterAnosReferencias = function () {
            $scope.loadAr = service.obterAnosReferenciasParaPesquisarVinculoProfissional($scope.dados.filtro).then(function (response) {
                $scope.dados.anosReferencias = response.data;
                if (globalSvc.objValido($scope.dados.anosReferencias)) {
                    if ($scope.dados.anosReferencias.length == 0) $scope.dados.anosReferencias = null;
                    else if ($scope.dados.anosReferencias.length == 1) {
                        $scope.dados.filtro.anoReferencia == $scope.dados.anosReferencias[0].anoReferencia;
                        $scope.obterProgramas();
                    }
                }
            });

            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterProgramas = function () {
            if (globalSvc.idValido($scope.dados.filtro.anoReferencia)) {
                $scope.loadProg = service.obterProgramasParaPesquisarVinculoProfissional($scope.dados.filtro).then(function (response) {
                    $scope.dados.programas = response.data;
                    if (globalSvc.objValido($scope.dados.programas)) {
                        if ($scope.dados.programas.length == 0) $scope.dados.programas = null;
                        else if ($scope.dados.programas.length == 1) {
                            $scope.dados.filtro.programaId == $scope.dados.programas[0].programaId;
                            $scope.obterProgramasCargos();
                        }
                    }
                });
            }
            else $scope.dados.programas = [];

            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if (globalSvc.idValido($scope.dados.filtro.programaId)) {
                $scope.loadPcr = service.obterProgramasCargosParaPesquisarVinculoProfissional($scope.dados.filtro).then(function (response) {
                    $scope.dados.programasCargos = response.data;
                    if (globalSvc.objValido($scope.dados.programasCargos)) {
                        if ($scope.dados.programasCargos.length == 0) $scope.dados.programasCargos = null;
                        else if ($scope.dados.programasCargos.length == 1) {
                            $scope.dados.filtro.programaCargoId == $scope.dados.programasCargos[0].programaCargoId;
                        }
                    }
                });
            }
            else $scope.dados.programasCargos = [];

            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterVinculoProfissionalGridDados = function () {
            $scope.loadTela = service.obterVinculoProfissionalGridDadosParaPesquisarVinculoProfissional($scope.dados.filtro).then(function (response) {
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

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.formPesquisa)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.obterVinculoProfissionalGridDados();
            }
        }

        $scope.pesquisaDetalhada = function () {
            $scope.dados.pesquisaDetalhada = !$scope.dados.pesquisaDetalhada;
        }

        $scope.incluir = function () {
            $scope.$parent.manterEstadoPesquisarProfissional($scope.dados);
            $scope.$parent.estadoIncluir.passo = null;
            $scope.$parent.redirecionarIncluir();
        }

        $scope.vinculos = function (item) {

            $scope.$parent.manterEstadoPesquisarProfissional($scope.dados);

            $scope.$parent.estadoVinculosProfissional.pessoaId = item.pessoaId;
            $scope.$parent.estadoVinculosProfissional.nomeProfissional = item.nomeProfissional;
            $scope.$parent.estadoVinculosProfissional.cpfProfissional = item.cpfProfissional;
            $scope.$parent.estadoVinculosProfissional.anoReferencia = $scope.dados.filtro.anoReferencia;
            $scope.$parent.estadoVinculosProfissional.programaId = $scope.dados.filtro.programaId;
            $scope.$parent.estadoVinculosProfissional.programaCargoId = $scope.dados.filtro.programaCargoId;
            $scope.$parent.estadoVinculosProfissional.vinculos = [];

            $scope.redirecionarVinculosProfissional();
        };

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                if ($scope.dados.filtro.anoReferencia == undefined || $scope.dados.filtro.anoReferencia == null) {
                    $scope.dados.anosReferencias = [];
                    $scope.dados.programas = [];
                    $scope.dados.programasCargos = [];
                    $scope.dados.municipios = [];
                    $scope.dados.unidadesEscolares = [];
                    $scope.obterAnosReferencias();
                }
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        $scope.init();
    }
]);