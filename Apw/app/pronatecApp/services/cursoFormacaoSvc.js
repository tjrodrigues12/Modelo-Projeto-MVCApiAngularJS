cursoFormacaoMdl.service('cursoFormacaoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/CursoFormacao/';

        //#region Pesquisar

        this.obterCursosFormacoesGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetCursosFormacoesGridDadosParaPesquisar", {
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

        this.obterCursoFormacaoParaEditar = function (cursoFormacaoId) {
            return $http.get(serviceBase + "GetCursoFormacaoParaEditar", {
                params: {
                    cursoFormacaoId: cursoFormacaoId
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

        this.excluir = function (cursoFormacaoId) {
            return $http.delete(serviceBase + "DeleteExcluir", {
                params: {
                    cursoFormacaoId: cursoFormacaoId
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