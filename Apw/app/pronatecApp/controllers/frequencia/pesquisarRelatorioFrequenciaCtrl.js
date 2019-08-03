frequenciaMdl.controller('pesquisarRelatorioFrequenciaCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.acao = {  pessoa: null, descricao: null };

        $scope.template = '<div class="action-buttons">' +
            '<a class="green" href="" ng-click="grid.appScope.imprimir(row.entity)"><i title="Imprimir" class="icon-print bigger-130"></i></a></div>';


        $scope.dados.grid.columnDefs = [
            { field: 'nomeProfissional', displayName: 'Nome do Profissional', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programa', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programaCargo', displayName: 'Cargo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'dataInicioVigencia', displayName: 'Início da Vigência', cellFilter: 'data', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'dataFinalVigencia', displayName: 'Término da Vigência', cellFilter: 'data', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cargaHoraria', displayName: 'CH', cellFilter: 'decimal', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } }            
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
                $scope.obterFrequenciaGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterFrequenciaGridDados();
            });

            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.acao.pessoa = ($scope.acao.pessoa != row.entity) ? row.entity : null;
                $scope.acao.descricao = null;
                $scope.obterAcoes();
            }.bind(this));
        }

        $scope.obterAnosReferencias = function () {
            $scope.loadAr = service.obterAnosReferenciasParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
                $scope.dados.anosReferencias = response.data;
            });

            $scope.dados.municipios = [];
            $scope.dados.filtro.municipioId = "";
            $scope.dados.unidadesEscolares = [];
            $scope.dados.filtro.unidadeEscolarId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterMesesReferencias = function () {
            $scope.loadMr = service.obtemMeses().then(function (response) {
                $scope.dados.mesesReferencias = response.data;
            });

            $scope.dados.municipios = [];
            $scope.dados.filtro.municipioId = "";
            $scope.dados.unidadesEscolares = [];
            $scope.dados.filtro.unidadeEscolarId = "";
            $scope.dados.programas = [];
            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterProgramas = function () {
            if ($scope.dados.filtro.anoReferencia != undefined && $scope.dados.filtro.anoReferencia != null && $scope.dados.filtro.anoReferencia > 0) {
                $scope.loadProg = service.obterProgramasParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
                    $scope.dados.programas = response.data;
                });
            }
            else $scope.dados.programas = [];

            $scope.dados.filtro.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if ($scope.dados.filtro.programaId != undefined && $scope.dados.filtro.programaId != null && $scope.dados.filtro.programaId > 0) {
                $scope.loadPcr = service.obterProgramasCargosParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
                    $scope.dados.programasCargos = response.data;
                });
            }
            else $scope.dados.programasCargos = [];

            $scope.dados.filtro.programaCargoId = "";
        }

        $scope.obterMunicipios = function () {
            if ($scope.dados.filtro.anoReferencia != undefined && $scope.dados.filtro.anoReferencia != null && $scope.dados.filtro.anoReferencia > 0) {
                $scope.loadMun = service.obterMunicipiosParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
                    $scope.dados.municipios = response.data;
                });
            }
            else $scope.dados.municipios = [];

            $scope.dados.filtro.municipioId = "";
            $scope.dados.unidadesEscolares = [];
            $scope.dados.filtro.unidadeEscolarId = "";
        }

        $scope.obterUnidadesEscolares = function () {
            if ($scope.dados.filtro.municipioId != undefined && $scope.dados.filtro.municipioId != null && $scope.dados.filtro.municipioId > 0) {
                $scope.loadUe = service.obterUnidadesEscolaresParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
                    $scope.dados.unidadesEscolares = response.data;
                });
            }
            else $scope.dados.unidadesEscolares = [];

            $scope.dados.filtro.unidadeEscolarId = "";
        }

        $scope.obterFrequenciaGridDados = function () {
            $scope.loadTela = service.obterFrequenciaGridDadosParaPesquisarRelatorioFrequencia($scope.dados.filtro).then(function (response) {
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
                $scope.obterFrequenciaGridDados();
            }
        }

        $scope.pesquisaDetalhada = function () {
            $scope.dados.pesquisaDetalhada = !$scope.dados.pesquisaDetalhada;
        }

        $scope.imprimir = function (item) {
            $scope.carregando = service.imprimirFolhaFrequenciaDocente($scope.dados.filtro.mesReferencia, $scope.dados.filtro.anoReferencia, item.vinculoId).then(function (response) {
                globalSvc.savePDF(response.data, "folhaFrequencia.pdf");
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        };

        /// AÇÕES
        $scope.obterAcoes = function () {
            

            $scope.acoes = [];
            $scope.acoes.push({ permissao: "LANCARFREQUENCIA", descricao: "Lançar Frequência" });
            $scope.acoes.push({ permissao: "CONSULTAR", descricao: "Imprimir Frequência" });

            $scope.acoes = $filter('orderBy')($scope.acoes, ['descricao']);

        };

        $scope.executarAcao = function () {
                        
            switch ($scope.acao.descricao) {
                case 'LANCARFREQUENCIA':
                    $scope.$parent.redirecionarLancarFrequencia($scope.acao.pessoa);
                    break;
                case 'CONSULTAR':
                    $scope.imprimir($scope.acao.pessoa);
                    break;               
                default:
                    globalSvc.mensagemNegativo("Selecione uma ação!");
                    break;
            }
        };

        /// INICIALIZAR
        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                if ($scope.dados.filtro.anoReferencia == undefined || $scope.dados.filtro.anoReferencia == null) {
                    $scope.dados.anosReferencias = [];
                    $scope.dados.mesesReferencias = [];
                    $scope.dados.programas = [];
                    $scope.dados.programasCargos = [];
                    $scope.dados.municipios = [];
                    $scope.dados.unidadesEscolares = [];
                    $scope.obterAnosReferencias();
                }
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.init();
    }
]);