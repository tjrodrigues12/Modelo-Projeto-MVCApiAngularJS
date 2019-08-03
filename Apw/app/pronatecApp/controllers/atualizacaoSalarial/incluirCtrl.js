atualizacaoSalarialMdl.controller('incluirCtrl', ['$scope', 'atualizacaoSalarialSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro;

        //#region Obter Dados
        $scope.obterRegimePrevidenciario = function () {
            $scope.loadRegPrev = service.obterRegimePrevidenciario().then(function (response) {
                $scope.filtro.regimePrevidenciario = response.data;
            });
        }

        $scope.obterTipoSalario = function () {
            $scope.loadTipoSalario = service.obterTipoSalario().then(function (response) {
                $scope.filtro.tipoSalario = response.data;
            });
        }

        $scope.obterTipoContratoTrabalho = function () {
            $scope.loadTipoContrato = service.obterTipoContratoTrabalho().then(function (response) {
                $scope.filtro.tipoContratoTrabalho = response.data;
            });
        }
        //#endregion

        //#region Métodos
        $scope.trocarTipoContratoTrabalho = function () {
            if ($scope.tipoContratoTrabalhoId)
                $scope.mostrarDataTermino = $scope.drop.tipoContratoTrabalho.selected.exigeDataTermino;
        }

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
            $scope.mostrarDataTermino = null;
        };
        //#endregion

        //#region Eventos
        $scope.salvar = function () {
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

                if (formValido && $scope.salarioBruto <= 0) {
                    globalSvc.mensagemNegativo("Remuneração Bruta / Pró-Labore Inválida!");
                    formValido = false;
                }

                if (formValido && $scope.mostrarDataTermino) {
                    if ($scope.terminoContrato == undefined || $scope.terminoContrato == null) {
                        formValido = false;
                        globalSvc.mensagemNegativo("Data Inválida!");
                    }
                }

                if (formValido) {
                    var trabalho = {
                        pessoaId: $scope.dados.dadosProfissional.pessoaId,
                        razaoSocial: $scope.razaoSocial,
                        cnpj: $scope.cnpj,
                        observacao: $scope.observacao,
                        regimePrevidenciarioId: $scope.regimePrevidenciarioId,
                        tipoContratoTrabalhoId: $scope.tipoVinculo == 4 ? 1 : $scope.tipoContratoTrabalhoId,
                        salarioBruto: $scope.salarioBruto,
                        tipoSalarioId: $scope.tipoSalarioId,
                        terminoContrato: $scope.terminoContrato
                    };

                    $scope.loadSalvar = service.incluir(trabalho).then(function (response) {
                        if (response.data == true) {
                            $scope.redirecionarPesquisar();
                            $scope.$parent.dados = null;
                        }
                    });
                }
            }
        }        

        $scope.voltar = function(){
            $scope.redirecionarPesquisar();
        }
        //#endregion

        $scope.init = function () {
            if ($scope.dados == undefined || $scope.dados == null) { $scope.redirecionarPesquisar(); }
            if ($scope.usuarioId == undefined || $scope.usuarioId == null) { $scope.$parent.redirecionarPesquisarProfissional(); }
            if ($scope.filtro == undefined || $scope.filtro == null) { $scope.filtro = {}; }

            $scope.obterRegimePrevidenciario();
            $scope.obterTipoSalario();
            $scope.obterTipoContratoTrabalho();

            $scope.tipoVinculo = 2;
        }

        $scope.init();
    }
]);