quadroModeloHorarioPermitidoMdl.controller('pesquisarCtrl', ['$scope', 'quadroModeloHorarioPermitidoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        //#region Obter Dados

        $scope.obterDadosHorariosPermitidos = function () {
            $scope.loadObter = service.obterDadosHorariosPermitidosParaPesquisar().then(response => {
                $scope.dados = response.data;
            });
        }

        //#endregion

        //#region Validações de Horário

        //turno -> 1 - Matutino, 2 - Vespertino, 3 - Noturno
        var validaHorarioInicioFim = function (inicio, fim, turno) {

            var valido = true;
            if ((inicio != "" && fim == "") || (inicio == "" && fim != "")) {
                valido = false;
            }

            if (valido) {
                var listInicio = inicio.split(':');
                var listFim = fim.split(':');

                if (listInicio[0] > listFim[0]) {
                    valido = false;
                }
                else if (listInicio[0] === listFim[0] && listInicio[1] >= listFim[1]) {
                    valido = false;
                }
            }

            if (!valido) {
                if (turno == 1)
                    $scope.dados.matutinoInvalido = true;
                else if (turno == 2)
                    $scope.dados.vespertinoInvalido = true;
                else if (turno == 3)
                    $scope.dados.noturnoInvalido = true;
            }
            else {
                if (turno == 1)
                    $scope.dados.matutinoInvalido = false;
                else if (turno == 2)
                    $scope.dados.vespertinoInvalido = false;
                else if (turno == 3)
                    $scope.dados.noturnoInvalido = false;
            }
            return valido;
        }

        var verificaHorario = function (horario) {
            if (horario == undefined || horario == null || horario == "") {
                return false;
            }
            return true;
        }

        var validaHorario = function () {
            var valido = true;

            //Valida se os horários estão preenchidos com vazio "" ou com a data, do contrário mostra erro
            if (valido) {
                valido = verificaHorario($scope.dados.matutinoHorarioMinino);
            }
            if (valido) {
                valido = verificaHorario($scope.dados.matutinoHorarioMaximo);
            }
            if (valido) {
                valido = verificaHorario($scope.dados.vespertinoHorarioMinino);
            }
            if (valido) {
                valido = verificaHorario($scope.dados.vespertinoHorarioMaximo);
            }
            if (valido) {
                valido = verificaHorario($scope.dados.noturnoHorarioMinino);
            }
            if (valido) {
                valido = verificaHorario($scope.dados.noturnoHorarioMaximo);
            }

            //Valida se o não foi informado um horário de inicio do turno maior que o final
            if (valido) {
                valido = validaHorarioInicioFim($scope.dados.matutinoHorarioMinino, $scope.dados.matutinoHorarioMaximo, 1);
                valido = validaHorarioInicioFim($scope.dados.vespertinoHorarioMinino, $scope.dados.vespertinoHorarioMaximo, 2) && valido;
                valido = validaHorarioInicioFim($scope.dados.noturnoHorarioMinino, $scope.dados.noturnoHorarioMaximo, 3) && valido;
            }

            return valido;
        }

        //#endregion

        //#region Eventos

        $scope.editar = function () {
            $scope.edicao = true;
        }

        $scope.cancelar = function () {
            $scope.edicao = false;
            $scope.obterDadosHorariosPermitidos();
        }

        $scope.salvar = function () {
            globalSvc.limparMensagens();
            if (!validaHorario()) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }
            else {
                $scope.loadSalvar = service.salvarEditarHorarioTurnoPermitido($scope.dados).then(response => {
                    if (response.data) {
                        $scope.edicao = false;
                    }                    
                });                
            }            
        }

        //#endregion

        $scope.init = function () {
            $scope.obterDadosHorariosPermitidos();
            $scope.edicao = false;
        }

        $scope.init();

    }
]);