formacaoMdl.controller('editarCtrl', ['$scope', 'formacaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.obterFormacao = function () {
            $scope.loadTela = service.obterFormacao($scope.$parent.formacaoId).then(function (response) {
                $scope.dados = response.data;
            })
        }

        $scope.editar = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique o campo abaixo!');
            }

            if (valido) {
                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }
        }

        var init = function () {
            if ($scope.$parent.formacaoId)
                $scope.obterFormacao();
            else
                $scope.$parent.redirecionarPesquisar();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();

    }
]);