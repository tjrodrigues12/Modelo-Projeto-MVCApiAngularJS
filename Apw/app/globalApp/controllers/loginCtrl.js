globalMdl.controller('loginCtrl', ['$scope', 'loginSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        //#region Obter Dados

        $scope.obterDominio = function () {
            $scope.loadDominio = service.obterListaDominio().then(response => {
                $scope.listaDominio = response.data;
            });
        }

        //#endregion

        //#region Métodos

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formLogin)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        //#endregion

        //#region Eventos

        $scope.realizarLogin = function () {
            if (validar()) {
                $scope.loadLogin = service.postLogin($scope.dadosLogin).then(response => {
                    if (response.data) {
                        window.location.reload();
                    }
                });
            }
        }

        $scope.alterarAcesso = function () {
            $scope.dadosLogin.tipoAcesso = !$scope.dadosLogin.tipoAcesso;
        }

        //#endregion


        $scope.logoff = function () {
            var a = 'a';
        }

        $scope.init = function () {
            $scope.dadosLogin = { usuario: "", cpf: "", senha: "", tipoAcesso: false };//TipoAcesso | false -> servidores autenticação GSI, true -> professor autenticação cpf/senha
            
            $scope.obterDominio();
            
        }

        $scope.init();
    }
]);