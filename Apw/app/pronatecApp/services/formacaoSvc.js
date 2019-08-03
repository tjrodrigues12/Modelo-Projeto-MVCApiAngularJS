formacaoMdl.service('formacaoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Formacao/';

        //#region Editar

        this.obterFormacao = function (FormacaoId) {
            return $http.get(serviceBase + "GetFormacaoPorId", {
                params: {
                    FormacaoId: FormacaoId
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

        //#region Incluir

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Pesquisar

        this.obterFormacoesGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetFormacoesGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Excluir

        this.excluir = function (FormacaoId) {
            return $http.delete(serviceBase + "DeleteExcluirFormacao", {
                params: { FormacaoId: FormacaoId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
        
    }
]);