pessoaMdl.controller('pesquisarAprovarCtrl', ['$scope', 'pessoaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.obterMunicipios = function () {
            $scope.loadMunicipios = service.obterMunicipios().then(response => {
                $scope.dados.lista.municipios = response.data;
            });
        };

        $scope.obterUnidadesEscolares = function () {
            $scope.dados.lista.unidadesEscolares = [];
            $scope.dados.filtro.unidadeEscolarId = null;

            if ($scope.dados.filtro.municipioId > 0) {
                $scope.loadUnidadeEscolares = service.obterUnidadesEscolares($scope.dados.filtro.municipioId).then(response => {
                    $scope.dados.lista.unidadesEscolares = response.data;
                });
            }
        };

        $scope.obterSituacoesAprovacao = function () {
            $scope.loadSituacoesAprovacao = service.obterSituacoesAprovacao().then(response => {
                $scope.dados.lista.situacoesAprovacao = response.data;

                $scope.dados.lista.situacoesAprovacao.push({ situacaoAprovacaoId: -1, descricao: 'Não entrou no sistema' });
            });
        };

        $scope.dados.grid.columnDefs = [
            { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'nomeCompleto', displayName: 'Nome', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'email', displayName: 'Email', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'situacaoAprovacao', displayName: 'Situação', cellFilter: 'labelSituacaoAprovacao', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: '<a class="green" href="" ng-click="grid.appScope.aprovar(row.entity)"><i title="Aprovar" class="icon-list  bigger-130"></i></a>', enableSorting: false, disableHiding: true }
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
                $scope.obterPessoaGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterPessoaGridDados();
            });
        }

        $scope.obterPessoaGridDados = function () {
            $scope.loadGridDados = service.obterPessoasGridDados($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
            });
        };

        $scope.aprovar = function (item) {
            if (item.pessoaAprovacaoId > 0) {
                $scope.$parent.manterEstadoPesquisar($scope.dados);
                $scope.$parent.pessoaAprovacaoId = item.pessoaAprovacaoId;
                $scope.redirecionarAprovar();
            }
            else {
                globalSvc.mensagemNegativo("Não é possível analisar esta pessoa!");
            }
        };

        function init() {
            if ($scope.dados.lista.municipios.length == 0) {
                $scope.obterMunicipios();
                $scope.obterSituacoesAprovacao();
                $scope.obterPessoaGridDados();
            }
        }

        init();
    }
]);