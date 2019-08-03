usuarioPerfilUnidadeEscolarMdl.controller('unidadeEscolarCtrl', ['$scope', 'usuarioPerfilUnidadeEscolarSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.obterUsuario = function () {
            $scope.loadUsuario = service.obterUsuarioParaPerfil($scope.$parent.usuarioId).then(function (response) {
                $scope.usuario = response.data;
            });
        }

        $scope.obterUsuarioPerfilUnidadesEscolares = function () {
            $scope.loadUsuarioPerfilUnidadesEscolares = service.obterUsuarioPerfilUnidadesEscolaresParaPerfil($scope.$parent.usuarioPerfilId).then(function (response) {
                $scope.usuarioPefilUnidadesEscolares = response.data;
            });
        }

        $scope.obterMunicipios = function () {
            $scope.loadMunicipios = service.obterMunicipiosParaPerfil().then(function (response) {
                $scope.municipios = response.data;
            });
        }

        $scope.obterUnidadesEscolares = function () {
            $scope.unidadeEscolarId = null;
            $scope.unidadesEscolares = [];

            if ($scope.municipioId) {
                $scope.loadUnidadesEscolares = service.obterUnidadesEscolaresParaPerfil($scope.municipioId).then(function (response) {
                    $scope.unidadesEscolares = response.data;
                });
            }
        }

        $scope.adicionar = function () {
            if (new validationService().checkFormValidity($scope.form)) {
                if (!validarDuplicado()) {
                    $scope.loadAdicionar = service.salvarUsuarioPerfilUnidadeEscolar($scope.$parent.usuarioPerfilId, $scope.unidadeEscolarId).then(response => {
                        if (response.data > 0) {
                            $scope.usuarioPefilUnidadesEscolares.push(
                                {
                                    usuarioPerfilUnidadeEscolarId: response.data,
                                    unidadeEsolarId: $scope.unidadeEscolarId,
                                    nomeUnidadeEscolar: $scope.drop.unidadeEscolar.selected.nomeUnidadeEscolar
                                });
                            globalSvc.mensagemPositivo("Permissão cadastrada com sucesso!");
                        }
                    });
                }
                else
                    globalSvc.mensagemNegativo("Unidade Escolar já cadastrada");
            }
            else
                globalSvc.mensagemNegativo("Selecione uma Unidade Escolar");
        };

        var validarDuplicado = function () {
            return $scope.usuarioPefilUnidadesEscolares.some(x => { return x.unidadeEscolarId == $scope.unidadeEscolarId });
        };

        $scope.excluir = function (item, index) {
            $scope.permissaoParaExcluir = {
                usuarioPerfilUnidadeEscolarId: item.usuarioPerfilUnidadeEscolarId,
                index: index
            }
        }

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirUsuarioPerfilUnidadeEscolar($scope.permissaoParaExcluir.usuarioPerfilUnidadeEscolarId).then(function (response) {
                if (response.data) {
                    $scope.usuarioPefilUnidadesEscolares.splice($scope.permissaoParaExcluir.index);
                    $scope.permissaoParaExcluir = null;
                    globalSvc.mensagemPositivo("Registro excluído com sucesso!");
                }
            });
        };

        $scope.voltar = function () {
            $scope.redirecionarPerfil();
        };

        var init = function () {
            if ($scope.$parent.usuarioPerfilId) {
                $scope.obterUsuario();
                $scope.obterUsuarioPerfilUnidadesEscolares();
                $scope.obterMunicipios();
            }
            else
                $scope.redirecionarPerfil();
        };

        init();
    }
]);