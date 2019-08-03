pessoaMdl.controller('aprovarCtrl', ['$scope','$filter', 'pessoaSvc', 'globalSvc', 'ValidationService',
    function ($scope, $filter, service, globalSvc, validationService) {

        $scope.listaAprovadoReprovado = [
            { value: true, label: 'Aprovado' },
            { value: false, label: 'Reprovado' }
        ];

        $scope.situacoesAprovacao = [
            { situacaoAprovacaoId: 3, descricao: 'Pendente' },
            { situacaoAprovacaoId: 4, descricao: 'Aprovado' }
        ];
        var obterDados = function () {
            $scope.loadDados = service.obterDadosParaAprovacao($scope.pessoaAprovacaoId).then(response => {
                $scope.dados = response.data;

                concatenarDeficiencias();
                concatenarTelefones();

            }, response => {
                globalSvc.tratarErroResponse(response);
            });
        };

        var concatenarDeficiencias = function () {
            $scope.dados.pessoa.deficiencias = [];
            if ($scope.dados.pessoa.deficienciaMotora) $scope.dados.pessoa.deficiencias.push('Deficiência Motora');
            if ($scope.dados.pessoa.deficienciaVisual) $scope.dados.pessoa.deficiencias.push('Deficiência Visual');
            if ($scope.dados.pessoa.deficienciaAuditiva) $scope.dados.pessoa.deficiencias.push('Deficiência Auditiva');
        };
        
        var concatenarTelefones = function () {
            $scope.dados.pessoa.telefones = [];
            if ($scope.dados.pessoa.telefoneResidencial) $scope.dados.pessoa.telefones.push($filter('telefone')($scope.dados.pessoa.telefoneResidencial));
            if ($scope.dados.pessoa.telefoneComercial) $scope.dados.pessoa.telefones.push($filter('telefone')($scope.dados.pessoa.telefoneComercial));
            if ($scope.dados.pessoa.telefoneCelular1) $scope.dados.pessoa.telefones.push($filter('telefone')($scope.dados.pessoa.telefoneCelular1));
            if ($scope.dados.pessoa.telefoneCelular2) $scope.dados.pessoa.telefones.push($filter('telefone')($scope.dados.pessoas.telefoneCelular2));
        };

        $scope.baixarArquivoDocumento = function (pessoaDocumento) {
            $scope.loadDownload = service.obterArquivoDownload(pessoaDocumento.pessoaDocumentoId).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + pessoaDocumento.pessoaDocumentoId + '' + pessoaDocumento.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.salvar = function () {
            if (new validationService().checkFormValidity($scope.formAprovar)) {

                var listaDocumentos = $scope.dados.pessoa.documentos
                    .filter(x => { return x.aprovado != null })
                    .map(function(elemento) {
                        return {
                            pessoaDocumentoId: elemento.pessoaDocumentoId,
                            aprovado: elemento.aprovado,
                            pessoaAprovacaoDocumentoId: elemento.pessoaAprovacaoDocumentoId
                        }
                    });

                var form = {
                    pessoaAprovacaoId: $scope.dados.pessoaAprovacaoId,
                    situacaoAprovacaoId: $scope.dados.situacaoAprovacaoId,
                    observacao: $scope.dados.observacao,
                    listaDocumentos: listaDocumentos
                }

                $scope.loadSalvarEditar = service.salvarEditarAprovacao(form).then(function (response) {
                    if(response.data)
                    {
                        globalSvc.mensagemPositivo('Registro alterado com sucesso!');
                        $scope.redirecionarPesquisarAprovar();
                    }
                }, function (response) {
                    globalSvc.tratarErroResponse(response);
                });
            }
            else
                globalSvc.mensagemNegativo('Verifique os campos abaixo');
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisarAprovar();
        };

        var init = function () {
            $scope.pessoaAprovacaoId = $scope.$parent.pessoaAprovacaoId;

            if ($scope.pessoaAprovacaoId > 0) {
                obterDados();
            }
            else
                $scope.redirecionarPesquisar();
        };

        init();
    }
]);