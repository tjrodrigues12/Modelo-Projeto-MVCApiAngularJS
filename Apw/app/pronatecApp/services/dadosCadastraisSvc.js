dadosCadastraisMdl.service('dadosCadastraisSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/dadosCadastrais/';

        //#region Detalhes

        this.obterDados = function () {
            return $http.get(serviceBase + "GetDados").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterArquivoDownload = function (pessoaDocumentoId) {
            return $http.get(serviceBase + "GetDownloadDocumento", {
                responseType: 'arraybuffer',
                params: {
                    pessoaDocumentoId: pessoaDocumentoId
                }
            })
        }

        //#endregion
    }
]);