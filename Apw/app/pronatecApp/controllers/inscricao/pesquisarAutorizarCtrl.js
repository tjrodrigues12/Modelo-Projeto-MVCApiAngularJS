inscricaoMdl.controller('pesquisarAutorizarCtrl', ['$scope', 'inscricaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisarAutorizar;

        $scope.dados.grid.columnDefs = [
           { field: 'dataSolicitacao', displayName: 'Data da Solicitação', cellFilter: 'data', width: '15%', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'nomeCompleto', displayName: 'Candidato', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'inscricao', displayName: 'Incrição', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'usuarioSolicitacao', displayName: 'Solicitante', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'motivoInscricao', displayName: 'Motivo', width: 300, disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
           { field: 'situacaoSolicitacao', displayName: 'Situação', cellFilter: 'situacaoInscricaoCandidato', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } }
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
                $scope.obterAutorizacoesGridDados();
            });
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.obterAcoes();
            });
            $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                $scope.obterAcoes();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterAutorizacoesGridDados();
            });
        }

        $scope.obterInscricoes = function () {
            $scope.loadIns = service.obterInscricoesParaPesquisarAutorizar().then(function (response) {
                $scope.inscricoes = response.data;
            });

            $scope.dados.filtro.inscricaoId = "";
        }

        $scope.obterAutorizacoesGridDados = function () {
            $scope.loadTela = service.obterAutorizacoesGridDadosParaPesquisarAutorizar($scope.dados.filtro).then(function (response) {
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
            if (validarPesquisar()) {
                $scope.obterAutorizacoesGridDados();
            }
        }

        function validarPesquisar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        $scope.acao = {
            inscricoesCandidatos: []
        };

        $scope.obterAcoes = function () {

            $scope.acao.inscricoesCandidatos = [];

            var selecionados = $scope.gridApi.selection.getSelectedRows();

            if (selecionados != undefined && selecionados != null && selecionados.length > 0) $scope.acao.inscricoesCandidatos = selecionados;
        }

        $scope.limparGridSelecao = function () {
            if ($scope.gridApi != undefined && $scope.gridApi != null && $scope.gridApi.selection != undefined && $scope.gridApi.selection != null) {
                $scope.gridApi.selection.clearSelectedRows();
            }
            $scope.acao.inscricoesCandidatos = [];
        }

        $scope.redirecionarAutorizar = function () {
            $scope.$parent.estadoPesquisarAutorizar.inscricoesCandidatos = $scope.acao.inscricoesCandidatos;
            $scope.$parent.redirecionarAutorizar();
        }

        function init() {
            $scope.obterInscricoes();
            $scope.limparGridSelecao();
        };

        init();
    }
]);