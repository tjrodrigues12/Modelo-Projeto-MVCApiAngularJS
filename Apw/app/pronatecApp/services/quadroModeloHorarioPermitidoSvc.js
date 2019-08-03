quadroModeloHorarioPermitidoMdl.service('quadroModeloHorarioPermitidoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/api/Pronatec/QuadroModeloHorarioPermitido/';

        //#region Pesquisar

        this.obterDadosHorariosPermitidosParaPesquisar = function () {
            return $http.get(serviceBase + "GetObterDadosHorariosPermitidosParaPesquisar").then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        //#endregion

        //#region Editar

        this.salvarEditarHorarioTurnoPermitido = function (dados) {
            return $http.post(serviceBase + "PostSalvarEditarHorarioTurnoPermitido", dados).then(response => {
                return globalSvc.getResponse(response);
            }, response => {
                globalSvc.extrairMensagens(response);
            });
        }

        //#endregion

    }
]);