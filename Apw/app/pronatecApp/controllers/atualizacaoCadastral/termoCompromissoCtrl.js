atualizacaoCadastralMdl.controller('termoCompromissoCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService', '$window',
    function ($scope, service, globalSvc, validationService, $window) {

        $scope.ckbTermo = false;

        $scope.voltar = function () {
            $scope.redirecionarUploadDocumentos();
        };

        $scope.salvar = function () {
            $scope.loadSalvar = service.finalizar($scope.dados).then(function (response) {
                if (response.data) {
                    $window.location.href = '/';
                }
            });
        }

        var init = function () {
            globalSvc.limparMensagens();
            if (!$scope.dados)
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);