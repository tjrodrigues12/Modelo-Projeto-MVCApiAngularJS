usuarioMdl.controller('incluirCtrl', ['$scope', 'usuarioSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.listaSexo = [
            { label: 'Masculino', id: 'M' },
            { label: 'Feminino', id: 'F' }
        ];

        $scope.obterPerfis = function () {
            $scope.loadPerfil = service.obterPerfis().then(function (response) {
                $scope.perfis = response.data;
            });
        };

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) {
                $scope.salvando = service.incluir($scope.dados).then(function (response) {
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
            $scope.obterPerfis();
        }

        init();
    }
]);