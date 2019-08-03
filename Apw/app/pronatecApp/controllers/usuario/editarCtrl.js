usuarioMdl.controller('editarCtrl', ['$scope', 'usuarioSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.obterUsuario = function () {
            $scope.loadTela = service.obterUsuarioParaEditar($scope.$parent.usuarioId).then(function (response) {
                $scope.dados = response.data;
            });
        }

        $scope.editar = function () {
            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) {
                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        var init = function () {
            $scope.dados = {}

            if ($scope.$parent.usuarioId) {
                $scope.obterUsuario();
            }
            else
                $scope.redirecionarPesquisar();
        };

        init();
    }
]);