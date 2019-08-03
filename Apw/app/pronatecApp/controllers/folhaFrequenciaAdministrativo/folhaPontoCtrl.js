folhaFrequenciaAdministrativoMdl.controller('folhaPontoCtrl', ['$scope', 'folhaFrequenciaAdministrativoSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dadosPessoa = $scope.$parent.dadosPessoa;

        $scope.obterDadosFolhaPonto = function () {
            $scope.loadObter = service.obterDadosFolhaPonto($scope.dadosPessoa.folhaFrequenciaId).then(function (response) {
                $scope.dadosFrequencia = response.data;
            });
        }

        $scope.alterarPonto = function (folhaFrequenciaAlocacaoId, presenca) {
            var dados = { folhaFrequenciaAlocacaoId: folhaFrequenciaAlocacaoId, presenca: presenca }

            $scope.loadAlterarPonto = service.alterarPontoFrequencia(dados).then(function (response) {
                $scope.obterDadosFolhaPonto();
            });
        }

        $scope.init = function () {
            if ($scope.$parent.dadosPessoa == undefined || $scope.$parent.dadosPessoa == null) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosFolhaPonto();
        }

        $scope.init();

    }
]);