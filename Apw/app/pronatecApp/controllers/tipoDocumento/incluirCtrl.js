tipoDocumentoMdl.controller('incluirCtrl', ['$scope', 'tipoDocumentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.listaObrigatorio = [
            {
                label: 'Sim',
                value: true
            },
            {
                label: 'Não',
                value: false
            }
        ];

        $scope.dados = {}

        $scope.salvar = function () {
            globalSvc.limparMensagens();

            var valido = true;
            
            if (!(new validationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('verifique os campos abaixo!');
            }

            if (valido) {
                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                })
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

    }
]);