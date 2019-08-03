frequenciaMdl.controller('registroOcorrenciaAdministrativoCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.dadosPessoa = $scope.$parent.dadosPessoa;

        //#region Obter Dados
        $scope.obterDadosFolhaPonto = function () {
            $scope.loadObter = service.obterDadosFolhaPonto($scope.dadosPessoa.folhaFrequenciaId).then(function (response) {
                $scope.dadosFrequencia = response.data;
            });
        }

        $scope.obterDadosTipoOcorrencia = function () {
            $scope.loadOcorrencia = service.obterDadosTipoOcorrencia().then(function (response) {
                $scope.listaOcorrencia = response.data;
            });
        }
        //#endregion

        //#region Eventos
        $scope.alterarPonto = function (folhaFrequenciaAlocacaoId, marcacao) {
            if (marcacao && !$scope.listaMarcacoes.includes(folhaFrequenciaAlocacaoId)) {
                $scope.listaMarcacoes.push(folhaFrequenciaAlocacaoId);
            }

            if (!marcacao && $scope.listaMarcacoes.includes(folhaFrequenciaAlocacaoId)) {
                var index = $scope.listaMarcacoes.indexOf(folhaFrequenciaAlocacaoId);
                $scope.listaMarcacoes.splice(index, 1);
            }
        }

        $scope.confirmar = function () {

            if (!new ValidationService().checkFormValidity($scope.form)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }
            else {
                var listaOcorrencia = {
                    tipoOcorrenciaId: $scope.tipoOcorrenciaId,
                    listaFrequenciaAlocacao: $scope.listaMarcacoes,
                    folhaFrequenciaId: $scope.dadosPessoa.folhaFrequenciaId
                }

                $scope.loadAlterarOcorrencia = service.alterarOcorrenciaFrequencia(listaOcorrencia).then(function (response) {
                    if (response.data) {
                        $scope.obterDadosFolhaPonto();
                        $scope.listaMarcacoes = [];
                    }
                    $('#mdlOcorrencia').modal('hide')
                });
            }
        }

        $scope.salvarOcorrencias = function () {
            $scope.obterDadosTipoOcorrencia();
        }

        //#endregion

        $scope.init = function () {
            if ($scope.$parent.dadosPessoa == undefined || $scope.$parent.dadosPessoa == null) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosFolhaPonto();
            $scope.listaMarcacoes = [];
        }

        $scope.init();

    }
]);