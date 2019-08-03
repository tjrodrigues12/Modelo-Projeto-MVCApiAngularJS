portalTipoAcessoMdl.controller("pesquisarCtrl", ['$scope', 'portalTipoAcessoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValitionService) {

        $scope.init = function () {
            $scope.dados = 'pessoaNome';

            $scope.dadosLogin = { usuario: "", cpf: "", senha: "" };
            $scope.dados = {
                listaDominio: [
                    { dominioId: 1, dominio: 'sed.ms.gov.br' },
                    { dominioId: 2, dominio: 'fazenda.ms.gov.br' },
                    { dominioId: 3, dominio: 'sed.ms.gov.br' },
                    { dominioId: 4, dominio: 'fazenda.ms.gov.br' },
                    { dominioId: 5, dominio: 'sed.ms.gov.br' }
                ]
            };
            $scope.acesso = false;//false -> servidores autenticação GSI, true -> professor autenticação cpf/senha
        }

        $scope.init();

    }
]);