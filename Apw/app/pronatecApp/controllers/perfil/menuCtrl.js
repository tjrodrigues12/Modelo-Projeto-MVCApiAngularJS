perfilMdl.controller('menuCtrl', ['$scope', 'perfilSvc', 'globalSvc', 'orderByFilter', 'ValidationService',
    function ($scope, service, globalSvc, orderByFilter, validationService) {

        $scope.obterPerfilMenus = function () {
            $scope.loadMenus = service.obterPerfilMenus($scope.$parent.perfilSelecionado.perfilId).then(response => {
                $scope.menus = response.data;
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        $scope.marcarDesmarcar = function (menu) {
            $scope.loadMarcarDesmarcarPerfilMenu = service.marcarDesmarcarPerfilMenu($scope.$parent.perfilSelecionado.perfilId, menu.menuId).then(response => {
                if (response.data) {
                    globalSvc.mensagemPositivo('Permissão ' + (menu.marcado ? 'adicionada' : 'removida') + ' com sucesso!');
                }
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        $scope.marcarDesmarcarPerfilMenuOperacao = function (operacao) {           
            $scope.loadMarcarDesmarcarOperacao = service.marcarDesmarcarPerfilMenuOperacao(operacao).then(response => {
                if (response.data) {
                    globalSvc.mensagemPositivo('Permissão ' + (operacao.selecionado ? 'adicionada' : 'removida') + ' com sucesso!');                    
                }
            }, response => {                
                globalSvc.extrairMensagens(response);
            });
        };

        var init = function () {
            if ($scope.$parent.perfilSelecionado)
                $scope.obterPerfilMenus();
            else
                $scope.redirecionarPesquisar();
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();
    }
]);