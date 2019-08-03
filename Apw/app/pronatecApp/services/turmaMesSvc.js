turmaMesMdl.service('turmaMesSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var urlBase = '/api/Pronatec/TurmaMes/';

        //#region Pesquisar
        this.obterAnoReferenciaParaPesquisar = function () {
            return $http.get(urlBase + 'GetObterAnoReferenciaTurmasParaPesquisar').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterMesesParaPesquisar = function (anoReferencia) {
            return $http.get(urlBase + 'GetObterMesesParaPesquisar', { params: { anoReferencia: anoReferencia } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterProgramasParaPesquisar = function () {
            return $http.get(urlBase + 'GetObterProgramasParaPesquisar').then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterCursosParaPesquisar = function (programaId) {
            return $http.get(urlBase + 'GetObterCursosParaPesquisar', { params: { programaId: programaId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterTurmaMesParaPesquisar = function (dados) {
            return $http.get(urlBase + 'GetObterTurmaMesParaPesquisar', { params: dados }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }
        //#endregion

        //#region Incluir

        this.obterDadosAlunosParaIncluir = function (formObterDados) {
            return $http.get(urlBase + 'GetObterDadosAlunosParaIncluir', { params: formObterDados }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.incluirTurmaMesAluno = function (dadosAluno) {
            return $http.post(urlBase + 'PostIncluirTurmaMesAluno', dadosAluno).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Editar

        this.obterDadosAlunosParaEditar = function (formObterDados) {
            return $http.get(urlBase + 'GetObterDadosAlunosParaEditar', { params: formObterDados }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.editarTurmaMesAluno = function (dadosAluno) {
            return $http.post(urlBase + 'PostEditarTurmaMesAluno', dadosAluno).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

        //#region Visualizar

        this.obterDadosAlunosParaVisualizar = function (turmaMesId) {
            return $http.get(urlBase + 'GetObterDadosAlunosParaVisualizar', { params: { turmaMesId: turmaMesId } }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion
    }
]);