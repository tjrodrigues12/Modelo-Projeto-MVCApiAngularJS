relatorioMdl.service('relatorioSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/Relatorio/';

        //#region Pesquisar

        this.obterVinculosGridDados = function (filtro) {
            return $http.get(serviceBase + "GetVinculosGridDados", {
                params: filtro
            }).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        this.gerarRelatorio = function (mes, ano, vinculoId) {
            return $http.get(serviceBase + "GerarRelatorio", {
                params: {
                    mes: mes,
                    ano: ano,
                    vinculoId: vinculoId
                },
                responseType: 'arraybuffer'
            })
        }

        //#endregion
    }
]);