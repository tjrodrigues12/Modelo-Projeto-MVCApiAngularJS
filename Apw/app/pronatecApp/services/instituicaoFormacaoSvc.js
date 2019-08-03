instituicaoFormacaoMdl.service('instituicaoFormacaoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/InstituicaoFormacao/';

        //#region Pesquisar

        this.obterInstituicoesFormacoesGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetInstituicoesFormacoesGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Incluir

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Edição

        this.obterInstituicaoFormacaoParaEditar = function (instituicaoFormacaoId) {
            return $http.get(serviceBase + "GetInstituicaoFormacaoParaEditar", {
                params: {
                    instituicaoFormacaoId: instituicaoFormacaoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.editar = function (dados) {
            return $http.put(serviceBase + "PutEditar", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion        

        //#region Excluir

        this.excluir = function (instituicaoFormacaoId) {
            return $http.delete(serviceBase + "DeleteExcluir", {
                params: {
                    instituicaoFormacaoId: instituicaoFormacaoId
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