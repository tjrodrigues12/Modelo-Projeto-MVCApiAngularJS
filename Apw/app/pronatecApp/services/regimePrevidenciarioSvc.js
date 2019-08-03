regimePrevidenciarioMdl.service('regimePrevidenciarioSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {
        
        var serviceBase = '/api/Pronatec/RegimePrevidenciario/';

        this.obterDadosRegimePrevidenciarioGrid = function (filtro) {
            return $http.get(serviceBase + "GetDadosRegimePrevidenciario", { params: filtro }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        this.obterDadosRegimePrevidenciarioParaEditar = function (regimePrevidenciarioId) {
            return $http.get(serviceBase + "GetDadosRegimePrevidenciarioEditar", { params: { regimePrevidenciarioId: regimePrevidenciarioId } }).then(response => {
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

        this.excluir = function (regimePrevidenciarioId) {
            return $http.delete(serviceBase + "DeleteRegimePrevidenciario", {
                params: { regimePrevidenciarioId: regimePrevidenciarioId }
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

    }
]);