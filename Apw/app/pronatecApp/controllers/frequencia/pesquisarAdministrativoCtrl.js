frequenciaMdl.controller('pesquisarAdministrativoCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

     $scope.dados = $scope.$parent.estadoPesquisar;

        //#region Grid Definição upload($file)

        $scope.template = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">' +
                            '<a class="blue" href="" ng-if="row.entity.movimentacao && !row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.gerarFolha(row.entity)"><i title="Gerar Folha de Frequência" class="icon-calendar bigger-130"></i></a>' +
				            '<a class="green" href="" ng-if="row.entity.movimentacao && row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.editar(row.entity)"><i title="Editar" class="icon-pencil bigger-130"></i></a>' +
                            '<a class="blue" href="" ng-if="row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.imprimirFrequencia(row.entity)"><i title="Imprimir Folha de Frequência" class="icon-print bigger-130"></i></a>' +
                            '<a class="purple" href="" ng-if="row.entity.movimentacao && row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.folhaPonto(row.entity)"><i title="Registro de Presença" class="icon-flag bigger-130"></i></a>' +
                            '<a class="orange" href="" ng-if="row.entity.movimentacao && row.entity.arquivoId == 0 && row.entity.folhaFrequenciaId > 0" ngf-select="grid.appScope.upload($file, row.entity)" ng-model="arquivo" id="arquivo"><i title="Enviar Folha de Frequência Assinada" class="icon-cloud-upload bigger-130"></i></a>' +
                            '<a class="blue" href="" ng-if="row.entity.movimentacao && row.entity.arquivoId > 0 && row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.downloadFolhaAssinada(row.entity)"><i title="Download Folha de Frequência Assinada" class="icon-cloud-download bigger-130"></i></a>' +
                            '<a class="red" href="" ng-if="row.entity.movimentacao && row.entity.folhaFrequenciaId > 0" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeCompleto', displayName: 'Nome Completo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'descricaoCargo', displayName: 'Vinculo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'descricaoPrograma', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'folhaFrequenciaId', displayName: 'Frequência', cellFilter: 'verificaFrequencia', disableHiding: true },
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
                $scope.obterFolhaFrequenciaAdministrativoGridDados();
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.dados.filtro.pagina = newPage;
                $scope.dados.filtro.tamanhoPagina = pageSize;
                $scope.obterFolhaFrequenciaAdministrativoGridDados();
            });
        }

        //#endregion

        //#region Obter Dados
        $scope.obterAnoReferencia = function () {
            $scope.loadAno = service.obterAnoReferenciaParaPesquisar().then(function (response) {
                $scope.dados.anosReferencias = response.data;
            });
        }

        $scope.obterMes = function () {
            if ($scope.dados.filtro.anoReferencia > 0) {
                $scope.loadMes = service.obterMesParaPesquisar($scope.dados.filtro.anoReferencia).then(function (response) {
                    $scope.dados.mesRefencia = response.data;
                });
            }
            else {
                $scope.dados.filtro.mesId = undefined
                $scope.dados.mesRefencia = undefined;
                $scope.dados.grid.data = null;
                $scope.dados.grid.totalItems = 0;
            }
        }

        $scope.obterFolhaFrequenciaAdministrativoGridDados = function () {
            $scope.loadPesquisar = service.obterFolhaFrequenciaGridDadosParaPesquisar($scope.dados.filtro).then(function (response) {
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

        //#region Metodos

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            return $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        //#endregion

        //#region Eventos
        $scope.pesquisar = function () {
            $scope.obterFolhaFrequenciaAdministrativoGridDados();
        }

        $scope.gerarFolha = function (item) {
            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                $scope.$parent.dadosPessoa = {
                    nomeCompleto: item.nomeCompleto, cpf: item.cpf, descricaoCargo: item.descricaoCargo, vinculoId: item.vinculoId, pessoaId: item.pessoaId,
                    mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia
                };
                $scope.redirecionarGerarFolhaFrequenciaAdministrativo();
            } else
            {
                globalSvc.mensagemAviso("É necessário selecionar o Ano e Mês de referência para gerar a folha de frequência!");
            }            
        }

        $scope.excluir = function (item) {
            $scope.folhaFrequenciaId = item.folhaFrequenciaId;
        }

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirFolhaFrequencia($scope.folhaFrequenciaId).then(function (response) {
                if (response.data) { $scope.obterFolhaFrequenciaAdministrativoGridDados(); }
            });
        }

        $scope.editar = function (item) {
            $scope.$parent.dadosPessoa = {
                nomeCompleto: item.nomeCompleto, cpf: item.cpf, descricaoCargo: item.descricaoCargo, vinculoId: item.vinculoId, folhaFrequenciaId: item.folhaFrequenciaId,
                mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia, arquivoId: item.arquivoId, extensao: item.extensao
            };

            $scope.redirecionarEditarFolhaFrequenciaAdministrativo();
        }

        $scope.pesquisaDetalhada = function () {
            if ($scope.dados.pesquisaDetalhada == undefined || $scope.dados.pesquisaDetalhada == null) { $scope.dados.pesquisaDetalhada = true; }
            else { $scope.dados.pesquisaDetalhada = !$scope.dados.pesquisaDetalhada; }            
        }

        $scope.imprimirFrequencia = function (item) {
            $scope.loadRelatorio = service.imprimirFolhaFrequenciaAdministrativo(item.folhaFrequenciaId).then(function (response) {
                globalSvc.saveData(response.data, "Folha De Frequência " + item.nomeCompleto + ' ' + $scope.dados.filtro.mesId + '-' + $scope.dados.filtro.anoReferencia + '.pdf');
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.folhaPonto = function (item) {
            $scope.$parent.dadosPessoa = {
                nomeCompleto: item.nomeCompleto, cpf: item.cpf, descricaoCargo: item.descricaoCargo, vinculoId: item.vinculoId, folhaFrequenciaId: item.folhaFrequenciaId,
                mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia
            };

            $scope.redirecionarFolhaPonto();
        }

        $scope.upload = function (file, item) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.uploadArquivo = {
                        folhaFrequenciaId: item.folhaFrequenciaId
                    };

                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/FolhaFrequenciaAdministrativo/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        $scope.uploadArquivo.arquivoUpload = response.data;
                        $scope.uploadArquivo.extensaoArquivo = extensaoArquivo;
                        
                        $scope.loadSalvarArquivo = service.salvarArquivo($scope.uploadArquivo).then(function (response) {
                            if (response.data != null && response.data != undefined) {
                                item.arquivoId = response.data.arquivoId;
                                item.extensao = response.data.extensaoArquivo;
                            }
                        });

                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                $scope.uploadArquivo = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" ") + " são aceitos");
            }
        };

        $scope.downloadFolhaAssinada = function (item) {
            $scope.loadDownloadFolhaAssinada = service.downloadFolhaAssinada(item.arquivoId).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + item.arquivoId + '' + item.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        //#endregion

        $scope.init = function(){
            if ($scope.dados == undefined || $scope.dados == null) { redirecionarPesquisarAdministrativo(); }

            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                $scope.obterFolhaFrequenciaAdministrativoGridDados();
            }
            else {
                $scope.obterAnoReferencia();
            }

            $scope.extensoesPermitidas = [".pdf", ".jpg"];
        }

        $scope.init();


}]);