atualizacaoCadastralMdl.service('atualizacaoCadastralSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/atualizacaoCadastral/';

        //#region ABA Dados Pessoais

        this.obterDados = function () {
            return $http.get(serviceBase + "GetDados").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterNacionalidades = function () {
            return $http.get(serviceBase + "GetNacionalidades").then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.obterUfsNascimento = function () {
            return $http.get(serviceBase + "GetUfsNascimento").then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.obterMunicipiosNascimento = function (ufNascimento) {
            return $http.get(serviceBase + "GetMunicipiosNascimento", {
                params: {
                    ufNascimento: ufNascimento
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterEstadosCivis = function () {
            return $http.get(serviceBase + "GetEstadosCivis").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterRacasCor = function () {
            return $http.get(serviceBase + "GetRacasCor").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUfsCtps = function () {
            return $http.get(serviceBase + "GetUfsCtps").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposDocumentosIdentificacao = function () {
            return $http.get(serviceBase + "GetTiposDocumentosIdentificacao").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterOrgaosExpedicaoDocumentoIdentificacao = function () {
            return $http.get(serviceBase + "GetOrgaosExpedicaoDocumentoIdentificacao").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterUfsExpedicaoDocumentoIdentificacao = function () {
            return $http.get(serviceBase + "GetUfsExpedicaoDocumentoIdentificacao").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarAbaDadosPessoais = function (dados) {
            return $http.put(serviceBase + "PutSalvarAbaDadosPessoais", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region ABA Dados Pessoais

        this.obterUfsEndereco = function () {
            return $http.get(serviceBase + "GetUfsEndereco").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMunicipiosEndereco = function (uf) {
            return $http.get(serviceBase + "GetMunicipiosEndereco", {
                params: {
                    uf: uf
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.salvarAbaDadosResidenciais = function (dados) {
            return $http.put(serviceBase + "PutSalvarAbaDadosResidenciais", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region ABA Dados Bancarios

        this.obterTiposContas = function () {
            return $http.get(serviceBase + "GetTiposContas").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterBancos = function () {
            return $http.get(serviceBase + "GetBancos").then(response => {
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

        this.salvarAbaDadosBancarios = function (dados) {
            return $http.put(serviceBase + "PutSalvarAbaDadosBancarios", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region ABA Dados Academicos

        this.obterFormacoes = function () {
            return $http.get(serviceBase + "GetFormacoes").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterInstituicoesFormacoes = function (textoPesquisa) {
            return $http.get(serviceBase + "GetInstituicoesFormacoes", {
                params: {
                    textoPesquisa: textoPesquisa
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterCursosFormacoes = function (textoPesquisa) {
            return $http.get(serviceBase + "GetCursosFormacoes", {
                params: {
                    textoPesquisa: textoPesquisa
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.adcionarFormacao = function (formacao) {
            return $http.post(serviceBase + "postAdicionarFormacao", formacao).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirFormacao = function (pessoaFormacaoId) {
            return $http.delete(serviceBase + "deleteExcluirFormacao", {
                params: {
                    pessoaFormacaoId: pessoaFormacaoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        
        //#endregion

        //#region ABA Dados Profissionais

        this.adcionarProfissao = function (profissao) {
            return $http.post(serviceBase + "postAdicionarProfissao", profissao).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirProfissao = function (pessoaProfissaoId) {
            return $http.delete(serviceBase + "deleteExcluirProfissao", {
                params: {
                    pessoaProfissaoId: pessoaProfissaoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region ABA Vinculo Trabalho

        this.obterRegimesPrevidenciarios = function () {
            return $http.get(serviceBase + "GetRegimesPrevidenciarios").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposContratosTrabalho = function () {
            return $http.get(serviceBase + "GetTiposContratosTrabalho").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTiposSalarios = function () {
            return $http.get(serviceBase + "GetTiposSalarios").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.adcionarTrabalho = function (trabalho) {
            return $http.post(serviceBase + "postAdicionarTrabalho", trabalho).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirTrabalho = function (pessoaTrabalhoId) {
            return $http.delete(serviceBase + "deleteExcluirTrabalho", {
                params: {
                    pessoaTrabalhoId: pessoaTrabalhoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region ABA Upload Documentos

        this.obterPessoaDocumentos = function (pessoaId) {
            return $http.get(serviceBase + "GetPessoaDocumentos", {
                params: {
                    pessoaId : pessoaId
                }
            }).then(response => {
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

        this.adicionarDocumento = function (pessoaDocumentoForm) {
            return $http.post(serviceBase + "PostAdicionarDocumento", pessoaDocumentoForm).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.excluirDocumento = function (pessoaDocumentoId) {
            return $http.delete(serviceBase + "DeleteExcluirDocumento", {
                params: {
                    pessoaDocumentoId: pessoaDocumentoId
                }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
        
        //#region ABA Termo de Compromisso

        this.finalizar = function (dados) {
            return $http.put(serviceBase + "PutFinalizar", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

    }
]);