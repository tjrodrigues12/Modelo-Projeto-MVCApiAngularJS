simularAcessoMdl.controller('pesquisarCtrl', ['$scope', 'simularAcessoSvc', 'globalSvc', 
    function($scope, service, globalSvc){

        $scope.dados = $scope.$parent.estadoPesquisar;

        //#region Grid Definição

        $scope.template = '<div class="action-buttons">' +                            
                            '<a class="green" href="" ng-click="grid.appScope.simularAcesso(row.entity)"><i title="Simular Acesso" class="fa fa-check bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'municipio', displayName: 'Município', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'unidadeEscolar', displayName: 'Unidade Escolar', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'nomeCompleto', displayName: 'Nome Completo', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'login', displayName: 'Login', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'dominio', displayName: 'Domínio', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'email', displayName: 'E-mail', cellFilter: 'label', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterGridDados();
            });
        }

        //#endregion

        //#region Obter Dados

        $scope.obterGridDados = function () {
            $scope.loadDados = service.obterAcessos($scope.dados.filtro).then(response => {
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

        //#region Eventos

        $scope.pesquisar = function () {
            $scope.obterGridDados();
        }

        $scope.simularAcesso = function (item) {
            var dadosSimular = {
                gsiUsuarioId: item.gsiUsuarioId
            };

            $scope.loadAcesso = service.simularAcesso(dadosSimular).then(response => {
                if (response.data) {
                    document.location.reload()
                }
            });
        }

        //#endregion

        function init() {
            if ($scope.dados == undefined || $scope.dados == null) { $scope.redirecionarPesquisar(); }

            $scope.filtro = [
                { filtroId: '1', descricao: 'Login' },
                { filtroId: '2', descricao: 'Nome' },
                { filtroId: '3', descricao: 'Email' },
                { filtroId: '4', descricao: 'Município' },
                { filtroId: '5', descricao: 'Unidade Escolar' },
                { filtroId: '6', descricao: 'CPF' }
            ];
        }

        init();

    }
]);