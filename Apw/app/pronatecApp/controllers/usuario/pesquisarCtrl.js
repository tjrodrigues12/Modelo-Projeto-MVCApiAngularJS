﻿usuarioMdl.controller('pesquisarCtrl', ['$scope', 'usuarioSvc', 'globalSvc', 'uiGridConstants', '$filter',
    function ($scope, service, globalSvc, uiGridConstants, $filter) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        $scope.listaSimNao = [
            { valor: true, descricao: 'Sim' },
            { valor: false, descricao: 'Não' }
        ];

        $scope.obterPerfis = function () {
            $scope.loadPerfil = service.obterPerfis().then(function (response) {
                $scope.perfis = response.data;
            });
        };
        
        $scope.template = '<div class="action-buttons">' +
				            '<a class="green" href="" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="green" href="" data-target="#mdlAlterarEmail" role="button" data-toggle="modal" ng-click="grid.appScope.alterarEmail(row.entity)"><i title="Alterar E-mail" class="icon-envelope bigger-130"></i></a>' +
                            '<a class="red" href="" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeCompleto', displayName: 'Nome', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'email', displayName: 'E-mail', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
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
                $scope.obterUsuariosGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterUsuariosGridDados();
            });
        }

        $scope.obterUsuariosGridDados = function () {
            $scope.loadTela = service.obterUsuariosGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
                $scope.dados.grid.totalItems = response.data.numeroRegistros;
                $scope.dados.grid.data = response.data.lista;
                if ($scope.dados.grid.data != undefined && $scope.dados.grid.data != null) {
                    if ($scope.dados.grid.data.length == 0) {
                        globalSvc.mensagemNegativo("Nenhum registro encontrado!");
                    }
                }
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.usuarioId = item.usuarioId;
            $scope.$parent.manterEstadoPesquisar($scope.dados);
            $scope.redirecionarEditar();
        };        

        $scope.excluir = function (item) {
            $scope.$parent.usuarioId = item.usuarioId;
        }

        $scope.confirmarExcluir = function (bool) {
            $scope.loadTela = service.excluir($scope.$parent.usuarioId).then(function (response) {
                if (response.data)
                    $scope.obterUsuariosGridDados();
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        $scope.alterarEmail = function (item) {
            $scope.$parent.usuarioId = item.usuarioId;

            $scope.formEmail = {
                usuarioId: item.usuarioId,
                nomeCompleto: item.nomeCompleto,
                email: item.email,
                reenviarEmail: false,
            }            
        }

        $scope.confirmarAlterarEmail = function () {
            $scope.loadAlterarEmail = service.alterarEmail($scope.formEmail).then(function (response) {
                if (response.data) {
                    globalSvc.mensagemPositivo("Registro alterado com sucesso!");                    
                    $scope.obterUsuariosGridDados();
                }
            });
        }

        $scope.init = function () {
            if ($scope.dados != undefined && $scope.dados != null) {
                $scope.obterPerfis();
                $scope.obterUsuariosGridDados();
            }
            else $scope.redirecionarPesquisar();
        }

        $scope.init();
    }
]);