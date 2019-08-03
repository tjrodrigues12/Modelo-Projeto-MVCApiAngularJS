acessoMdl.controller('primeiroAcessoCtrl', ['$scope', 'acessoSvc', 'globalSvc', 'ValidationService',
     function ($scope, service, globalSvc, validationService) {

         $scope.validarToken = function () {

             globalSvc.limparMensagens();

             if ((new validationService()).checkFormValidity($scope.formToken)) {
                 $scope.loadValidarToken = service.validarToken($scope.email, $scope.token).then(function (response) {
                     if (response.data) {
                         $scope.mostrarToken = false;
                         $scope.mostrarSenha = true;
                     }
                 });
             }
             else
                 globalSvc.mensagemAviso("Verifique os campos abaixo");
         }

         $scope.alterarSenha = function () {

             globalSvc.limparMensagens();

             if($scope.podeAlterarSenha)
             {
                 if ((new validationService()).checkFormValidity($scope.formSenha)) {
                     $scope.loadAlterarSenha = service.alterarSenha($scope.email, $scope.senha).then(function (response) {
                         if (response.data) {
                         $scope.podeAlterarSenha = false;
                             var usuario = {
                                 email: $scope.email,
                                 senha: $scope.senha
                             }
                             $scope.loadLogin = service.login(usuario).then(function (response) {
                            
                                 $scope.redirecionarHome();
                             });
                         }
                     });
                 }
                 else
                     globalSvc.mensagemAviso("Verifique os campos abaixo");
             }
             else
                globalSvc.mensagemAviso("Aguarde você esta sendo direcionado.");
         };

         var init = function () {

             $scope.dados = {};
             $scope.mostrarToken = true;
             $scope.mostrarSenha = false;
             $scope.podeAlterarSenha = true;
         };

         init();
     }
]);