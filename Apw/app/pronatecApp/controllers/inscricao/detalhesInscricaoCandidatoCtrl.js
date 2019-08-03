inscricaoMdl.controller('detalhesInscricaoCandidatoCtrl', ['$scope', 'inscricaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {
            inscricaoCandidatoId: $scope.$parent.estadoPesquisarCandidatos.inscricaoCandidatoId
        }

        $scope.obterInscricaoCandidato = function () {
            $scope.loadTela = service.obterInscricaoCandidatoParaDetalhesInscricaoCandidato($scope.dados.inscricaoCandidatoId).then(function (response) {
                $scope.dados = response.data;
            });
        }

        $scope.obterVinculosCandidato = function () {
            $scope.loadVc = service.obterVinculosCandidatoParaDetalhesInscricaoCandidato($scope.dados.inscricaoCandidatoId).then(function (response) {
                $scope.vinculos = response.data;
            });
        }

        function init() {
            if ($scope.dados.inscricaoCandidatoId == undefined || $scope.dados.inscricaoCandidatoId == null || $scope.dados.inscricaoCandidatoId <= 0) {
                $scope.redirecionarPesquisarCandidatos();
            }

            $scope.obterInscricaoCandidato();
            $scope.obterVinculosCandidato();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisarCandidatos();
        };

        init();
    }
]);