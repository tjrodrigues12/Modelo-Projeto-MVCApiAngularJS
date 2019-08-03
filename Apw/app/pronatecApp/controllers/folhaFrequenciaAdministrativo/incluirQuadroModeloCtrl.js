folhaFrequenciaAdministrativoMdl.controller('incluirQuadroModeloCtrl', ['$scope', 'folhaFrequenciaAdministrativoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.diaSemana =
        [
            { descricao: 'Segunda', matutinoEntrada: "", matutinoSaida: "", vespertinoEntrada: "", vespertinoSaida: "", noturnoEntrada: "", noturnoSaida: "", diaSemanaId: 1, inicioFimMatutinoInvalido: false, inicioFimVespertinoInvalido: false, inicioFimNoturnoInvalido: false },
            { descricao: 'Terça', matutinoEntrada: "", matutinoSaida: "", vespertinoEntrada: "", vespertinoSaida: "", noturnoEntrada: "", noturnoSaida: "", diaSemanaId: 2, inicioFimMatutinoInvalido: false, inicioFimVespertinoInvalido: false, inicioFimNoturnoInvalido: false },
            { descricao: 'Quarta', matutinoEntrada: "", matutinoSaida: "", vespertinoEntrada: "", vespertinoSaida: "", noturnoEntrada: "", noturnoSaida: "", diaSemanaId: 3, inicioFimMatutinoInvalido: false, inicioFimVespertinoInvalido: false, inicioFimNoturnoInvalido: false },
            { descricao: 'Quinta', matutinoEntrada: "", matutinoSaida: "", vespertinoEntrada: "", vespertinoSaida: "", noturnoEntrada: "", noturnoSaida: "", diaSemanaId: 4, inicioFimMatutinoInvalido: false, inicioFimVespertinoInvalido: false, inicioFimNoturnoInvalido: false },
            { descricao: 'Sexta', matutinoEntrada: "", matutinoSaida: "", vespertinoEntrada: "", vespertinoSaida: "", noturnoEntrada: "", noturnoSaida: "", diaSemanaId: 5, inicioFimMatutinoInvalido: false, inicioFimVespertinoInvalido: false, inicioFimNoturnoInvalido: false },
        ];

        

        //#region Validações de Horário

        //turno -> 1 - Matutino, 2 - Vespertino, 3 - Noturno
        var validaHorarioInicioFim = function (inicio, fim, i, turno) {

            var valido = true;
            if ((inicio != "" && fim == "") || (inicio == "" && fim != "")) {
                valido = false;
            }

            if (valido) {
                var listInicio = inicio.split(':');
                var listFim = fim.split(':');

                if (listInicio[0] > listFim[0]) {                
                    valido =  false;
                }
                else if (listInicio[0] === listFim[0] && listInicio[1] >= listFim[1]) {
                    valido = false;
                }
            }

            if (!valido) {
                if (turno == 1)
                    $scope.diaSemana[i].inicioFimMatutinoInvalido = true;
                else if(turno == 2)
                    $scope.diaSemana[i].inicioFimVespertinoInvalido = true;
                else if (turno == 3)
                    $scope.diaSemana[i].inicioFimNoturnoInvalido = true;
            }
            else {
                if (turno == 1)
                    $scope.diaSemana[i].inicioFimMatutinoInvalido = false;
                else if (turno == 2)
                    $scope.diaSemana[i].inicioFimVespertinoInvalido = false;
                else if (turno == 3)
                    $scope.diaSemana[i].inicioFimNoturnoInvalido = false;
            }
            return valido;
        }

        var verificaHorario = function (horario) {
            if(horario == undefined || horario == null){                
                return false;
            }
            return true;
        }

        var validaHorario = function () {
            var horario = $scope.diaSemana;
            var valido = true;
            var i = 0;

            while (valido && i < 5) {
                //Valida se os horários estão preenchidos com vazio "" ou com a data, do contrário mostra erro
                if (valido) {
                    valido = verificaHorario(horario[i].matutinoEntrada);
                }
                if (valido) {
                    valido = verificaHorario(horario[i].matutinoSaida);
                }
                if (valido) {
                    valido = verificaHorario(horario[i].vespertinoEntrada);
                }
                if (valido) {
                    valido = verificaHorario(horario[i].vespertinoSaida);
                }
                if (valido) {
                    valido = verificaHorario(horario[i].noturnoEntrada);
                }
                if (valido) {
                    valido = verificaHorario(horario[i].noturnoSaida);
                }

                //Valida se o não foi informado um horário de inicio do turno maior que o final
                if (valido) {
                    valido = validaHorarioInicioFim(horario[i].matutinoEntrada, horario[i].matutinoSaida, i, 1);
                }
                if (valido) {
                    valido = validaHorarioInicioFim(horario[i].vespertinoEntrada, horario[i].vespertinoSaida, i, 2);
                }
                if (valido) {
                    valido = validaHorarioInicioFim(horario[i].noturnoEntrada, horario[i].noturnoSaida, i, 3);
                }

                i = i + 1;
            }

            return valido;
        }    
        
        //#endregion

        //#region Eventos
        $scope.voltar = function () {
            $scope.redirecionarPesquisarQuadroModelo();
        }

        $scope.cadastrar = function () {
            if (!validaHorario() || !(new ValidationService()).checkFormValidity($scope.formQuadroModelo)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }
            else {
                var dadosIncluir = {
                    descricao: $scope.descricao,
                    listaDias: $scope.diaSemana
                }

                $scope.loadSalvar = service.incluirQuadroModelo(dadosIncluir).then(function (response) {
                    if (response.data) {
                        $scope.redirecionarPesquisarQuadroModelo();
                    }
                });
            }
        }
        //#endregion

        $scope.init = function () {

        }

        $scope.init();

    }
]);