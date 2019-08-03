atualizacaoSalarialPerfilProfissionalMdl.controller('pesquisarHoleriteCtrl', ['$scope', 'atualizacaoSalarialPerfilProfissionalSvc', 'globalSvc', 'Upload', '$filter',
    function ($scope, service, globalSvc, Upload, $filter) {

        $scope.pessoaTrabalhoId = $scope.$parent.pessoaTrabalhoId;
        $scope.dadosHolerite = $scope.$parent.pesquisarHolerite;

        //#region Definição Grid

        $scope.template = '<div class="action-buttons">' +
           '<a class="red" href="" ng-if="row.entity.permiteModificacao" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>';

        $scope.dadosHolerite.grid.columnDefs = [
            { field: 'anoReferencia', displayName: 'Ano de Referência', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'mesId', displayName: 'Mês de Referência', cellFilter: 'meses', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cnpj', displayName: 'CNPJ', cellFilter: 'cnpj', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'razaoSocial', displayName: 'Nome da Empresa / Descrição', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'salarioFixoBruto', displayName: 'Salário Fixo (Bruto)', cellFilter: 'moeda', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'salarioVariavelBruto', displayName: 'Salário Variável (Bruto)', cellFilter: 'moeda', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'salarioBruto', displayName: 'Remuneração Bruta do Mês', cellFilter: 'moeda', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'observacao', displayName: 'Observações', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { name: 'templateAcoes', displayName: '', cellTemplate: $scope.template, enableSorting: false, disableHiding: true, width: '2%' }
        ];

        $scope.dadosHolerite.grid.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length === 0) {
                    $scope.dadosHolerite.filtro.orientacao = null;
                    $scope.dadosHolerite.filtro.ordenacao = null;
                } else {
                    $scope.dadosHolerite.filtro.orientacao = sortColumns[0].sort.direction;
                    $scope.dadosHolerite.filtro.ordenacao = sortColumns[0].name;
                }
                $scope.obterPessoaTrabalhoHoleriteGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dadosHolerite.filtro.pagina = newPage;
                $scope.dadosHolerite.filtro.tamanhoPagina = pageSize;
                $scope.obterPessoaTrabalhoHoleriteGridDados();
            });

            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.acao.pessoaTrabalho = ($scope.acao.pessoaTrabalho != row.entity) ? row.entity : null;
                $scope.acao.descricao = null;
                $scope.obterAcoes();
            }.bind(this));
        }

        //#endregion

        //#region Obter Dados
        $scope.obterAnoReferencia = function () {
            $scope.loadAnoRef = service.obterAnoReferencia($scope.pessoaTrabalhoId).then(function (response) {
                $scope.listaAnoRef.AnoRef = response.data;
            });
        }

        $scope.obterPessoaTrabalhoHoleriteGridDados = function () {
            if ($scope.dadosHolerite.filtro.anoReferencia > 0) {
                $scope.loadTela = service.obterPessoaTrabalhoHoleriteGridDadosService($scope.dadosHolerite.filtro).then(function (response) {
                    $scope.dadosHolerite.grid.data = response.data.lista;
                    $scope.dadosHolerite.grid.totalItems = response.data.numeroRegistros;
                    if ($scope.dadosHolerite.grid.data != undefined && $scope.dadosHolerite.grid.data != null) {
                        if ($scope.dadosHolerite.grid.data.length == undefined || $scope.dadosHolerite.grid.data.length == 0) {
                            $scope.obterAnoReferencia();
                        }
                    }
                });
            }
        }
        //#endregion

        //#region Eventos
        $scope.pesquisar = function () {
            $scope.obterPessoaTrabalhoHoleriteGridDados();
        }

        $scope.incluirHolerite = function () {
            $scope.$parent.pessoaTrabalhoId = $scope.pessoaTrabalhoId;
            $scope.$parent.listaAnoRef = $scope.listaAnoRef;

            $scope.redirecionarIncluirHolerite();
        }

        $scope.downloadArquivo = function (arquivoId, extensao) {
            globalSvc.limparMensagens();
            if (arquivoId > 0) {
                $scope.loadDownload = service.obterHoleriteDownload(arquivoId).then(function (response) {
                    globalSvc.saveData(response.data, "arquivo" + arquivoId + '' + extensao);
                }, function (response) {
                    globalSvc.tratarErroResponse(response);
                });
            }
            else {
                globalSvc.mensagemNegativo("Nenhum arquivo cadastrado para a ação selecionada!");
            }
           
        }

        $scope.editar = function (item) {
            globalSvc.limparMensagens();
            if (item.permiteModificacao) {
                $scope.$parent.pessoaTrabalhoHoleriteId = item.pessoaTrabalhoHoleriteId;
                $scope.$parent.listaAnoRef = $scope.listaAnoRef;
                $scope.redirecionarEditarHolerite();
            }
            else {
                globalSvc.mensagemNegativo("Somente é possível editar os comprovantes dos últimos dois meses a contar da data atual!");
            }
        }

        $scope.excluir = function (item) {
            $scope.pessoaTrabalhoHoleriteId = item.pessoaTrabalhoHoleriteId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadTelaExcluir = service.excluirHolerite($scope.pessoaTrabalhoHoleriteId).then(function (response) {
                if (response.data)
                    $scope.obterPessoaTrabalhoHoleriteGridDados();
            });
        }

        //#endregion

        //#region Ações
        $scope.obterAcoes = function () {

            $scope.acoes = [];
            $scope.acoes.push({ permissao: "EDITAR", descricao: "Editar" });
            //$scope.acoes.push({ permissao: "EXCLUIR", descricao: "Excluir" });
            $scope.acoes.push({ permissao: "DOWNLOADARQUIVO", descricao: "Download Arquivo" });
            $scope.acoes.push({ permissao: "DOWNLOADARQUIVOSECUNDARIO", descricao: "Download Arquivo Secundário" });

            $scope.acoes = $filter('orderBy')($scope.acoes, ['descricao']);

        };

        $scope.executarAcao = function () {

            switch ($scope.acao.descricao) {
                case 'DOWNLOADARQUIVO':
                    $scope.downloadArquivo($scope.acao.pessoaTrabalho.arquivoId, $scope.acao.pessoaTrabalho.extensao);
                    break;
                case 'DOWNLOADARQUIVOSECUNDARIO':
                    $scope.downloadArquivo($scope.acao.pessoaTrabalho.arquivoSecundarioId, $scope.acao.pessoaTrabalho.arquivoSecundarioExtensao);
                    break;
                case 'EDITAR':
                    $scope.editar($scope.acao.pessoaTrabalho);
                    break;
                //case 'EXCLUIR':
                //    $scope.excluir($scope.acao.pessoaTrabalho);
                //    break;
                default:
                    globalSvc.mensagemNegativo("Selecione uma ação!");
                    break;
            }
        };

        //#endregion

        $scope.init = function () {

            if ($scope.pessoaTrabalhoId == undefined || $scope.pessoaTrabalhoId == null) { $scope.redirecionarPesquisar(); }
            if ($scope.dadosHolerite == undefined || $scope.dadosHolerite == null) { $scope.redirecionarPesquisar(); }

            if ($scope.$parent.listaAnoRef == undefined || $scope.$parent.listaAnoRef == null) {
                $scope.listaAnoRef = {
                    filtro: {}
                }
            }
            else {
                $scope.listaAnoRef = $scope.$parent.listaAnoRef;
            }

            $scope.dadosHolerite.grid.data = null;
            $scope.acao = {};
            $scope.dadosHolerite.filtro.pessoaTrabalhoId = $scope.pessoaTrabalhoId;
            $scope.obterAnoReferencia();
            $scope.obterPessoaTrabalhoHoleriteGridDados();
        }

        $scope.init();

    }
]);