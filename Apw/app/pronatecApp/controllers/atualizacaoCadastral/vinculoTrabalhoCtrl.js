atualizacaoCadastralMdl.controller('vinculoTrabalhoCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService', '$filter',
    function ($scope, service, globalSvc, validationService, $filter) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaVinculoTrabalho;

        $scope.obterRegimesPrevidenciarios = function () {
            $scope.loadRegimesPrevidenciarios = service.obterRegimesPrevidenciarios().then(function (response) {
                $scope.filtro.regimesPrevidenciarios = response.data;
            });
        }

        $scope.obterTiposContratosTrabalho = function () {
            $scope.loadTiposContratosTrabalho = service.obterTiposContratosTrabalho().then(function (response) {
                $scope.filtro.tiposContratosTrabalho = response.data;
            });
        }

        $scope.trocarTipoContratoTrabalho = function () {
            if ($scope.tipoContratoTrabalhoId)
                $scope.mostrarDataTermino = $scope.drop.tipoContratoTrabalho.selected.exigeDataTermino;
        }

        $scope.obterTiposSalarios = function () {
            $scope.loadTiposSalarios = service.obterTiposSalarios().then(function (response) {
                $scope.filtro.tiposSalarios = response.data;
            });
        }

        $scope.adicionar = function () {
            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formVinculoTrabalho))
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            else {
                var formValido = true;
                if ($scope.tipoVinculo == 2 || $scope.tipoVinculo == 4) {
                    if (!$scope.validarCnpj($scope.cnpj)) {
                        globalSvc.mensagemNegativo("CNPJ Inválido!");
                        formValido = false;
                    }
                }

                if (formValido) {
                    var trabalho = {
                        pessoaId: $scope.dados.pessoaId,
                        razaoSocial: $scope.razaoSocial,
                        cnpj: $scope.cnpj,
                        observacao: $scope.observacao,
                        regimePrevidenciarioId: $scope.regimePrevidenciarioId,
                        tipoContratoTrabalhoId: $scope.tipoVinculo == 4 ? 1 : $scope.tipoContratoTrabalhoId,
                        salarioBruto: $scope.salarioBruto,
                        tipoSalarioId: $scope.tipoSalarioId,
                        terminoContrato: $scope.terminoContrato
                    };

                    $scope.loadSalvar = service.adcionarTrabalho(trabalho).then(response => {
                        if (response.data > 0) {
                            trabalho.pessoaTrabalhoId = response.data;
                            trabalho.regimePrevidenciario = $scope.drop.regimePrevidenciario.selected.descricao;
                            trabalho.tipoContratoTrabalho = $scope.drop.tipoContratoTrabalho.selected.descricao;
                            trabalho.tipoSalario = $scope.drop.tipoSalario.selected.descricao;

                            $scope.dados.pessoasTrabalhos.push(trabalho);
                            globalSvc.mensagemPositivo("Vínculo de Trabalho cadastrado com sucesso!");
                        }
                        else {
                            globalSvc.mensagemNegativo("Ocorreu um erro ao salvar o registro!");
                        }

                        $scope.limparForm();

                    }, response => {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
        }

        $scope.limparForm = function () {
            new validationService().resetForm($scope.formVinculoTrabalho);

            $scope.razaoSocial = null;
            $scope.cnpj = null;
            $scope.salarioBruto = null;
            $scope.observacao = null;
            $scope.regimePrevidenciarioId = null;
            $scope.tipoContratoTrabalhoId = null;
            $scope.terminoContrato = null;
            $scope.tipoSalarioId = null;
        };

        $scope.excluir = function (item, index) {
            $scope.modalExcluir = !$scope.modalExcluir;
            if (item) {
                $scope.itemParaExcluir = {
                    pessoaTrabalhoId: item.pessoaTrabalhoId,
                    index: index
                }
            }
        }

        $scope.confirmarExcluir = function (item, index) {
            $scope.loadExcluir = service.excluirTrabalho($scope.itemParaExcluir.pessoaTrabalhoId).then(response => {
                if (response.data) {
                    $scope.dados.pessoasTrabalhos.splice($scope.itemParaExcluir.index, 1);
                }
            }, response => {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.avancar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosVinculoTrabalho = $scope.filtro;
            $scope.redirecionarUploadDocumentos();
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosVinculoTrabalho = $scope.filtro;
            $scope.redirecionarDadosProfissionais();
        };

        $scope.validarCnpj = function (cnpj) {
            if (!cnpj) return false;
            if (cnpj == '') return false;

            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj.length != 14)
                return false;

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return false;

            // Valida DVs
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;

        }

        var init = function () {
            globalSvc.limparMensagens();
            $scope.drop = {};
            if ($scope.dados) {
                if (!$scope.filtro.regimesPrevidenciarios) {
                    $scope.modalExcluir = false;
                    $scope.mostrarDataTermino = false;
                    $scope.obterRegimesPrevidenciarios();
                    $scope.obterTiposContratosTrabalho();
                    $scope.obterTiposSalarios();
                }
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);