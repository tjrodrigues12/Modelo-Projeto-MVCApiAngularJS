usuarioPerfilUnidadeEscolarMdl.controller('perfilCtrl', ['$scope', 'usuarioPerfilUnidadeEscolarSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.obterUsuario = function () {
            $scope.loadUsuario = service.obterUsuarioParaPerfil($scope.$parent.usuarioId).then(function (response) {
                $scope.usuario = response.data;
            });
        }

        $scope.obterUsuarioPerfis = function () {
            $scope.loadUsuarioPerfis = service.obterUsuarioPerfisParaPerfil($scope.$parent.usuarioId).then(function (response) {
                $scope.usuarioPerfis = response.data;
            });
        }

        $scope.obterPerfis = function () {
            $scope.loadPerfis = service.obterPerfisParaPerfil().then(function (response) {
                $scope.perfis = response.data;
            });
        }

        $scope.adicionar = function () {
            if (new validationService().checkFormValidity($scope.form)) {
                if (!validarDuplicado()) {
                    $scope.loadAdicionar = service.salvarUsuarioPerfil($scope.$parent.usuarioId, $scope.perfilId).then(response => {
                        if (response.data > 0) {
                            $scope.usuarioPerfis.push(
                                {
                                    usuarioPerfilId: response.data,
                                    perfilId: $scope.perfilId,
                                    descricao: $scope.drop.perfil.selected.descricao
                                });
                            globalSvc.mensagemPositivo("Perfil cadastrado com sucesso!");
                        }
                    });
                }
                else
                    globalSvc.mensagemNegativo("Perfil já cadastrado");
            }
            else
                globalSvc.mensagemNegativo("Selecione um Perfil");
        };

        var validarDuplicado = function () {
            return $scope.usuarioPerfis.some(x => { return x.perfilId == $scope.perfilId });
        };

        $scope.excluir = function (item, index) {
            $scope.perfilParaExcluir = {
                usuarioPerfilId: item.usuarioPerfilId,
                index : index
            }            
        }

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirUsuarioPerfil($scope.perfilParaExcluir.usuarioPerfilId).then(function (response) {
                if (response.data) {
                    $scope.usuarioPerfis.splice($scope.perfilParaExcluir.index);
                    $scope.perfilParaExcluir = null;
                    globalSvc.mensagemPositivo("Registro excluído com sucesso!");
                }
            });
        };

        $scope.permissao = function (item) {
            $scope.$parent.usuarioPerfilId = item.usuarioPerfilId;
            $scope.redirecionarUnidadeEscolar();
        }

        var init = function () {
            if ($scope.$parent.usuarioId) {
                $scope.obterUsuario();
                $scope.obterUsuarioPerfis();
                $scope.obterPerfis();
            }
            else
                $scope.redirecionarPesquisar();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();
    }
]);