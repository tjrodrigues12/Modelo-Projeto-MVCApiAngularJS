atualizacaoCadastralMdl.controller('uploadDocumentosCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService', 'Upload',
    function ($scope, service, globalSvc, validationService, Upload) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaUploadDocumentos;

        $scope.obterPessoaDocumentos = function () {
            $scope.loadPessoaDocumentos = service.obterPessoaDocumentos($scope.dados.pessoaId).then(function (response) {
                $scope.dados.pessoasDocumentos = response.data;
            });
        }

        $scope.upload = function (file, pessoaDocumento) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/AtualizacaoCadastral/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        $scope.adicionar(pessoaDocumento, response.data, extensaoArquivo);
                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                $scope.arquivoUpload = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" "));
            }
        };

        $scope.adicionar = function (pessoaDocumento, arquivo, extensao) {
            var pessoaDocumentoForm = {
                pessoaId: $scope.dados.pessoaId,
                tipoDocumentoId: pessoaDocumento.tipoDocumentoId,
                pessoaFormacaoId: pessoaDocumento.pessoaFormacaoId,
                pessoaTrabalhoId: pessoaDocumento.pessoaTrabalhoId,
                pessoaProfissaoId: pessoaDocumento.pessoaProfissaoId,
                arquivoUpload: arquivo,
                extensaoArquivo: extensao
            }
            // salva o registro no banco e armazena o arquivo no repositório 
            $scope.loadAdicionar = service.adicionarDocumento(pessoaDocumentoForm).then(function (response) {
                // verifica se salvou para adicionar na lista
                if (response.data > 0) {
                    pessoaDocumento.pessoaDocumentoId = response.data;
                    extensao = extensao;
                    $scope.arquivoUpload = null;
                }
                else
                    globalSvc.mensagemNegativo("Não foi possível adicionar o documento!");
            });
        }

        $scope.baixarArquivoDocumento = function (pessoaDocumento) {
            $scope.loadDownload = service.obterArquivoDownload(pessoaDocumento.pessoaDocumentoId).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + pessoaDocumento.pessoaDocumentoId + '' + pessoaDocumento.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.excluir = function (item) {
            $scope.modalExcluir = !$scope.modalExcluir;
            if (item) {
                $scope.itemSelecionado = item
            }
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadExcluir = service.excluirDocumento($scope.itemSelecionado.pessoaDocumentoId).then(response => {
                if (response.data) {
                    $scope.itemSelecionado.pessoaDocumentoId = null;
                }
            }, response => {
                globalSvc.tratarErroResponse(response);
            });
        }

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            return $scope.filtro.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaUploadDocumentos = $scope.filtro;
            $scope.redirecionarVinculoTrabalho();
        };

        $scope.avancar = function () {
            var documentosObrigatorios = []
            $scope.dados.pessoasDocumentos.forEach(x => {
                if (x.obrigatorio && x.pessoaDocumentoId == null)
                    documentosObrigatorios.push(x.tipoDocumento);
            });

            if (documentosObrigatorios.length > 0) {
                globalSvc.mensagemAviso('Os seguintes documentos são obrigatórios: ' + documentosObrigatorios.join(", "));
            }


            else {
                $scope.$parent.dados = $scope.dados;
                $scope.$parent.filtro.abaUploadDocumentos = $scope.filtro;
                $scope.redirecionarTermoCompromisso();
            }
        };

        var init = function () {
            globalSvc.limparMensagens();
            if ($scope.dados) {
                $scope.obterPessoaDocumentos();
                $scope.arquivoUpload = null;
                $scope.filtro.extensoesPermitidas = [".pdf", ".jpg"];
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);