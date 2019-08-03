tipoDocumentoMdl.controller('editarCtrl', ['$scope', 'tipoDocumentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

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

        $scope.obterTipoDocumento = function () {
            $scope.loadTela = service.obterTipoDocumento($scope.$parent.tipoDocumentoId).then(function (response) {
                $scope.dados = response.data;
                console.log($scope.dados);
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
            if ($scope.$parent.tipoDocumentoId)
                $scope.obterTipoDocumento();
            else
                $scope.$parent.redirecionarPesquisar();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();

    }
]);