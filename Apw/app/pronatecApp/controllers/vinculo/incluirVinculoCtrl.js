vinculoMdl.controller('incluirVinculoCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoIncluir;

        $scope.alocar = false;

        $scope.drop = {};

        $scope.obterProfissional = function () {
            $scope.loadProf = service.obterProfissionalParaIncluir($scope.dados.pessoaId).then(function (response) {
                $scope.dados.profissional = response.data;
            });
        }

        $scope.obterAnosReferencias = function () {
            $scope.loadAr = service.obterAnosReferenciasParaIncluir().then(function (response) {
                $scope.dados.anosReferencias = response.data;
            });
        }

        $scope.obterProgramas = function () {
            $scope.loadProg = service.obterProgramasParaIncluir().then(function (response) {
                $scope.dados.programas = response.data;
            });

            $scope.dados.programaId = "";
            $scope.dados.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if (globalSvc.idValido($scope.dados.programaId)) {
                $scope.loadPcr = service.obterProgramasCargosParaIncluir($scope.dados.programaId).then(function (response) {
                    $scope.dados.programasCargos = response.data;
                });
            }
            else $scope.dados.programasCargos = [];

            $scope.dados.programaCargoId = "";
        }

        $scope.voltar = function () {
            $scope.dados.passo = 1;
            $scope.dados.pessoaId = 0;
            $scope.$parent.manterEstadoIncluir($scope.dados);
            $scope.$parent.redirecionarIncluir();
        };

        $scope.salvar = function () {

            if (validar()) {

                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data > 0) {
                        if ($scope.alocar) alocarProfissional(response.data);
                        else $scope.redirecionarPesquisarProfissional();
                    }
                });
            }
        }

        function alocarProfissional(vinculoId) {
            $scope.$parent.vinculoId = vinculoId;
            $scope.$parent.estadoAlocarDocente = null;

            if ($scope.drop.programaCargo.selected.administrativo) $scope.redirecionarAlocar();
            else $scope.redirecionarAlocarDocente();
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

        var init = function () {
            if ($scope.dados != undefined && $scope.dados != null
                && $scope.dados.passo != undefined && $scope.dados.passo != null && $scope.dados.passo == 2
                && $scope.dados.pessoaId != undefined && $scope.dados.pessoaId != null && $scope.dados.pessoaId > 0) {
                $scope.obterProfissional();
                $scope.obterAnosReferencias();
                $scope.obterProgramas();
            }
            else $scope.redirecionarVinculosProfissional();
        };

        init();
    }
]);