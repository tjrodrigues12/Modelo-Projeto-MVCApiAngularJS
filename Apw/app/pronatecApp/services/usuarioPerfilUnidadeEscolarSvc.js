usuarioPerfilUnidadeEscolarMdl.service('usuarioPerfilUnidadeEscolarSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/UsuarioPerfilUnidadeEscolar/';

        //#region Pesquisar

        this.obterUsuariosGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetUsuariosGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion
        
        //#region Perfil

        this.obterPerfisParaPerfil = function () {
            return $http.get(serviceBase + "GetPerfisParaPerfil").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUsuarioParaPerfil = function (usuarioId) {
            return $http.get(serviceBase + "GetUsuarioParaPerfil", {
                params: {
                    usuarioId: usuarioId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUsuarioPerfisParaPerfil = function (usuarioId) {
            return $http.get(serviceBase + "GetUsuarioPerfisParaPerfil", {
                params: {
                    usuarioId: usuarioId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarUsuarioPerfil = function (usuarioId, perfilId) {
            return $http.get(serviceBase + "GetSalvarUsuarioPerfil", {
                params: {
                    usuarioId: usuarioId,
                    perfilId : perfilId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirUsuarioPerfil = function (usuarioPerfilId) {
            return $http.delete(serviceBase + "DeleteExcluirUsuarioPerfil", {
                params: {
                    usuarioPerfilId: usuarioPerfilId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        // #region unidade escolar

        this.obterUsuarioPerfilUnidadesEscolaresParaPerfil = function (usuarioPerfilId) {
            return $http.get(serviceBase + "GetUsuarioPerfilUnidadesEscolaresParaPerfil", {
                params: {
                    usuarioPerfilId: usuarioPerfilId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMunicipiosParaPerfil = function () {
            return $http.get(serviceBase + "GetMunicipiosParaPerfil").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUnidadesEscolaresParaPerfil = function (municipioId) {
            return $http.get(serviceBase + "GetUnidadesEscolaresParaPerfil", {
                params: {
                    municipioId: municipioId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarUsuarioPerfilUnidadeEscolar = function (usuarioPerfilId, unidadeEscolarId) {
            return $http.get(serviceBase + "GetSalvarUsuarioPerfilUnidadeEscolar", {
                params: {
                    usuarioPerfilId: usuarioPerfilId,
                    unidadeEscolarId: unidadeEscolarId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirUsuarioPerfilUnidadeEscolar = function (usuarioPerfilUnidadeEscolarId) {
            return $http.delete(serviceBase + "DeleteExcluirUsuarioPerfilUnidadeEscolar", {
                params: {
                    usuarioPerfilUnidadeEscolarId: usuarioPerfilUnidadeEscolarId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

    }
]);