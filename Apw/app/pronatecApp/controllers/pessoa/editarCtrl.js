pessoaMdl.controller('editarCtrl', ['$scope', 'pessoaSvc', '$filter', 'globalSvc', 'ValidationService', 'Upload',
    function ($scope, service, $filter, globalSvc, validationService, Upload) {

        $scope.obterPessoa = function () {
            $scope.loadPessoa = service.obterPessoaParaEditar($scope.$parent.pessoaId).then(function (response) {
                $scope.dados = response.data;
                $scope.dados.dataNascimento = globalSvc.converterData($scope.dados.dataNascimento);
                $scope.obterMunicipios($scope.dados.municipioId);
                validarDocumentosObrigatorios();
            });
        }

        //#region Tabs

        $scope.tab = {
            currentTab: 0,
            tabs: [{ header: "Dados Pessoais" },
                { header: "Dados Residênciais" },
                { header: "Dados Bancários" },
                { header: "Dados Acadêmicos" },
                { header: "Dados Profissionais" },
                { header: "Upload de Documentos" }
            ]
        }

        $scope.selectTab = function (index) {
            $scope.tab.currentTab = index;
        };

        //#endregion

        //#region ABA Dados Pessoais

        $scope.sexos = [
            { valor: 'M' },
            { valor: 'F' }
        ];

        //#endregion

        //#region ABA Dados Residenciais

        $scope.obterUfs = function () {
            $scope.loadUf = service.obterUfsParaEditar().then(function (response) {
                $scope.ufs = response.data;
            });
        }

        $scope.obterMunicipios = function (municipioId) {
            if ($scope.dados.uf != undefined && $scope.dados.uf != null && $scope.dados.uf != "") {
                $scope.loadMunicipios = service.obterMunicipiosParaEditar($scope.dados.uf).then(function (response) {
                    $scope.municipios = response.data;
                });
            }
            else $scope.municipios = [];

            if (municipioId != undefined && municipioId != null && municipioId > 0) {
                $scope.dados.municipioId = municipioId;
            }
            else $scope.dados.municipioId = "";
        }

        $scope.consultarCep = function () {
            if ($scope.dados.cep) {
                $scope.loadCep = globalSvc.consultarCep($scope.dados.cep).then(function (response) {
                    if (response.data) {
                        var endereco = response.data;
                        $scope.dados.logradouro = endereco.logradouro;
                        $scope.dados.bairro = endereco.bairro;
                        $scope.dados.uf = endereco.uf;

                        $scope.loadMun = service.obterMunicipiosParaEditar($scope.dados.uf).then(function (response) {
                            if (response.data) {
                                $scope.municipios = response.data;
                                var municipio = response.data.filter(function (item) {
                                    return item.ibge == endereco.ibge;
                                });

                                if (municipio)
                                    $scope.dados.municipioId = municipio[0].municipioId;
                            }
                        });
                    }
                }, function (response) {
                    globalSvc.tratarErroResponse(response);
                });
            }
        };

        //#endregion

        //#region ABA Dados Bancarios

        $scope.obterTiposContas = function () {
            $scope.loadBancos = service.obterTiposContasParaEditar().then(function (response) {
                $scope.tiposContas = response.data;
            });
        }

        $scope.obterBancos = function () {
            $scope.loadBancos = service.obterBancosParaEditar().then(function (response) {
                $scope.bancos = response.data;
            });
        }

        //#endregion

        //#region ABA Dados Acadêmicos

        $scope.obterFormacoes = function () {
            $scope.loadFormacoes = service.obterFormacoesParaEditar().then(function (response) {
                $scope.formacoes = response.data;
            });
        }

        $scope.trocarFormacao = function () {
            if ($scope.drop.formacao.selected.formacaoId == 10 || $scope.drop.formacao.selected.formacaoId == 6) {
                $scope.mostrarDadosCurso = false;
            }
            else {
                $scope.mostrarDadosCurso = true;
            }
        }

        $scope.obterInstituicoesFormacoes = function (textoPesquisa) {
            if (textoPesquisa == undefined || textoPesquisa == null) textoPesquisa = "";
            $scope.loadInstituicoesFormacoes = service.obterInstituicoesFormacoesParaEditar(textoPesquisa).then(function (response) {
                $scope.instituicoesFormacoes = response.data;//$filter('filtroRemoverItemAdicionado')(response.data, $scope.instituicoesFormacoes, 'instituicaoFormacaoId');
            });
        }

        $scope.obterCursosFormacoes = function (textoPesquisa) {
            if (textoPesquisa == undefined || textoPesquisa == null) textoPesquisa = "";
            $scope.loadCursosFormacoes = service.obterCursosFormacoesParaEditar(textoPesquisa).then(function (response) {
                $scope.cursosFormacoes = response.data;//$filter('filtroRemoverItemAdicionado')(response.data, $scope.cursosFormacoes, 'cursoFormacaoId');
            });
        }

        $scope.adicionarFormacao = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.formDadosCurriculares)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.dados.pessoasFormacoes.push({
                    formacaoId: $scope.formacaoId,
                    formacao: $scope.drop.formacao.selected.formacao,
                    instituicaoFormacaoId: $scope.instituicaoFormacaoId,
                    instituicaoFormacao: $scope.mostrarDadosCurso ? $scope.drop.instituicaoFormacao.selected.instituicaoFormacao : '',
                    cursoFormacaoId: $scope.cursoFormacaoId,
                    cursoFormacao: $scope.mostrarDadosCurso ? $scope.drop.cursoFormacao.selected.cursoFormacao : '',
                    anoInicio: $scope.anoInicio,
                    anoTermino: $scope.anoTermino,
                    concluido: $scope.anoTermino > 0
                });

                validarDocumentosObrigatorios();

                new validationService().resetForm($scope.formDadosCurriculares);

                $scope.formacaoId = "";
                $scope.instituicaoFormacaoId = "";
                $scope.cursoFormacaoId = "";
                $scope.anoInicio = "";
                $scope.anoTermino = "";
            }
        }

        $scope.excluirFormacao = function (index) {
            $scope.dados.pessoasFormacoes.splice(index, 1);
            validarDocumentosObrigatorios();
        }

        //#endregion

        //#region ABA Dados Profissionais

        $scope.adicionarProfissao = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.formDadosProfissionais)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.dados.pessoasProfissoes.push({
                    profissao: $scope.profissao,
                    tempoExperiencia: $scope.tempoExperiencia
                });

                new validationService().resetForm($scope.formDadosProfissionais);

                $scope.profissao = null;
                $scope.tempoExperiencia = null;
            }
        }

        $scope.excluirProfissao = function (index) {
            $scope.dados.pessoasProfissoes.splice(index, 1);
        }

        //#endregion

        //#region ABA Upload de Documentos

        $scope.obterTiposDocumentos = function () {
            $scope.loadTiposDocumentos = service.obterTiposDocumentosParaEditar().then(function (response) {
                $scope.tiposDocumentos = response.data;
                validarDocumentosObrigatorios();
            });
        }

        $scope.upload = function (file) {
            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            $scope.permite = $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo })
            if ($scope.permite) {
                $scope.arquivoUpload.extensaoArquivo = extensaoArquivo;

                if (file) {
                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/Pessoa/UploadArquivo',
                        data: { file: file }
                    }).then(function (resp) {
                        $scope.arquivoUpload.arquivo = resp.data;
                    }, function (resp) {
                        globalSvc.tratarErroResponse(resp);
                    });
                }
            }
            else {
                $scope.permite = false;
                $scope.arquivoUpload = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" "));
            }
        };

        $scope.baixarArquivoDocumento = function (pessoaDocumentoId, extensaoArquivo) {
            $scope.loadDownload = service.obterArquivoDownload(pessoaDocumentoId, extensaoArquivo).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + extensaoArquivo);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.adicionarDocumento = function () {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formUploadArquivos) || $scope.arquivoUpload == null) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            } else {
                if ($scope.dados.pessoasDocumentos.some(item => { return item.tipoDocumentoId == $scope.tipoDocumentoId })) {
                    globalSvc.mensagemAviso('Já existe um documento com o tipo ' + $scope.drop.tipoDocumento.selected.documento + ' cadastrado');
                    new validationService().resetForm($scope.formUploadArquivos);
                    $scope.tipoDocumentoId = null;
                    $scope.arquivoUpload = null;
                } else {
                    var pessoaDocumentoForm = {
                        pessoaId: $scope.dados.pessoaId,
                        tipoDocumentoId: $scope.tipoDocumentoId,
                        arquivoUpload: $scope.arquivoUpload.arquivo,
                        extensaoArquivo: $scope.arquivoUpload.extensaoArquivo
                    }

                    // salva o registro no banco e armazena o arquivo no repositório 
                    $scope.loadAdicionarDocumento = service.adicionarPessoaDocumento(pessoaDocumentoForm).then(function (response) {
                        // verifica se salvou para adicionar na lista
                        if (response.data > 0) {
                            $scope.dados.pessoasDocumentos.push({
                                pessoaDocumentoId: response.data,
                                tipoDocumentoId: $scope.tipoDocumentoId,
                                tipoDocumento: $scope.drop.tipoDocumento.selected.documento,
                                extensaoArquivo: $scope.arquivoUpload.extensaoArquivo
                            });

                            // reseta o formulário e limpa os campos
                            new validationService().resetForm($scope.formUploadArquivos);
                            $scope.tipoDocumentoId = null;
                            $scope.arquivoUpload = null;
                        }
                        else
                            globalSvc.mensagemNegativo("Não foi possível adicionar o documento!");
                    });
                }
            }
        }

        $scope.excluirPessoaDocumento = function (index, pessoaDocumentoId) {
            // apaga o registro no banco e exclui o arquivo no repositório 
            $scope.loadExcluirDocumento = service.excluirPessoaDocumento(pessoaDocumentoId).then(function (response) {
                // verifica se excluiu para excluir na lista
                if (response.data) {
                    $scope.dados.pessoasDocumentos.splice(index, 1);
                } else {
                    globalSvc.mensagemNegativo("Não foi possível excluir o documento!");
                }
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        var validarDocumentosObrigatorios = function () {

            $scope.tiposObrigatorios = $scope.tiposDocumentos.filter((item) => { return item.obrigatorio });

            if ($scope.dados.pessoasFormacoes.some(x => { return x.formacaoId != 6 && x.formacaoId != 10 })) {
                $scope.tiposObrigatorios.push({ tipoDocumentoId: 6, documento: 'Histórico Escolar', obrigatorio: true },
                    { tipoDocumentoId: 7, documento: 'Diploma', obrigatorio: true });
            }
        }

        //#endregion

        $scope.salvar = function () {

            if ($scope.validar()) {

                $scope.loadSalvar = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) {
                        $scope.redirecionarPesquisar();
                    }
                });
            }
        }

        $scope.validar = function () {

            globalSvc.limparMensagens();

            var documentosObrigatorios = $scope.tiposObrigatorios.map(x => { return x.tipoDocumentoId });
            var documentosCadastradosObrigatorios = $scope.dados.pessoasDocumentos.filter(x => { return documentosObrigatorios.some(y => { return y == x.tipoDocumentoId }) }).map(x => { return x.tipoDocumentoId });

            if (!new validationService().checkFormValidity($scope.formDadosPessoais)) {
                $scope.tab.currentTab = 0;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            } else if (!new validationService().checkFormValidity($scope.formDadosResidenciais)) {
                $scope.tab.currentTab = 1;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            } else if (!new validationService().checkFormValidity($scope.formDadosBancarios)) {
                $scope.tab.currentTab = 2;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            } else if (documentosObrigatorios.length > documentosCadastradosObrigatorios.length) {
                $scope.tab.currentTab = 5;
                globalSvc.mensagemAviso('Os seguintes documentos são obrigatórios: ' + $scope.tiposObrigatorios.map(x => { return x.documento }).join(", "));
                return false;
            } else {
                return true;
            }
        }

        var init = function () {
            if ($scope.$parent.pessoaId) {
                $scope.drop = {};
                $scope.arquivoUpload = null;
                $scope.permite = true;
                $scope.extensoesPermitidas = [".pdf", ".jpg"]
                $scope.tiposObrigatorios = [];
                $scope.obterPessoa();
                $scope.obterUfs();
                $scope.obterTiposContas();
                $scope.obterBancos();
                $scope.obterFormacoes();
                $scope.obterTiposDocumentos();
                $scope.mostrarDadosCurso = true;
            }
            else {
                $scope.$parent.redirecionarPesquisar();
            }
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();
    }
]);