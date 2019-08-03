menuMdl.controller('pesquisarCtrl', ['$scope', 'menuSvc', 'globalSvc', 'orderByFilter', 'ValidationService',
    function ($scope, service, globalSvc, orderByFilter, validationService) {

        $scope.obterMenus = function () {
            $scope.loadMenus = service.obterMenus().then(response => {
                $scope.menus = response.data;
            });
        };    

        $scope.incluirMenuPai = function () {
            $scope.dadosModal = {
                titulo: 'Incluir novo menu pai',
                tipoExclusao: false
            }

            $scope.menu = {
                lista: $scope.menus,
                menuId: null,
                menuPaiId: null,
                nome: null,
                url: null,
                icone: null,
                ordem: null,
                perfisUtilizados: 0
            }
        };

        $scope.incluir = function (menu) {
            $scope.dadosModal = {
                titulo: 'Incluir no menu ' + menu.nome,
                tipoExclusao: false
            }

            $scope.menu = {
                lista: menu.listaFilhos,
                menuId: null,
                menuPaiId: menu.menuId,
                nome: null,
                url: null,
                icone: null,
                ordem: null,
                listaFilhos: [],
                perfisUtilizados: 0
            }
        };

        $scope.editar = function (menu) {
            $scope.dadosModal = {
                titulo: 'Editar o menu ' + menu.nome,
                tipoExclusao: false
            }

            $scope.menu = menu;
        };

        $scope.excluir = function (menu) {
            $scope.dadosModal = {
                titulo: 'Excluir o menu ' + menu.nome,
                tipoExclusao: true
            }

            $scope.menu = {
                menuId: menu.menuId
            }
        };

        $scope.operacoesMenu = function (menu) {

            $scope.dadosModal = {
                titulo: 'Operações do menu ' + menu.nome,
                menu: angular.copy(menu),
                inputOperacao: null,
                descricaoEdicao: null
            };

            $scope.formOperacaoMenu.$setPristine();
            $scope.formOperacaoMenu.$setUntouched();;

        };

        $scope.confirmar = function () {
            // exclusao
            if ($scope.dadosModal.tipoExclusao) {
                $scope.confirmando = service.excluirMenu($scope.menu.menuId).then(response => {
                    if (response.data) {
                        var elem = document.getElementById($scope.menu.menuId);
                        elem.parentNode.removeChild(elem);

                        globalSvc.mensagemPositivo("Menu excluído com sucesso!");
                        $('#mdlMenu').modal('hide')
                    }
                });
            }
            else {
                if (new validationService().checkFormValidity($scope.form)) {

                    var menu = {
                        menuId: $scope.menu.menuId,
                        menuPaiId: $scope.menu.menuPaiId,
                        nome: $scope.menu.nome,
                        url: $scope.menu.url,
                        icone: $scope.menu.icone,
                        ordem: $scope.menu.ordem,
                        listaFilhos: $scope.menu.listaFilhos,
                    };

                    // inclusão
                    if ($scope.menu.menuId == null) {
                        $scope.confirmando = service.incluirMenu(menu).then(response => {
                            if (response.data > 0) {
                                menu.menuId = response.data;

                                $scope.menu.lista.push(menu)
                                $scope.menu.lista = orderByFilter($scope.menu.lista, 'ordem');

                                globalSvc.mensagemPositivo("Menu inserido com sucesso!");
                                $('#mdlMenu').modal('hide')
                            }
                        });
                    }
                        // alteração
                    else {
                        $scope.confirmando = service.editarMenu(menu).then(response => {
                            if (response.data) {
                                globalSvc.mensagemPositivo("Menu alterado com sucesso!");
                                $('#mdlMenu').modal('hide')
                            }
                        });
                    }
                }
            }
        };

        //#region Modal Menu Operação

        $scope.adicionarOperacao = function (menu) {

            if (menu == null) return;

            if (!new validationService().checkFormValidity($scope.formOperacaoMenu)) return;

            menu.listaMenuOperacoes.push({
                menuId: menu.menuId,
                menuOperacaoId: null,
                ativo: true,
                operacao: $scope.dadosModal.inputOperacao
            });

            $scope.dadosModal.inputOperacao = null;
            $scope.formOperacaoMenu.$setPristine();
            $scope.formOperacaoMenu.$setUntouched();
        };

        $scope.editarOperacao = function (menu, operacaoItem) {

            menu.listaMenuOperacoes.forEach(function (element) {
                if (element != operacaoItem) {
                    element.edicao = false;
                }
            });

            var editar = !operacaoItem.edicao;

            if (editar) {

                $scope.dadosModal.descricaoEdicao = operacaoItem.operacao;

            } else { // confirmar

                if ($scope.dadosModal.descricaoEdicao != null && $scope.dadosModal.descricaoEdicao != '') {
                    operacaoItem.operacao = angular.copy($scope.dadosModal.descricaoEdicao);
                }

                $scope.dadosModal.descricaoEdicao = null;
            }

            operacaoItem.edicao = editar;
        };

        $scope.excluirOperacao = function (menu, operacaoItem) {

            if (menu == null) return;

            if (operacaoItem == null) return;

            var index = menu.listaMenuOperacoes.indexOf(operacaoItem);

            if (index < 0) return;

            menu.listaMenuOperacoes.splice(index, 1);
        };

        $scope.btnModalOperacoesCancelar = function () {
            $scope.dadosModal = { };
        };

        $scope.btnModalOperacoesConfirmar = function () {

            $scope.confirmando = service.salvarOperacoes($scope.dadosModal.menu.listaMenuOperacoes).then(response => {
                if (response.data) {
                    globalSvc.mensagemPositivo("Operações salvas com sucesso!");
                    $('#mdlOperacoes').modal('hide');
                    $scope.obterMenus();
                }
            });

        };

        //#endregion Modal Menu Operação

        var init = function () {
            $scope.obterMenus();   
        }

        init();
    }
]);