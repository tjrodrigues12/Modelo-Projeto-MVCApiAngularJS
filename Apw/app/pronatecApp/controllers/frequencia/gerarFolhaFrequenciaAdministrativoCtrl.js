frequenciaMdl.controller('gerarFolhaFrequenciaAdministrativoCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.dadosPessoa = $scope.$parent.dadosPessoa;

        //#region Obter Dados

        $scope.obterQuadroModelo = function () {
            $scope.loadQuadroModelo = service.obterQuadroModeloParaIncluirFrequencia($scope.dadosPessoa.vinculoId).then(function (response) {
                $scope.filtro.listaQuadroModelo = response.data;
            });
        }

        $scope.obterDadosQuadroModeloDias = function () {
            $scope.loadQuadroModeloDias = service.obterQuadroModeloGerarFrequencia($scope.dados.quadroModeloId).then(function (response) {
                $scope.dadosQuadro = response.data;
            });
        }

        $scope.obterDadosHorariosPermitidos = function () {
            $scope.loadObter = service.obterDadosHorariosPermitidos().then(response => {
                $scope.turnosHorarioPermitido = response.data;
            });
        }

        $scope.obterQuantidadeAlunos = function () {
            var dadosPesquisarQuantidadeAlunos = { vinculoId: $scope.dadosPessoa.vinculoId, anoReferencia: $scope.dadosPessoa.anoReferencia, mesId: $scope.dadosPessoa.mesId }
            $scope.loadQuantidadeAlunos = service.obterQuantidadeAlunos(dadosPesquisarQuantidadeAlunos).then(response => {
                $scope.dadosPessoa.quantidadeAlunos = response.data;
            });
        }

        //#endregion

        //#region Validações de Horário

        //turno -> 1 - Matutino, 2 - Vespertino, 3 - Noturno
        var validaHorarioInicioFim = function (inicio, fim, i, turno, modoValidacao) {
            var listInicio;
            var listFim
            var valido = true;

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

            //#region validacao Edicao Quadro Modelo
            if (modoValidacao) {
                if (!valido) {
                    if (turno == 1)
                        $scope.dadosQuadro[i].EntradaSaidaMatutinoInvalido = true;
                    else if (turno == 2)
                        $scope.dadosQuadro[i].EntradaSaidaVespertinoInvalido = true;
                    else if (turno == 3)
                        $scope.dadosQuadro[i].EntradaSaidaNoturnoInvalido = true;
                }
                else {
                    if (turno == 1)
                        $scope.dadosQuadro[i].EntradaSaidaMatutinoInvalido = false;
                    else if (turno == 2)
                        $scope.dadosQuadro[i].EntradaSaidaVespertinoInvalido = false;
                    else if (turno == 3)
                        $scope.dadosQuadro[i].EntradaSaidaNoturnoInvalido = false;
                }
            }
            //#endregion

            //#region validacao Edicao Folha de Frequencia Gerada através do quadro modelo
            else {
                if (!valido) {
                    if (turno == 1)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaMatutinoInvalido = true;
                    else if (turno == 2)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaVespertinoInvalido = true;
                    else if (turno == 3)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaNoturnoInvalido = true;
                }
                else {
                    if (turno == 1)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaMatutinoInvalido = false;
                    else if (turno == 2)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaVespertinoInvalido = false;
                    else if (turno == 3)
                        $scope.dadosMontarFolha.folha[i].EntradaSaidaNoturnoInvalido = false;
                }
            }
            //#endregion

            return valido;
        }

        var verificaHorario = function (horario) {
            if (horario == undefined || horario == null) {
                return false;
            }
            return true;
        }

        //modoValidao | true -> valida edição do Quadro Modelo | false -> valida edição da Folha de Frequencia
        var validaHorario = function (modoValidacao) {
            var horario;
            if (modoValidacao) {
                horario = $scope.dadosQuadro;
            }
            else {
                horario = $scope.dadosMontarFolha.folha;
            }
            
            var valido = true;
            var i = 0;

            //#region Quadro Modelo
            if (modoValidacao) {
                while (i < 5) {
                    var validaLinha = true;
                    var valMatutino = true; var valVespertino = true; var valNoturno = true;
                    //Valida se os horários estão preenchidos com vazio "" ou com a data, do contrário mostra erro

                    //Matutino
                    validaLinha = verificaHorario(horario[i].matutinoEntrada);
                    if (validaLinha) {
                        validaLinha = verificaHorario(horario[i].matutinoSaida);
                    }
                    if (validaLinha) {
                        valMatutino = validaHorarioInicioFim(horario[i].matutinoEntrada, horario[i].matutinoSaida, i, 1, modoValidacao);
                    }

                    valido = (valido && validaLinha && valMatutino);


                    //Vespertino
                    validaLinha = true;
                    validaLinha = verificaHorario(horario[i].vespertinoEntrada);
                    if (validaLinha) {
                        validaLinha = verificaHorario(horario[i].vespertinoSaida);
                    }
                    if (validaLinha) {
                        valVespertino = validaHorarioInicioFim(horario[i].vespertinoEntrada, horario[i].vespertinoSaida, i, 2, modoValidacao);
                    }

                    valido = (valido && valVespertino && validaLinha);

                    //Noturno
                    validaLinha = true;
                    validaLinha = verificaHorario(horario[i].noturnoEntrada);
                    if (validaLinha) {
                        validaLinha = verificaHorario(horario[i].noturnoSaida);
                    }
                    if (validaLinha) {
                        valNoturno = validaHorarioInicioFim(horario[i].noturnoEntrada, horario[i].noturnoSaida, i, 3, modoValidacao);
                    }

                    valido = (valido && valNoturno && validaLinha);

                    i = i + 1;
                }
            }
            //#endregion

            //#region Edição da Folha de Frequência gerada através do quadro modelo
            else {
                while (i < horario.length) {
                    if (horario[i].diaLetivo) {
                        var validaLinha = true;
                        var valMatutino = true; var valVespertino = true; var valNoturno = true;
                        //Valida se os horários estão preenchidos com vazio "" ou com a data, do contrário mostra erro

                        //Matutino
                        if ($scope.dadosMontarFolha.turnos.turnoMatutino) {
                            validaLinha = verificaHorario(horario[i].matutinoEntrada);
                            if (validaLinha) {
                                validaLinha = verificaHorario(horario[i].matutinoSaida);
                            }
                            if (validaLinha) {
                                valMatutino = validaHorarioInicioFim(horario[i].matutinoEntrada, horario[i].matutinoSaida, i, 1, modoValidacao);
                            }

                            valido = (valido && validaLinha && valMatutino);
                        }

                        //Vespertino
                        if ($scope.dadosMontarFolha.turnos.turnoVespertino) {

                            validaLinha = true;
                            validaLinha = verificaHorario(horario[i].vespertinoEntrada);
                            if (validaLinha) {
                                validaLinha = verificaHorario(horario[i].vespertinoSaida);
                            }
                            if (validaLinha) {
                                valVespertino = validaHorarioInicioFim(horario[i].vespertinoEntrada, horario[i].vespertinoSaida, i, 2, modoValidacao);
                            }

                            valido = (valido && valVespertino && validaLinha);
                        }

                        //Noturno
                        if ($scope.dadosMontarFolha.turnos.turnoNoturno) {
                            validaLinha = true;
                            validaLinha = verificaHorario(horario[i].noturnoEntrada);
                            if (validaLinha) {
                                validaLinha = verificaHorario(horario[i].noturnoSaida);
                            }
                            if (validaLinha) {
                                valNoturno = validaHorarioInicioFim(horario[i].noturnoEntrada, horario[i].noturnoSaida, i, 3, modoValidacao);
                            }

                            valido = (valido && valNoturno && validaLinha);
                        }
                    }

                    i = i + 1;
                }
            }

            //#endregion

            if (!valido) {
                globalSvc.mensagemAviso('Verifique os campos abaixo');
            }
            return valido;
        }

        //#endregion

        //#region Eventos
        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }

        $scope.editarQuadro = function () {
            $scope.edicao = true;
        }

        $scope.salvarQuadro = function () {            
            if (validaHorario(true)) {                

                var dadosEdicaoQuadro = {
                    descricao: 'Quadro Modelo Personalizado - ' + $scope.dadosPessoa.nomeCompleto,
                    vinculoId: $scope.dadosPessoa.vinculoId,
                    listaDias: $scope.dadosQuadro
                }

                $scope.loadSalvarEditar = service.salvarQuadroModeloPersonalizado(dadosEdicaoQuadro).then(function (response) {

                    if (response.data > 0) {
                        $scope.edicao = false;
                        if ($scope.dados.quadroModeloId != response.data) {
                            $scope.obterQuadroModelo();
                            $scope.dados.quadroModeloId = response.data;
                        }

                        $scope.obterDadosQuadroModeloDias();
                    }
                });
            }           
        }

        $scope.cancelarEdicao = function () {
            $scope.edicao = false;
            $scope.obterDadosQuadroModeloDias();
        }

        $scope.montarFolha = function () {           

            var dadosMontarFolha = { mesId: $scope.dadosPessoa.mesId, anoReferencia: $scope.dadosPessoa.anoReferencia, vinculoId: $scope.dadosPessoa.vinculoId, quadroModeloId: $scope.dados.quadroModeloId };

            $scope.loadMontarFrequecia = service.obterDadosMontarFolha(dadosMontarFolha).then(function (response) {
                if (response.data != undefined && response.data != null) {
                    $scope.montarFrequencia = true;
                    $scope.dadosMontarFolha = response.data;
                }
            });
        }

        $scope.gerarFolha = function () {
            if (validaHorario(false)) {
                //funcao para salvar dados
                var dadosFrequencia = {
                    frequencia: $scope.dadosMontarFolha.folha,
                    mesId: $scope.dadosPessoa.mesId,
                    anoReferencia: $scope.dadosPessoa.anoReferencia,
                    vinculoId: $scope.dadosPessoa.vinculoId
                }

                $scope.loadGerarFolha = service.incluirGerarFrequenciaAdministrativo(dadosFrequencia).then(function (response) {
                    if (response.data) { $scope.redirecionarPesquisar(); }
                });
            }
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dadosPessoa == undefined || $scope.dadosPessoa == null) { $scope.redirecionarPesquisar(); }

            $scope.edicao = false;
            $scope.montarFrequencia = false;
            $scope.filtro = {};
            $scope.dados = {};
            $scope.obterQuadroModelo();
            $scope.obterDadosHorariosPermitidos();
            $scope.obterQuantidadeAlunos();
        }

        $scope.init();
    }
]);