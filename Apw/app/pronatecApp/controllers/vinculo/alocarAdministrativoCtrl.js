vinculoMdl.controller('alocarAdministrativoCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService', '$filter',
    function ($scope, service, globalSvc, validationService, $filter) {

        $scope.dados = {};

        $scope.opcoesLogicas = [
            { valor: true },
            { valor: false }
        ];

        $scope.drop = {};

        $scope.obterVinculo = function () {
            $scope.loadTela = service.obterVinculoParaAlocarAdministrativo($scope.$parent.vinculoId).then(function (response) {
                $scope.dados = response.data;
                $scope.dados.atualizarCargaHoraria = false;
                $scope.dados.dataInicioVigencia = globalSvc.converterData($scope.dados.dataInicioVigencia);
                $scope.dados.dataFinalVigencia = globalSvc.converterData($scope.dados.dataFinalVigencia);
                $scope.obterTurnos();
            });
        }

        //#region Alocação

        $scope.obterTurnos = function () {
            $scope.loadTur = service.obterTurnosParaAlocarAdministrativo().then(function (response) {
                $scope.turnos = $filter('filtroRemoverItemAdicionado')(response.data, $scope.dados.alocacoes, 'turnoId');
            });
        }

        $scope.adicionar = function () {

            if (validar()) {

                $scope.dados.alocacoes.push({
                    dataInicioVigencia: $scope.dados.dataInicioVigencia,
                    dataFinalVigencia: $scope.dados.dataFinalVigencia,
                    cargaHoraria: $scope.cargaHoraria,
                    turmaMatrizDisciplinaId: null,
                    turnoId: $scope.turnoId,
                    turno: $scope.drop.turno.selected.turno,
                    horarioEntrada: $scope.horarioEntrada,
                    horarioSaida: $scope.horarioSaida,
                });

                new validationService().resetForm($scope.formAlocacao);

                $scope.turnoId = "";
                $scope.drop.turno.selected = null;
                $scope.cargaHoraria = "";
                $scope.horarioEntrada = "";
                $scope.horarioSaida = "";

                $scope.obterTurnos();
            }
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formAlocacao)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            if (!validarTurno()
                || !validarTurnoValido()
                || !validarCargaHorariaValida()
                //|| !validarCargaHoraria()
                //|| !validarHorarioEntrada()
                //|| !validarHorarioSaida()
                //|| !validarHorarioEntradaSaida()
                //|| !validarChEntradaSaida()
                ) {
                return false;
            }

            return true;
        }

        function validarTurno() {
            if ($scope.turnoId == undefined || $scope.turnoId == null || $scope.turnoId == "" || $scope.turnoId <= 0) {
                globalSvc.mensagemNegativo("Informe um turno válido!");
                return false;
            }
            return true;
        }

        function validarTurnoValido() {
            var res = $filter('filtroPorId')($scope.dados.alocacoes, 'turnoId', $scope.turnoId);
            if (res != undefined && res != null && res.length > 0) {
                globalSvc.mensagemNegativo("Não é possível realizar a alocação! Já existe uma alocação com este turno!");
                return false;
            }
            return true;
        }

        function validarCargaHorariaValida() {

            if (!globalSvc.isNumber($scope.cargaHoraria) || $scope.cargaHoraria <= 0) {
                globalSvc.mensagemNegativo("Informe uma carga horária válida!");
                return false;
            }

            return true;
        }

        function validarCargaHoraria() {

            var chAlocacoes = parseFloat($scope.cargaHoraria);

            for (var i = 0; i < $scope.dados.alocacoes.length; i++) {
                chAlocacoes += parseFloat($scope.dados.alocacoes[i].cargaHoraria);
            }

            if (chAlocacoes > parseFloat($scope.dados.cargaHoraria)) {
                globalSvc.mensagemNegativo("A CH das alocações não podem ser superiores a CH do vínculo!");
                return false;
            }

            return true;
        }

        function validarHorarioEntrada() {
            if (!globalSvc.validarHora($scope.horarioEntrada)) {
                globalSvc.mensagemNegativo("Informe um horário de entrada válido!");
                return false;
            }

            return true;
        }

        function validarHorarioSaida() {
            if (!globalSvc.validarHora($scope.horarioSaida)) {
                globalSvc.mensagemNegativo("Informe um horário de saída válido!");
                return false;
            }

            return true;
        }

        function validarHorarioEntradaSaida() {
            var retorno = true;
            var horarioEntrada = globalSvc.converterDataHoraDeString("01/01/2000 " + $scope.horarioEntrada);
            var horarioSaida = globalSvc.converterDataHoraDeString("01/01/2000 " + $scope.horarioSaida);
            if (!horarioEntrada || !horarioSaida) retorno = false;
            if (horarioEntrada >= horarioSaida) retorno = false;
            if (!retorno) globalSvc.mensagemNegativo("O horário de entrada deve ser anterior ao horário de saída!");
            return retorno;
        }

        function validarChEntradaSaida() {
            var horarioEntrada = globalSvc.converterDataHoraDeString("01/01/2000 " + $scope.horarioEntrada);
            var horarioSaida = globalSvc.converterDataHoraDeString("01/01/2000 " + $scope.horarioSaida);
            var res = globalSvc.calculaDiferencaEntreHoras(horarioEntrada, horarioSaida);
            if (res != $scope.cargaHoraria) {
                globalSvc.mensagemNegativo("A carga horária informada deve ser compatível com o horário de entrada e saída!");
                return false;
            }
            return true;
        }

        $scope.excluir = function (item) {
            var index = $scope.dados.alocacoes.indexOf(item);
            if (index != -1) {
                $scope.dados.alocacoes.splice(index, 1);
                $scope.obterTurnos();
            }
        }

        //#endregion

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (valido) {
                $scope.loadTela = service.alocarAdministrativo($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarVinculosProfissional();
                });
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarVinculosProfissional();
        };

        function init() {
            if ($scope.$parent.vinculoId) {
                $scope.obterVinculo();
            }
            else {
                $scope.$parent.redirecionarVinculosProfissional();
            }
        };

        init();
    }
]);