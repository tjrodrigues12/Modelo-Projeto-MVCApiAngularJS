inscricaoMdl.service('inscricaoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Inscricao/';

        //#region Pesquisar Candidatos

        this.obterInscricoesParaPesquisarCandidatos = function () {
            return $http.get(serviceBase + "GetInscricoesParaPesquisarCandidatos").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposInscricoesCandidatosParaPesquisarCandidatos = function (inscricaoId) {
            return $http.get(serviceBase + "GetTiposInscricoesCandidatosParaPesquisarCandidatos", {
                params: {
                    inscricaoId: inscricaoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterSituacoesInscricoesCandidatosParaPesquisarCandidatos = function (inscricaoId, tipoInscricaoCandidato) {
            return $http.get(serviceBase + "GetSituacoesInscricoesCandidatosParaPesquisarCandidatos", {
                params: {
                    inscricaoId: inscricaoId,
                    tipoInscricaoCandidato: tipoInscricaoCandidato
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterInscricoesCandidatosGridDadosParaPesquisarCandidatos = function (filtro) {
            return $http.get(serviceBase + "GetInscricoesCandidatosGridDadosParaPesquisarCandidatos", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Detalhes Inscrição Candidato

        this.obterInscricaoCandidatoParaDetalhesInscricaoCandidato = function (inscricaoCandidatoId) {
            return $http.get(serviceBase + "GetInscricaoCandidatoParaDetalhesInscricaoCandidato", {
                params: {
                    inscricaoCandidatoId: inscricaoCandidatoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterVinculosCandidatoParaDetalhesInscricaoCandidato = function (inscricaoCandidatoId) {
            return $http.get(serviceBase + "GetVinculosCandidatoParaDetalhesInscricaoCandidato", {
                params: {
                    inscricaoCandidatoId: inscricaoCandidatoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Pesquisar Autorizar

        this.obterInscricoesParaPesquisarAutorizar = function () {
            return $http.get(serviceBase + "GetInscricoesParaPesquisarAutorizar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterAutorizacoesGridDadosParaPesquisarAutorizar = function (filtro) {
            return $http.get(serviceBase + "GetAutorizacoesGridDadosParaPesquisarAutorizar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Autorizar

        this.obterSituacoesInscricoesCandidatosParaAutorizar = function () {
            return $http.get(serviceBase + "GetSituacoesInscricoesCandidatosParaAutorizar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterArquivoDownload = function (inscricaoCandidatoDocumentoId, extensao) {
            return $http.get(serviceBase + "GetDownloadDocumento", {
                responseType: 'arraybuffer',
                params: {
                    inscricaoCandidatoDocumentoId: inscricaoCandidatoDocumentoId,
                    extensao: extensao
                }
            })
        }

        this.autorizar = function (dados) {
            return $http.put(serviceBase + "PutAutorizar", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
    }
]);