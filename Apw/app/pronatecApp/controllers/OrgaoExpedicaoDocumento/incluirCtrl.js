OrgaoExpedicaoDocumentoMdl.controller('incluirCtrl', ['$scope', 'OrgaoExpedicaoDocumentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.salvar = function () {
            globalSvc.limparMensagens();

            var valido = true;

            if (!(new ValidationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                })
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }

    }
]);