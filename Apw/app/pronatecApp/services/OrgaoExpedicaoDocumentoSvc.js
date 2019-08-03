OrgaoExpedicaoDocumentoMdl.service('OrgaoExpedicaoDocumentoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/OrgaoExpedicaoDocumento/';

        this.obterDadosOrgaoExpedicaoDocumentoGrid = function (filtro) {
            return $http.get(serviceBase + "GetDadosOrgaoExpedicaoDocumento", { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosOrgaoExpedicaoDocumentoparaEditar = function (orgaoExpedicaoDocumentoIdentificacaoId) {
            return $http.get(serviceBase + "GetDadosOrgaoExpedicaoDocumentoParaEditar", { 
                    params: {
                        orgaoExpedicaoDocumentoIdentificacaoId: orgaoExpedicaoDocumentoIdentificacaoId
                    }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
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

        this.excluir = function (orgaoExpedicaoDocumentoIdentificacaoId) {
            return $http.delete(serviceBase + "DeleteExcluirOrgaoExpedicaoDocumento", {
                params: { OrgaoExpedicaoDocumentoIdentificacaoId: orgaoExpedicaoDocumentoIdentificacaoId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

    }
]);