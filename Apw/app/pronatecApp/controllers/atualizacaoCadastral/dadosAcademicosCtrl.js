atualizacaoCadastralMdl.controller('dadosAcademicosCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaDadosAcademicos

        $scope.obterFormacoes = function () {
            $scope.loadFormarcoes = service.obterFormacoes().then(function (response) {
                $scope.filtro.formacoes = response.data;
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
            $scope.loadInstituicoesFormacoes = service.obterInstituicoesFormacoes(textoPesquisa).then(function (response) {
                $scope.filtro.instituicoesFormacoes = response.data;
            });
        }

        $scope.obterCursosFormacoes = function (textoPesquisa) {
            if (textoPesquisa == undefined || textoPesquisa == null) textoPesquisa = "";
            $scope.loadCursosFormacoes = service.obterCursosFormacoes(textoPesquisa).then(function (response) {
                $scope.filtro.cursosFormacoes = response.data;
            });
        }

        $scope.adicionar = function () {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formDadosEscolares))
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            else {
                var formacao = {
                    pessoaId: $scope.dados.pessoaId,
                    formacaoId: $scope.formacaoId,
                    formacao: $scope.drop.formacao.selected.formacao,
                    instituicaoFormacaoId: $scope.instituicaoFormacaoId,
                    instituicaoFormacao: $scope.drop.instituicaoFormacao.selected ? $scope.drop.instituicaoFormacao.selected.instituicaoFormacao : '',
                    cursoFormacaoId: $scope.cursoFormacaoId,
                    cursoFormacao: $scope.drop.cursoFormacao.selected ? $scope.drop.cursoFormacao.selected.cursoFormacao : '',
                    anoInicio: $scope.anoInicio,
                    anoTermino: $scope.anoTermino,
                    concluido: $scope.anoTermino > 0
                };

                $scope.loadSalvar = service.adcionarFormacao(formacao).then(response => {
                    if (response.data > 0) {
                        formacao.pessoaFormacaoId = response.data;
                        $scope.dados.pessoasFormacoes.push(formacao);
                        globalSvc.mensagemPositivo("Formação cadastrada com sucesso!");
                    }
                    else {
                        globalSvc.mensagemNegativo("Ocorreu um erro ao salvar o registro!");
                    }

                    new validationService().resetForm($scope.formDadosEscolares);

                    $scope.formacaoId = "";
                    $scope.drop.formacao.selected = null;
                    $scope.instituicaoFormacaoId = "";
                    $scope.drop.instituicaoFormacao.selected = null;
                    $scope.cursoFormacaoId = "";
                    $scope.drop.cursoFormacao.selected = null;
                    $scope.anoInicio = "";
                    $scope.anoTermino = "";
                }, response => {
                    globalSvc.tratarErroResponse(response);
                });
            }
        }

        $scope.excluir = function (item, index) {
            $scope.modalExcluir = !$scope.modalExcluir;
            if (item) {
                $scope.itemParaExcluir = {
                    pessoaFormacaoId: item.pessoaFormacaoId,
                    index: index
                }
            }
        }

        $scope.confirmarExcluir = function (item, index) {
            $scope.loadExcluir = service.excluirFormacao($scope.itemParaExcluir.pessoaFormacaoId).then(response => {
                if (response.data) {
                    $scope.dados.pessoasFormacoes.splice($scope.itemParaExcluir.index, 1);
                }
            }, response => {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.avancar = function () {
            if ($scope.dados.pessoasFormacoes.length > 0) {
                $scope.$parent.dados = $scope.dados;
                $scope.$parent.filtro.abaDadosAcademicos = $scope.filtro;
                $scope.redirecionarDadosProfissionais();
            }
            else
                globalSvc.mensagemAviso('Informe ao menos uma formação!');
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosBancarios = $scope.filtro;
            $scope.redirecionarDadosBancarios();
        };

        var init = function () {
            $scope.obterCursosFormacoes();
            globalSvc.limparMensagens();
            if ($scope.dados) {
                if (!$scope.filtro.formacoes) {
                    $scope.mostrarDadosCurso = true;
                    $scope.modalExcluir = false;
                    $scope.obterFormacoes();
                }
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);