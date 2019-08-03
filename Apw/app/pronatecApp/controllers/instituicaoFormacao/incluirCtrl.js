instituicaoFormacaoMdl.controller('incluirCtrl', ['$scope', 'instituicaoFormacaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.salvar = function () {

            if (!validar()) return;

            $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                if (response.data == true) $scope.redirecionarPesquisar();
            });
        }

        function validar() {

            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) return true;

            globalSvc.mensagemAviso('Verifique os campos abaixo!');

            return false;
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };
    }
]);