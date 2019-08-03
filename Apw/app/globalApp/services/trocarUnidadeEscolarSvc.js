globalMdl.service('trocarUnidadeEscolarlSvc', ['$http', 'globalSvc', '$filter',
    function ($http, globalSvc, $filter) {

        var serviceBase = '/Api/Gen/';

        this.obterPerfisParaTrocarUnidadeEscolar = function () {
            return $http.get(serviceBase + "GetPerfisParaTrocarUnidadeEscolar").then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.obterMunicipiosParaTrocarUnidadeEscolar = function (perfilId) {
            return $http.get(serviceBase + "GetMunicipiosParaTrocarUnidadeEscolar", {
                params: {
                    perfilId: perfilId
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.obterUnidadesEscolaresParaTrocarUnidadeEscolar = function (perfilId, municipioId) {
            return $http.get(serviceBase + "GetUnidadesEscolaresParaTrocarUnidadeEscolar", {
                params: {
                    perfilId: perfilId,
                    municipioId: municipioId
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.alterarParaTrocarUnidadeEscolar = function (perfilId, municipioId, unidadeEscolarId) {
            return $http.put(serviceBase + "PutAlterarParaTrocarUnidadeEscolar", {}, {
                params: {
                    perfilId: perfilId,
                    municipioId: municipioId,
                    unidadeEscolarId: unidadeEscolarId
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }
    }
]);