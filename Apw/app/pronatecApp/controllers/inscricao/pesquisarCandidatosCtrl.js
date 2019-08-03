inscricaoMdl.controller('pesquisarCandidatosCtrl', ['$scope', 'inscricaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarCandidatos;

        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.detalhes(row.entity)"><i title="Detalhes" class="icon-list bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeCompleto', displayName: 'Candidato', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'inscricao', displayName: 'Inscrição', cellFilter: 'data', width: 250, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'tipoInscricaoCandidato', displayName: 'Tipo', cellFilter: 'tipoInscricaoCandidato', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'situacaoInscricaoCandidato', displayName: 'Situação', cellFilter: 'situacaoInscricaoCandidato', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterIncricoesCandidadosGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterIncricoesCandidadosGridDados();
            });
        }

        $scope.obterInscricoes = function () {
            $scope.loadIns = service.obterInscricoesParaPesquisarCandidatos().then(function (response) {
                $scope.dados.inscricoes = response.data;
            });

            $scope.dados.filtro.inscricaoId = "";
            $scope.dados.tiposInscricoesCandidatos = [];
            $scope.dados.filtro.tipoInscricaoCandidato = "";
            $scope.dados.situacoesInscricoesCandidatos = [];
            $scope.dados.filtro.situacaoInscricaoCandidato = "";
        }

        $scope.obterTiposInscricoesCandidatos = function () {
            if ($scope.dados.filtro.inscricaoId != undefined && $scope.dados.filtro.inscricaoId != null && $scope.dados.filtro.inscricaoId > 0) {
                $scope.loadTic = service.obterTiposInscricoesCandidatosParaPesquisarCandidatos($scope.dados.filtro.inscricaoId).then(function (response) {
                    $scope.dados.tiposInscricoesCandidatos = response.data;
                });
            }
            else $scope.dados.tiposInscricoesCandidatos = [];

            $scope.dados.filtro.tipoInscricaoCandidato = "";
            $scope.dados.situacoesInscricoesCandidatos = [];
            $scope.dados.filtro.situacaoInscricaoCandidato = "";
        }

        $scope.obterSituacoesInscricoesCandidatos = function () {
            if ($scope.dados.filtro.tipoInscricaoCandidato != undefined && $scope.dados.filtro.tipoInscricaoCandidato != null && $scope.dados.filtro.tipoInscricaoCandidato > 0) {
                $scope.loadSic = service.obterSituacoesInscricoesCandidatosParaPesquisarCandidatos($scope.dados.filtro.inscricaoId, $scope.dados.filtro.tipoInscricaoCandidato).then(function (response) {
                    $scope.dados.situacoesInscricoesCandidatos = response.data;
                });
            }
            else $scope.dados.situacoesInscricoesCandidatos = [];

            $scope.dados.filtro.situacaoInscricaoCandidato = "";
        }

        $scope.obterIncricoesCandidadosGridDados = function () {
            $scope.loadTela = service.obterInscricoesCandidatosGridDadosParaPesquisarCandidatos($scope.dados.filtro).then(function (response) {
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
            $scope.obterIncricoesCandidadosGridDados();
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

        $scope.detalhes = function (item) {
            $scope.$parent.manterEstadoPesquisarCandidatos($scope.dados);
            $scope.$parent.estadoPesquisarCandidatos.inscricaoCandidatoId = item.inscricaoCandidatoId;
            $scope.redirecionarDetalhesInscricaoCandidato();
        };

        function init() {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterInscricoes();
            }
            else $scope.redirecionarPesquisar();
        }

        init();
    }
]);