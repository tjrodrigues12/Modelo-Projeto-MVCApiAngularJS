frequenciaMdl.controller('pesquisarCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService', 'Upload',
function ($scope, service, globalSvc, uiGridConstants, $filter, validationService, Upload) {

        $scope.dados = $scope.$parent.estadoPesquisar;

        //#region Grid Definição

        $scope.template = '<div class="action-buttons">' +                            
                            '<a class="orange" href="" ng-if="row.entity.movimentacao && row.entity.arquivoId == 0 && row.entity.folhaFrequenciaId > 0" ngf-select="grid.appScope.upload($file, row.entity)" ng-model="arquivo" id="arquivo"><i title="Enviar Folha de Frequência Assinada" class="icon-cloud-upload bigger-130"></i></a>' +
                            '<a class="blue" href="" ng-if="row.entity.arquivoId > 0 && row.entity.folhaFrequenciaId > 0" ng-click="grid.appScope.downloadFolhaAssinada(row.entity)"><i title="Download Folha de Frequência Assinada" class="icon-cloud-download bigger-130"></i></a>' +
                            '<a class="red" href="" ng-if="row.entity.movimentacao && row.entity.folhaFrequenciaId > 0" data-target="#mdlExcluir" role="button" data-toggle="modal" ng-click="grid.appScope.excluir(row.entity)"><i title="Excluir Folha de Frequência" class="icon-trash bigger-130"></i></a></div>'

        $scope.dados.grid.columnDefs = [
            { field: 'nomeProfissional', displayName: 'Nome Completo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'cpf', displayName: 'CPF', cellFilter: 'cpf', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programaCargo', displayName: 'Vinculo', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'programa', displayName: 'Programa', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'turnoDescricao', displayName: 'Turno', disableHiding: true, cellTooltip: function (row, col) { return row.entity[col.field] } },
            { field: 'folhaFrequenciaId', displayName: 'Frequência', cellFilter: 'verificaFrequencia', disableHiding: true },
            { name: 'templateAcoes', displayName: '', width: 60,cellTemplate: $scope.template, enableSorting: false, disableHiding: true }
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

        //#endregion

        //#region Obter Dados
        $scope.obterAnoReferencia = function () {
            $scope.loadAno = service.obterAnoReferenciaParaPesquisar().then(function (response) {
                $scope.dados.anosReferencias = response.data;
            });
        }

        $scope.obterMes = function () {
            $scope.dados.filtro.mesId = null
            $scope.dados.mesRefencia = null;
            $scope.dados.grid.data = null;

            if ($scope.dados.filtro.anoReferencia > 0) {
                $scope.loadMes = service.obterMesParaPesquisar($scope.dados.filtro.anoReferencia).then(function (response) {
                    $scope.dados.mesRefencia = response.data;
                });
            }
        }

        $scope.obterFrequenciaGridDados = function () {
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

        $scope.gerarFolhaAdministrativo = function (item) {
            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                if (item.movimentacao) {
                    $scope.$parent.dadosPessoa = {
                        nomeCompleto: item.nomeProfissional, cpf: item.cpf, descricaoCargo: item.programaCargo, vinculoId: item.vinculoId, pessoaId: item.pessoaId,
                        mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia
                    };
                    $scope.redirecionarGerarFolhaFrequenciaAdministrativo();
                }
                else {
                    globalSvc.mensagemAviso("Somente é possível gerar a folha de frequência para o mês atual!");
                }
            } else
            {
                globalSvc.mensagemAviso("É necessário selecionar o Ano e Mês de referência para gerar a folha de frequência!");
            }            
        }

        $scope.excluir = function (item) {
            $scope.folhaFrequenciaId = item.folhaFrequenciaId;
        }

        $scope.confirmarExcluir = function () {
            if ($scope.folhaFrequenciaId > 0) {
                $scope.loadExcluir = service.excluirFolhaFrequencia($scope.folhaFrequenciaId).then(function (response) {
                    if (response.data) { $scope.obterFrequenciaGridDados(); }
                });
            }
            else {

            }
        }

        $scope.editarAdministrativo = function (item) {
            if (item.movimentacao) {
                $scope.$parent.dadosPessoa = {
                    nomeCompleto: item.nomeProfissional, cpf: item.cpf, descricaoCargo: item.programaCargo, vinculoId: item.vinculoId, folhaFrequenciaId: item.folhaFrequenciaId,
                    mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia, arquivoId: item.arquivoId, extensao: item.extensao
                };

                $scope.redirecionarEditarFolhaFrequenciaAdministrativo();
            }
            else {
                globalSvc.mensagemAviso("Somente é possível gerar a folha de frequência para o mês atual!");
            }
        }

        $scope.pesquisaDetalhada = function () {
            if ($scope.dados.pesquisaDetalhada == undefined || $scope.dados.pesquisaDetalhada == null) { $scope.dados.pesquisaDetalhada = true; }
            else { $scope.dados.pesquisaDetalhada = !$scope.dados.pesquisaDetalhada; }            
        }

        $scope.imprimirFrequenciaAdministrativo = function (item) {
            $scope.loadRelatorio = service.imprimirFolhaFrequenciaAdministrativo(item.folhaFrequenciaId).then(function (response) {
                globalSvc.saveData(response.data, "Folha De Frequência " + item.nomeProfissional + ' ' + $scope.dados.filtro.mesId + '-' + $scope.dados.filtro.anoReferencia + '.pdf');
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.registroOcorrenciaAdministrativo = function (item) {
            if (item.movimentacao) {
                $scope.$parent.dadosPessoa = {
                    nomeCompleto: item.nomeProfissional, cpf: item.cpf, descricaoCargo: item.programaCargo, vinculoId: item.vinculoId, folhaFrequenciaId: item.folhaFrequenciaId,
                    mesId: $scope.dados.filtro.mesId, anoReferencia: $scope.dados.filtro.anoReferencia
                };

                $scope.redirecionarRegistroOcorrenciaAdministrativo();
            }
            else {
                globalSvc.mensagemAviso("Somente é possível alterar as ocorrências do profissional no mês atual!");
            }
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
                        url: '/api/Pronatec/Frequencia/UploadArquivo',
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

        $scope.imprimirDocente = function (pessoa) {

            $scope.$parent.estadoDados.pessoaSelecionada = pessoa;

            $scope.$parent.redirecionarImprimirFolhaDocente();

            //$scope.carregando = service.imprimirFolhaFrequenciaDocente($scope.dados.filtro.mesId, $scope.dados.filtro.anoReferencia, item.vinculoId).then(function (response) {
            //    globalSvc.savePDF(response.data, "folhaFrequencia.pdf");
            //}, function (response) {
            //    globalSvc.tratarErroResponse(response);
            //});
        };

        //#endregion

        //#region Ações
        $scope.obterAcoes = function () {
            $scope.acoes = [];
            $scope.acoes.push({ permissao: "GERARFREQUENCIA", descricao: "Gerar Folha de Frequência" });
            $scope.acoes.push({ permissao: "IMPRIMIR", descricao: "Imprimir Folha de Frequência" });
            $scope.acoes.push({ permissao: "EDITAR", descricao: "Editar" });
            $scope.acoes.push({ permissao: "OCORRENCIA", descricao: "Registro de Ocorrência" });
            //$scope.acoes.push({ permissao: "EXCLUIR", descricao: "Excluir" });
            //$scope.acoes.push({ permissao: "UPLOAD", descricao: "Enviar Folha Assinada" });
            $scope.acoes.push({ permissao: "DOWNLOAD", descricao: "Download Folha de Frequência Assinada" });

            $scope.acoes = $filter('orderBy')($scope.acoes, ['descricao']);

        };

        $scope.executarAcao = function () {
            globalSvc.limparMensagens();

            switch ($scope.acao.descricao) {
                case 'GERARFREQUENCIA':
                    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                        globalSvc.mensagemNegativo('Folha de Frequência selecionada já foi gerada')
                    }
                    else {
                        if ($scope.acao.pessoa.administrativo) { $scope.gerarFolhaAdministrativo($scope.acao.pessoa); }
                        else {
                            $scope.gerarFolhaDocente();
                            //$scope.$parent.redirecionarLancarFrequencia($scope.acao.pessoa);
                        }
                    }
                    break;
                case 'IMPRIMIR':
                    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                        if ($scope.acao.pessoa.administrativo) { $scope.imprimirFrequenciaAdministrativo($scope.acao.pessoa); }
                        else { $scope.imprimirDocente($scope.acao.pessoa); }
                    }
                    else {
                        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!')
                    }                    
                    break;
                case 'EDITAR':
                    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                        if ($scope.acao.pessoa.administrativo) { $scope.editarAdministrativo($scope.acao.pessoa); }
                        else { globalSvc.mensagemAviso('Erro'); }
                    }
                    else {
                        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!')
                    }
                    break;
                case 'OCORRENCIA':
                    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                        if ($scope.acao.pessoa.administrativo) { $scope.registroOcorrenciaAdministrativo($scope.acao.pessoa); }
                        else {
                            $scope.redirecionarRegistroOcorrenciaDocente($scope.acao.pessoa);
                            //globalSvc.mensagemAviso('Erro');
                        }
                    }
                    else {
                        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!')
                    }
                    break;
                //case 'EXCLUIR':
                //    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                //        if ($scope.acao.pessoa.administrativo) { }
                //        else { }
                //    }
                //    else {
                //        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!')
                //    }
                //    break;
                //case 'UPLOAD':
                //    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                //        if ($scope.acao.pessoa.administrativo) { }
                //        else { }
                //    }
                //    else {
                //        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!')
                //    }
                //    break;
                case 'DOWNLOAD':
                    if ($scope.acao.pessoa.folhaFrequenciaId > 0) {
                        if ($scope.acao.pessoa.arquivoId > 0) {
                            if ($scope.acao.pessoa.administrativo) { $scope.downloadFolhaAssinada($scope.acao.pessoa); }
                            else { $scope.downloadFolhaAssinada($scope.acao.pessoa); }
                        }
                        else {
                            globalSvc.mensagemNegativo('Nenhum arquivo anexado a folha de frequência!');
                        }
                    }
                    else {
                        globalSvc.mensagemNegativo('Folha de Frequência ainda não foi gerada!');
                    }
                    break;
                default:
                    globalSvc.mensagemNegativo("Selecione uma ação!");
                    break;
            }
            
        };
        //#endregion

        $scope.gerarFolhaDocente = function () {
            
            var parametro = {
                anoReferencia: $scope.dados.filtro.anoReferencia,
                mesReferencia: $scope.dados.filtro.mesId,
                vinculoId: $scope.acao.pessoa.vinculoId,
                unidadeEscolarId: $scope.acao.pessoa.unidadeEscolarId,
                turnoId: $scope.acao.pessoa.turnoId
            };

            $scope.loadGerarFolhaDocente = service.gerarFolhaFrequenciaDocente(parametro).then(function (response) {                
                if (response.data == true) {
                    globalSvc.mensagemPositivo('Folha gerada com sucesso!');
                    $scope.obterFrequenciaGridDados();
                }
            });

        }

        $scope.init = function(){
            if ($scope.dados == undefined || $scope.dados == null) { redirecionarPesquisar(); }

            if ($scope.dados.filtro.anoReferencia > 0 && $scope.dados.filtro.mesId > 0) {
                $scope.obterFrequenciaGridDados();
            }
            else {
                $scope.obterAnoReferencia();
            }

            $scope.acao = {};
            $scope.extensoesPermitidas = [".pdf", ".jpg"];
        }

        $scope.init();
}]);