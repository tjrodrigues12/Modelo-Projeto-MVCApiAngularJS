folhaPagamentoMdl.controller('gerarCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService', '$interval',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService, $interval) {

        $scope.dados = {
            anoCompetencia: null,
            mesCompetencia: null,
            muncipioId: null,
            unidadeEscolarId: null,
            programaId: null,
            programaCargoId: null
        };

        $scope.gerando = false;

        $scope.dados.progresso = 0;

        $scope.obterAnosCompetencias = function () {
            $scope.loadAc = service.obterAnosCompetenciasParaGerar().then(function (response) {
                $scope.anosCompetencias = response.data;
                if (globalSvc.objValido($scope.anosCompetencias)) {
                    if ($scope.anosCompetencias.length == 0) $scope.anosCompetencias = null;
                    else if ($scope.anosCompetencias.length == 1) {
                        $scope.dados.anoCompetencia = $scope.anosCompetencias[0].anoCompetencia;
                        $scope.obterMesesCompetencias();
                    }
                }
            });

            $scope.dados.anoCompetencia = "";
            $scope.mesesCompetencias = [];
            $scope.dados.mesCompetencia = "";
            $scope.municipios = [];
            $scope.dados.municipioId = "";
            $scope.unidadesEscolares = [];
            $scope.dados.unidadeEscolarId = "";
            $scope.programas = [];
            $scope.dados.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterMesesCompetencias = function () {
            if (globalSvc.idValido($scope.dados.anoCompetencia)) {
                $scope.loadMc = service.obterMesesCompetenciasParaGerar($scope.dados).then(function (response) {
                    $scope.mesesCompetencias = response.data;
                    if (globalSvc.objValido($scope.mesesCompetencias)) {
                        if ($scope.mesesCompetencias.length == 0) $scope.mesesCompetencias = null;
                        else if ($scope.mesesCompetencias.length == 1) {
                            $scope.dados.mesCompetencia = $scope.mesesCompetencias[0].mesCompetencia;
                            $scope.obterMunicipios();
                        }
                    }
                });
            }
            else $scope.mesesCompetencias = [];

            $scope.dados.mesCompetencia = "";
            $scope.municipios = [];
            $scope.dados.municipioId = "";
            $scope.unidadesEscolares = [];
            $scope.dados.unidadeEscolarId = "";
            $scope.programas = [];
            $scope.dados.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterMunicipios = function () {
            if (globalSvc.idValido($scope.dados.mesCompetencia)) {
                $scope.loadMun = service.obterMunicipiosParaGerar($scope.dados).then(function (response) {
                    $scope.municipios = response.data;
                    if (globalSvc.objValido($scope.municipios)) {
                        if ($scope.municipios.length == 0) $scope.municipios = null;
                        else if ($scope.municipios.length == 1) {
                            $scope.dados.municipioId = $scope.municipios[0].municipioId;
                            $scope.obterUnidadesEscolares();
                        }
                    }
                });
            }
            else $scope.municipios = [];

            $scope.dados.municipioId = "";
            $scope.unidadesEscolares = [];
            $scope.dados.unidadeEscolarId = "";
            $scope.programas = [];
            $scope.dados.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterUnidadesEscolares = function () {
            if (globalSvc.idValido($scope.dados.municipioId)) {
                $scope.loadUe = service.obterUnidadesEscolaresParaGerar($scope.dados).then(function (response) {
                    $scope.unidadesEscolares = response.data;
                    if (globalSvc.objValido($scope.unidadesEscolares)) {
                        if ($scope.unidadesEscolares.length == 0) $scope.unidadesEscolares = null;
                        else if ($scope.unidadesEscolares.length == 1) {
                            $scope.dados.unidadeEscolarId = $scope.unidadesEscolares[0].unidadeEscolarId;
                            $scope.obterProgramas();
                        }
                    }
                });
            }
            else $scope.unidadesEscolares = [];

            $scope.dados.unidadeEscolarId = "";
            $scope.programas = [];
            $scope.dados.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterProgramas = function () {
            if (globalSvc.idValido($scope.dados.unidadeEscolarId)) {
                $scope.loadProg = service.obterProgramasParaGerar($scope.dados).then(function (response) {
                    $scope.programas = response.data;
                    if (globalSvc.objValido($scope.programas)) {
                        if ($scope.programas.length == 0) $scope.programas = null;
                        else if ($scope.programas.length == 1) {
                            $scope.dados.programaId = $scope.programas[0].programaId;
                            $scope.obterProgramasCargos();
                        }
                    }
                });
            }
            else $scope.programas = [];

            $scope.dados.programaId = "";
            $scope.programasCargos = [];
            $scope.dados.programaCargoId = "";
        }

        $scope.obterProgramasCargos = function () {
            if (globalSvc.idValido($scope.dados.programaId)) {
                $scope.loadPc = service.obterProgramasCargosParaGerar($scope.dados).then(function (response) {
                    $scope.programasCargos = response.data;
                    if (globalSvc.objValido($scope.programasCargos)) {
                        if ($scope.programasCargos.length == 0) $scope.programasCargos = null;
                        else if ($scope.programasCargos.length == 1) {
                            $scope.dados.programaCargoId = $scope.programasCargos[0].programaCargoId;
                        }
                    }
                });
            }
            else $scope.programasCargos = [];

            $scope.dados.programaCargoId = "";
        }

        $scope.valido = true;

        $scope.gerar = function () {

            if (!validar()) return;

            $scope.confirmarGeracao();
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formGerar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        $scope.confirmarGeracao = function () {

            globalSvc.limparMensagens();

            $scope.loadTela = service.gerarFolhaPagamentoParaGerar($scope.dados).then(function (response) {
                if (response.data) {

                    $scope.redirecionarPesquisar();

                    //$scope.gerando = true;

                    //intervaloProgressao = setInterval(atualizarProgressaoPagamento, 3000);
                }
                else {

                    $scope.gerando = false;

                    globalSvc.mensagemNegativo("Ocorreu um erro ao realizar a operação!");
                }

                $scope.idGeracao = 0;
            });
        }

        $scope.cancelarGeracao = function () {
            $scope.idGeracao = 0;
        }

        //#region Progress Bar

        var intervaloProgressao = null;

        $scope.progresso = 0;

        var atualizarProgressaoPagamento = function () {
            service.obterControlaRotinasParaGerar($scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                $scope.controlaRotinas = response.data;
            }).then(function (response) {
                service.obterProgressoGeracaoFolhaPagamentoParaGerar($scope.dados.anoCompetencia, $scope.dados.mesCompetencia).then(function (response) {
                    var progressoAtual = response.data;
                    if (progressoAtual > $scope.progresso) $scope.progresso = progressoAtual;
                    if (progressoAtual != $scope.progresso && progressoAtual >= 100) {
                        $scope.progresso = 100;
                        globalService.mensagemPositivo("Pagamento gerado com sucesso!");
                        clearInterval(intervaloProgressao);
                    }
                })
            });
        };

        //#endregion

        function init() {
            $scope.anosCompetencias = [];
            $scope.mesesCompetencias = [];
            $scope.municipios = [];
            $scope.unidadesEscolares = [];
            $scope.programas = [];
            $scope.programasCargos = [];
            $scope.obterAnosCompetencias();
        }

        $scope.voltar = function () {
            $scope.$parent.redirecionarPesquisar();
        }

        init();
    }
]);