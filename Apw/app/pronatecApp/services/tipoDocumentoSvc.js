tipoDocumentoMdl.service('tipoDocumentoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/TipoDocumento/';

        //#region Editar
        
        this.obterTipoDocumento = function (tipoDocumentoId) {
            return $http.get(serviceBase + "GetTipoDocumentoPorId", {
                params: {
                    tipoDocumentoId: tipoDocumentoId
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
        this.incluir = function (dados){
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Pesquisar

        this.obterTipoDocumentosGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetTipoDocumentosGridDadosParaPesquisar", {
                params:  filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Excluir
        this.excluir = function (tipoDocumentoId) {
            return $http.delete(serviceBase + "DeleteExcluirTipoDocumento", {
                params: { tipoDocumentoId: tipoDocumentoId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion
    }
]);