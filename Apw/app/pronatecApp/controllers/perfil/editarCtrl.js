perfilMdl.controller('editarCtrl', ['$scope', 'perfilSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.obterPerfil = function () {
            $scope.loadTela = service.obterPerfil($scope.$parent.perfilId).then(function (response) {
                $scope.dados = response.data;
            }, response => {
                globalSvc.extrairMensagens(response);
            });
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
                }, response => {
                    globalSvc.extrairMensagens(response);
                });
            }
        }

        var init = function () {
            if ($scope.$parent.perfilId)
                $scope.obterPerfil();
            else
                $scope.$parent.redirecionarPesquisar();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();

    }
]);