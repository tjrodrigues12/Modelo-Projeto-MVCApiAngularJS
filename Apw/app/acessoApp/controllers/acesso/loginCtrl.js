acessoMdl.controller('loginCtrl', ['$scope', 'acessoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.usuario = {};

        $scope.login = function () {
            globalSvc.limparMensagens();
            
            if($scope.podeFazerLogin)
            {
                if ((new validationService()).checkFormValidity($scope.formLogin)) {
                    $scope.loadLogin = service.login($scope.usuario).then(function (response) {
                        if (response.data == "True") {
                            $scope.redirecionarHome();
                        }
                        else
                            globalSvc.mensagemNegativo("Email ou Senha Incorretos!");
                    });

                }
                else
                    globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }
            else
                globalSvc.mensagemAviso("Aguarde você esta sendo direcionado.");
        };

        $scope.podeFazerLogin = true;
    }
]);