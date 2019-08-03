vinculoMdl.controller('editarCtrl', ['$scope', 'vinculoSvc', '$filter', 'globalSvc', 'ValidationService',
    function ($scope, service, $filter, globalSvc, validationService) {

        $scope.dados = {};

        $scope.obterVinculo = function () {
            $scope.loadTela = service.obterVinculoParaEditar($scope.$parent.vinculoId).then(function (response) {
                $scope.dados = response.data;
                $scope.dados.dataInicioVigencia = globalSvc.converterData($scope.dados.dataInicioVigencia);
                $scope.dados.dataFinalVigencia = globalSvc.converterData($scope.dados.dataFinalVigencia);
                $scope.obterAnosReferencias($scope.dados.anoReferencia);
                $scope.obterProgramas($scope.dados.programaId);
                $scope.obterProgramasCargos($scope.dados.programaCargoId);
            });
        }

        $scope.obterAnosReferencias = function (anoReferencia) {
            $scope.loadAr = service.obterAnosReferenciasParaEditar().then(function (response) {
                $scope.anosReferencias = response.data;
            });

            if (anoReferencia != undefined && anoReferencia != null && anoReferencia > 0) {
                $scope.dados.anoReferencia = anoReferencia;
            }
            else $scope.dados.anoReferencia = "";
        }

        $scope.obterProgramas = function (programaId) {
            $scope.loadProg = service.obterProgramasParaEditar().then(function (response) {
                $scope.programas = response.data;
            });

            if (programaId != undefined && programaId != null && programaId > 0) {
                $scope.dados.programaId = programaId;
            }
            else $scope.dados.programaId = "";
        }

        $scope.obterProgramasCargos = function (programaCargoId) {
            $scope.loadPcr = service.obterProgramasCargosParaEditar($scope.dados.programaId).then(function (response) {
                $scope.programasCargos = response.data;
            });

            if (programaCargoId != undefined && programaCargoId != null && programaCargoId > 0) {
                $scope.dados.programaCargoId = programaCargoId;
            }
            else $scope.dados.programaCargoId = "";
        }

        $scope.salvar = function () {

            if (validar()) {

                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formVinculo)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            if (!validarAnoReferencia()
                || !validarPrograma()
                || !validarProgramaCargo()
                || !validarInicioVigencia()
                || !validarFinalVigencia()
                || !validarVigencia()
                //|| !validarCargaHoraria()
                //|| !validarChAlocacoes()
                ) {
                return false;
            }

            return true;
        }

        function validarAnoReferencia() {

            if ($scope.dados.anoReferencia == undefined || $scope.dados.anoReferencia == null || $scope.dados.anoReferencia == "" || $scope.dados.anoReferencia <= 0) {
                globalSvc.mensagemNegativo("Informe um ano de referência válido!");
                return false;
            }

            return true;
        }

        function validarPrograma() {

            if ($scope.dados.programaId == undefined || $scope.dados.programaId == null || $scope.dados.programaId == "" || $scope.dados.programaId <= 0) {
                globalSvc.mensagemNegativo("Informe um programa válido!");
                return false;
            }

            return true;
        }

        function validarProgramaCargo() {

            if ($scope.dados.programaCargoId == undefined || $scope.dados.programaCargoId == null || $scope.dados.programaCargoId == "" || $scope.dados.programaCargoId <= 0) {
                globalSvc.mensagemNegativo("Informe um cargo válido!");
                return false;
            }

            return true;
        }

        function validarInicioVigencia() {

            var data = globalSvc.converterDataHoraParaString($scope.dados.dataInicioVigencia);

            if (!globalSvc.validarData(data)) {
                globalSvc.mensagemNegativo("Informe uma data de início da vigência válida!");
                return false;
            }

            return true;
        }

        function validarFinalVigencia() {

            var data = globalSvc.converterDataHoraParaString($scope.dados.dataFinalVigencia);

            if (!globalSvc.validarData(data)) {
                globalSvc.mensagemNegativo("Informe uma data de término da vigência válida!");
                return false;
            }

            return true;
        }

        function validarVigencia() {

            if ($scope.dados.dataInicioVigencia >= $scope.dados.dataFinalVigencia) {
                globalSvc.mensagemNegativo("A data de início da vigência deve ser anterior a data do final da vigência!");
                return false;
            }

            return true;
        }

        function validarCargaHoraria() {
            if ($scope.dados.cargaHoraria == undefined || $scope.dados.cargaHoraria == null || $scope.dados.cargaHoraria == "" || $scope.dados.cargaHoraria <= 0) {
                globalSvc.mensagemNegativo("Informe uma carga horária válida!");
                return false;
            }
            return true;
        }

        function validarChAlocacoes() {

            var chAlocacoes = 0;

            for (var i = 0; i < $scope.dados.alocacoes.length; i++) {
                chAlocacoes += parseFloat($scope.dados.alocacoes[i].cargaHoraria);
            }

            if (chAlocacoes > parseFloat($scope.dados.cargaHoraria)) {
                var msg = "A carga horária do vínculo não pode ser inferior ";

                if ($scope.dados.alocacoes.length == 1) msg += "a carga horária da alocação!";
                else msg += "a soma das cargas horárias das alocações!";

                globalSvc.mensagemNegativo(msg);

                return false;
            }

            return true;
        }

        $scope.voltar = function () {
            $scope.redirecionarVinculosProfissional();
        };

        function init() {
            if ($scope.$parent.vinculoId) {
                $scope.obterVinculo();
            }
            else $scope.$parent.redirecionarVinculosProfissional();
        };

        init();
    }
]);