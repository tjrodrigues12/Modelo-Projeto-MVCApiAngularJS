atualizacaoCadastralMdl.controller('dadosProfissionaisCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaDadosProfissionais;

        $scope.adicionar = function () {
            globalSvc.limparMensagens();

            if (validarCampos()) {
                var profissao = {
                    pessoaId: $scope.dados.pessoaId,
                    profissao: $scope.profissao,
                    tempoExperiencia: $scope.tempoExperiencia
                };

                $scope.loadSalvar = service.adcionarProfissao(profissao).then(response => {
                    if (response.data > 0) {
                        profissao.pessoaProfissaoId = response.data;
                        $scope.dados.pessoasProfissoes.push(profissao);
                        globalSvc.mensagemPositivo("Profissão cadastrada com sucesso!");
                    }
                    else {
                        globalSvc.mensagemNegativo("Ocorreu um erro ao salvar o registro!");
                    }

                    new validationService().resetForm($scope.formDadosProfissionais);

                    $scope.profissao = null;
                    $scope.tempoExperiencia = null;
                }, response => {
                    globalSvc.tratarErroResponse(response);
                });
            }
        }

        var validarCampos = function () {
            return ValidarCampoProfissao()
            && ValidarCampoTempoExperiencia();
        };

        var ValidarCampoProfissao = function () {
            if ($scope.profissao) return true;

            globalSvc.mensagemNegativo("Informe uma Profissão");
            return false;
        };

        var ValidarCampoTempoExperiencia = function () {
            if ($scope.tempoExperiencia > 0) return true;

            globalSvc.mensagemNegativo("Informe o Tempo de Experiência");
            return false;
        };

        $scope.excluir = function (item, index) {
            $scope.modalExcluir = !$scope.modalExcluir;
            if (item) {
                $scope.itemParaExcluir = {
                    pessoaProfissaoId: item.pessoaProfissaoId,
                    index: index
                }
            }
        }

        $scope.confirmarExcluir = function (item, index) {
            $scope.loadExcluir = service.excluirProfissao($scope.itemParaExcluir.pessoaProfissaoId).then(response => {
                if (response.data) {
                    $scope.dados.pessoasProfissoes.splice($scope.itemParaExcluir.index, 1);
                }
            }, response => {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.avancar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosProfissionais = $scope.filtro;
            $scope.redirecionarVinculoTrabalho();
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosProfissionais = $scope.filtro;
            $scope.redirecionarDadosAcademicos();
        };

        var init = function () {
            globalSvc.limparMensagens();
            if ($scope.dados) {
                $scope.modalExcluir = false;
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);