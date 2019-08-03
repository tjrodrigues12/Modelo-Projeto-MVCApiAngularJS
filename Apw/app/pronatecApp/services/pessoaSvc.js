pessoaMdl.service('pessoaSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Pessoa/';

        //#region Cadastro

        //#region Pesquisar

        this.obterPessoaGridDadosParaPesquisar = function (filtro) {
            return $http.get(serviceBase + "GetPessoaGridDadosParaPesquisar", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.alterarEmail = function (dados) {
            return $http.put(serviceBase + "PutAlterarEmail", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Incluir

        this.ativarProfissional = function (cpf) {
            return $http.put(serviceBase + "PutAtivarProfissional", cpf).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterPessoaCpf = function (cpf) {
            return $http.get(serviceBase + "GetPessoaPorCpf", {
                params: {
                    cpf: cpf
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.incluir = function (dados) {
            return $http.post(serviceBase + "PostIncluir", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar

        this.obterPessoaParaEditar = function (pessoaId) {
            return $http.get(serviceBase + "GetPessoaParaEditar", {
                params: {
                    pessoaId: pessoaId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUfsParaEditar = function () {
            return $http.get(serviceBase + "GetUfsParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMunicipiosParaEditar = function (uf) {
            return $http.get(serviceBase + "GetMunicipiosParaEditar", {
                params: {
                    uf: uf
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposContasParaEditar = function () {
            return $http.get(serviceBase + "GetTiposContasParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterBancosParaEditar = function () {
            return $http.get(serviceBase + "GetBancosParaEditar").then(response => {
                var bancos = [];
                angular.forEach(globalSvc.getResponse(response).data, function (value, key) {
                    bancos.push({
                        bancoId: value.bancoId,
                        banco: value.codigo + " - " + value.banco
                    });
                });
                response.data = bancos;
                return response;
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterFormacoesParaEditar = function () {
            return $http.get(serviceBase + "GetFormacoesParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterInstituicoesFormacoesParaEditar = function (textoPesquisa) {
            return $http.get(serviceBase + "GetInstituicoesFormacoesParaEditar", {
                params: {
                    textoPesquisa: textoPesquisa
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterCursosFormacoesParaEditar = function (textoPesquisa) {
            return $http.get(serviceBase + "GetCursosFormacoesParaEditar", {
                params: {
                    textoPesquisa: textoPesquisa
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposDocumentosParaEditar = function () {
            return $http.get(serviceBase + "GetTiposDocumentosParaEditar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterArquivoDownload = function (pessoaDocumentoId, extensaoArquivo) {
            return $http.get(serviceBase + "GetDownloadDocumento", {
                responseType: 'arraybuffer',
                params: {
                    pessoaDocumentoId: pessoaDocumentoId,
                    extensaoArquivo: extensaoArquivo
                }
            })
        }

        this.adicionarPessoaDocumento = function (pessoaDocumentoForm) {
            return $http.post(serviceBase + "PostAdicionarPessoaDocumento", pessoaDocumentoForm).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirPessoaDocumento = function (pessoaDocumentoId) {
            return $http.delete(serviceBase + "DeleteExcluirPessoaDocumento", {
                params: {
                    pessoaDocumentoId: pessoaDocumentoId
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
        this.excluir = function (pessoaId) {
            return $http.delete(serviceBase + "DeleteExcluirPessoa", {
                params: { pessoaId: pessoaId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#endregion

        //#region Aprovar

        //#region Pesquisar

        this.obterMunicipios = function () {
            return $http.get(serviceBase + "GetMunicipios").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterUnidadesEscolares = function (municipioId) {
            return $http.get(serviceBase + "GetUnidadesEscolares", {
                params: {
                    municipioId: municipioId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterSituacoesAprovacao = function () {
            return $http.get(serviceBase + "GetSituacoesAprovacao").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterPessoasGridDados = function (filtro) {
            return $http.get(serviceBase + "GetPessoasGridDados", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Aprovar

        this.obterDadosParaAprovacao = function (pessoaAprovacaoId) {
            return $http.get(serviceBase + "GetDadosParaAprovacao", {
                params: {
                    pessoaAprovacaoId: pessoaAprovacaoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.obterArquivoDownload = function (pessoaDocumentoId) {
            return $http.get(serviceBase + "GetDownloadDocumento", {
                responseType: 'arraybuffer',
                params: {
                    pessoaDocumentoId: pessoaDocumentoId
                }
            })
        }

        this.salvarEditarAprovacao = function (form) {
            return $http.post(serviceBase + "PostSalvarEditarAprovacao", form).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#endregion

    }
]);