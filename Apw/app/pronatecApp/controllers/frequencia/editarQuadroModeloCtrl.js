frequenciaMdl.controller('editarQuadroModeloCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.quadroModeloId = $scope.$parent.quadroModeloId;

        //#region Validações de Horário

        //turno -> 1 - Matutino, 2 - Vespertino, 3 - Noturno
        var validaHorarioInicioFim = function (inicio, fim, i, turno) {
            var valido = true;
            var listInicio;
            var listFim;
            
            if ((inicio != "" && fim == "") || (inicio == "" && fim != "")) {
                valido = false;
            }

            if (valido) {
                listInicio = inicio.split(':');
                listFim = fim.split(':');

                if (listInicio[0] > listFim[0]) {
                    valido = false;
                }
                else if (listInicio[0] === listFim[0] && listInicio[1] >= listFim[1]) {
                    valido = false;
                }
            }

            //Formata o horário para modelo 00:00:00
            if (inicio != "" && inicio != undefined && inicio != null) {
                inicio = listInicio[0] + ':' + listInicio[1] + ":00";
            }

            if (fim != "" && fim != undefined && fim != null) {
                fim = listFim[0] + ':' + listFim[1] + ":00";
            }

            //Valida o Horário Mínimo e Máximo de cada turno
            if (valido) {
                if (turno == 1) {
                    if ((inicio != "" && fim != "") && (inicio < $scope.turnosHorarioPermitido.matutinoHorarioMinino || fim > $scope.turnosHorarioPermitido.matutinoHorarioMaximo)) {
                        valido = false;
                    }
                }
                else if (turno == 2) {
                    if ((inicio != "" && fim != "") && (inicio < $scope.turnosHorarioPermitido.vespertinoHorarioMinino || fim > $scope.turnosHorarioPermitido.vespertinoHorarioMaximo)) {
                        valido = false;
                    }
                }
                else {
                    if ((inicio != "" && fim != "") && (inicio < $scope.turnosHorarioPermitido.noturnoHorarioMinino || fim > $scope.turnosHorarioPermitido.noturnoHorarioMaximo)) {
                        valido = false;
                    }
                }
            }

            if (!valido) {
                if (turno == 1)
                    $scope.dados.quadroModelo[i].EntradaSaidaMatutinoInvalido = true;
                else if (turno == 2)
                    $scope.dados.quadroModelo[i].EntradaSaidaVespertinoInvalido = true;
                else if (turno == 3)
                    $scope.dados.quadroModelo[i].EntradaSaidaNoturnoInvalido = true;
            }
            else {
                if (turno == 1)
                    $scope.dados.quadroModelo[i].EntradaSaidaMatutinoInvalido = false;
                else if (turno == 2)
                    $scope.dados.quadroModelo[i].EntradaSaidaVespertinoInvalido = false;
                else if (turno == 3)
                    $scope.dados.quadroModelo[i].EntradaSaidaNoturnoInvalido = false;
            }

            return valido;
        }

        var verificaHorario = function (horario) {
            if (horario == undefined || horario == null) {
                return false;
            }
            return true;
        }

        var validaHorario = function () {
            var horario = $scope.dados.quadroModelo;

            var valido = true;
            var i = 0;
            while (i < horario.length) {
                var validaLinha = true;
                var valMatutino = true; var valVespertino = true; var valNoturno = true;

                //Matutino

                validaLinha = verificaHorario(horario[i].matutinoEntrada);
                if (validaLinha) {
                    validaLinha = verificaHorario(horario[i].matutinoSaida);
                }
                if (validaLinha) {
                    valMatutino = validaHorarioInicioFim(horario[i].matutinoEntrada, horario[i].matutinoSaida, i, 1);
                }

                valido = (valido && validaLinha && valMatutino);


                //Vespertino

                validaLinha = true;
                validaLinha = verificaHorario(horario[i].vespertinoEntrada);
                if (validaLinha) {
                    validaLinha = verificaHorario(horario[i].vespertinoSaida);
                }
                if (validaLinha) {
                    valVespertino = validaHorarioInicioFim(horario[i].vespertinoEntrada, horario[i].vespertinoSaida, i, 2);
                }

                valido = (valido && valVespertino && validaLinha);

                //Noturno
                validaLinha = true;
                validaLinha = verificaHorario(horario[i].noturnoEntrada);
                if (validaLinha) {
                    validaLinha = verificaHorario(horario[i].noturnoSaida);
                }
                if (validaLinha) {
                    valNoturno = validaHorarioInicioFim(horario[i].noturnoEntrada, horario[i].noturnoSaida, i, 3);
                }

                valido = (valido && valNoturno && validaLinha);

                i = i + 1;
            }

            if (!valido) {
                globalSvc.mensagemAviso('Verifique os campos abaixo');
            }
            return valido;
        }

        //#endregion

        //#region Obter Dados
        $scope.obterDadosQuadroModelo = function () {
            $scope.loadObterDados = service.obterDadosQuadroModeloParaEditar($scope.quadroModeloId).then(function (response) {
                $scope.dados = response.data;
            });
        }

        $scope.obterDadosHorariosPermitidos = function () {
            $scope.loadObter = service.obterDadosHorariosPermitidos().then(response => {
                $scope.turnosHorarioPermitido = response.data;
            });
        }
        //#endregion

        //#region Eventos
        $scope.salvar = function () {
            globalSvc.limparMensagens();
            var valido = true;

            if (!validaHorario() || !(new ValidationService().checkFormValidity($scope.formQuadroModelo))) {
                valido = false;
            }

            if (valido) {
                $scope.loadSalvar = service.salvarEditarQuadroModelo($scope.dados).then(function (response) {
                    if (response.data) { $scope.redirecionarPesquisarQuadroModelo() }
                })
            }

        }
        //#endregion

        $scope.init = function () {
            if ($scope.quadroModeloId == undefined || $scope.quadroModeloId == null) { $scope.redirecionarPesquisarQuadroModelo(); }

            $scope.obterDadosQuadroModelo();
            $scope.obterDadosHorariosPermitidos();
        }

        $scope.init();

    }
]);