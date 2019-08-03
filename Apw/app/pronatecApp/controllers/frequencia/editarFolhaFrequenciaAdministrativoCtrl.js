frequenciaMdl.controller('editarFolhaFrequenciaAdministrativoCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'Upload',
    function ($scope, service, globalSvc, Upload) {

        $scope.dadosPessoa = $scope.$parent.dadosPessoa;

        //#region Obter Dados
        $scope.obterDadosFrequencia = function () {
            $scope.loadFrequencia = service.obterFrequenciaAdministrativoParaEditar($scope.dadosPessoa.folhaFrequenciaId).then(function (response) {
                $scope.dadosMontarFolha = response.data;
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
        var validaHorarioInicioFim = function (inicio, fim, i, turno) {
            var listInicio;
            var listFim;
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

            return valido;
        }

        var verificaHorario = function (horario) {
            if (horario == undefined || horario == null) {
                return false;
            }
            return true;
        }

        var validaHorario = function () {
            var horario = $scope.dadosMontarFolha.folha;

            var valido = true;
            var i = 0;
            while (i < horario.length) {
                if (horario[i].diaLetivo) {
                    var validaLinha = true;
                    var valMatutino = true; var valVespertino = true; var valNoturno = true;

                    //Matutino
                    if ($scope.dadosMontarFolha.turnos.turnoMatutino) {
                        validaLinha = verificaHorario(horario[i].matutinoEntrada);
                        if (validaLinha) {
                            validaLinha = verificaHorario(horario[i].matutinoSaida);
                        }
                        if (validaLinha) {
                            valMatutino = validaHorarioInicioFim(horario[i].matutinoEntrada, horario[i].matutinoSaida, i, 1);
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
                            valVespertino = validaHorarioInicioFim(horario[i].vespertinoEntrada, horario[i].vespertinoSaida, i, 2);
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
                            valNoturno = validaHorarioInicioFim(horario[i].noturnoEntrada, horario[i].noturnoSaida, i, 3);
                        }

                        valido = (valido && valNoturno && validaLinha);
                    }
                }

                i = i + 1;
            }

            if (!valido) {
                globalSvc.mensagemAviso('Verifique os campos abaixo');
            }
            return valido;
        }

        //#endregion

        //#region Metodos

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            return $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        //#endregion
        
        //#region Eventos
        $scope.salvar = function () {
            if (validaHorario()) {
                var frequencia = { frequencia: $scope.dadosMontarFolha.folha, folhaFrequenciaId: $scope.dadosPessoa.folhaFrequenciaId, vinculoId: $scope.dadosPessoa.vinculoId };

                $scope.loadSalvar = service.salvarEditarFolhaFrequencia(frequencia).then(function (response) {
                    if (response.data) { $scope.redirecionarPesquisar(); }
                });
            }
        }

        $scope.downloadFolha = function () {
            $scope.loadDownload = service.downloadFolhaAssinada($scope.dadosPessoa.arquivoId).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + $scope.dadosPessoa.arquivoId + '' + $scope.dadosPessoa.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        $scope.upload = function (file) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.uploadArquivo = {
                        folhaFrequenciaId: $scope.dadosPessoa.folhaFrequenciaId
                    };

                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/Frequencia/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        $scope.uploadArquivo.arquivoUpload = response.data;
                        $scope.uploadArquivo.extensaoArquivo = extensaoArquivo;

                        $scope.loadSalvarArquivo = service.salvarArquivo($scope.uploadArquivo).then(function (response) {
                            if (response.data != null && response.data != undefined) {
                                $scope.dadosPessoa.arquivoId = response.data.arquivoId;
                                $scope.dadosPessoa.extensao = response.data.extensaoArquivo;
                            }
                        });

                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                $scope.uploadArquivo = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" ") + " são aceitos");
            }
        };

        $scope.confirmarExcluir = function () {
            $scope.loadExcluir = service.excluirArquivoFrequenciaAssinada($scope.dadosPessoa.folhaFrequenciaId).then(function (response) {
                if (response.data) {
                    $scope.dadosPessoa.arquivoId = 0;
                    $scope.dadosPessoa.extensao = '';
                }
            });
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dadosPessoa == null || $scope.dadosPessoa == undefined) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosFrequencia();
            $scope.obterDadosHorariosPermitidos();
            $scope.obterQuantidadeAlunos();
            $scope.extensoesPermitidas = [".pdf", ".jpg"];
        }

        $scope.init();

    }
]);