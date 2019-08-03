folhaPagamentoMdl.controller('lancamentoCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.obterMunicipios = function () {
            $scope.loadMunicipios = service.obterMunicipiosParaLancamentos().then(response => {
                $scope.municipios = response.data;
            });
        };

        $scope.obterUnidadesEscolares = function () {
            $scope.unidadesEscolares = [];
            $scope.filtro.unidadeEscolarId = null;

            if ($scope.filtro.municipioId > 0) {
                $scope.loadUnidadeEscolares = service.obterUnidadesEscolaresParaLancamentos($scope.filtro.municipioId).then(response => {
                    $scope.unidadesEscolares = response.data;
                });
            }
        };

        $scope.obterProgramas = function () {
            $scope.loadProgramas = service.obterProgramasParaLancamentos().then(response => {
                $scope.programas = response.data;
            });
        };

        $scope.obterCargos = function () {
            $scope.filtro.programaCargoId = null;
            $scope.cargos = [];

            if ($scope.filtro.programaId > 0) {
                $scope.loadCargos = service.obterCargosParaLancamentos($scope.filtro.programaId).then(response => {
                    $scope.cargos = response.data;
                });
            }
        };

        $scope.obterFolhaPagamento = function () {
            $scope.loadFolhaPagamento = service.obterFolhaPagamentoParaLancamentos($scope.folhaPagamentoId).then(response => {
                $scope.folhaPagamento = response.data;
            });
        };

        $scope.obterVerbas = function () {
            $scope.loadVerbas = service.obterVerbasParaLancamentos().then(response => {
                $scope.verbas = response.data;
            });
        };

        $scope.obterLancamentos = function () {
            $scope.loadLancamentos = service.obterLancamentosParaLancamentos($scope.filtro).then(response => {
                $scope.lancamentos = response.data;
            });
        };

        $scope.calcularValor = function (lancamento) {
            var valorVerba = lancamento.verbaPagamentoId > 0 ? $scope.verbas.filter(x => { return x.verbaPagamentoId == lancamento.verbaPagamentoId })[0].valor : 0;
            lancamento.valorReferencia = valorVerba * lancamento.cargaHorariaReferencia;
        };

        $scope.salvar = function (lancamento) {
            if (validarCamposObrigatorios(lancamento)) {
                $scope.loadSalvar = service.salvarLancamento(lancamento).then(response => {
                    if (response.data > 0) {
                        lancamento.folhaLancamentoId = response.data;
                        globalSvc.mensagemPositivo("Registro salvo com sucesso!");
                    }
                });
            }
        };

        $scope.editar = function (lancamento) {
            if (validarCamposObrigatorios(lancamento)) {
                $scope.loadEditar = service.editarLancamento(lancamento).then(response => {
                    if (response.data)
                        globalSvc.mensagemPositivo("Registro alterado com sucesso!");
                });
            }
        };

        var validarCamposObrigatorios = function (lancamento) {
            globalSvc.limparMensagens();
            return validarCampoVerba(lancamento.verbaPagamentoId)
            && validarCampoHoras(lancamento.cargaHorariaReferencia);
        };

        var validarCampoVerba = function (verba) {
            if (verba > 0) return true;

            globalSvc.mensagemNegativo("Informe a verba do pagamento");
            return false;
        };

        var validarCampoHoras = function (horas) {
            if (horas > 0) return true;

            globalSvc.mensagemNegativo("Informe as horas trabalhadas");
            return false;
        };

        function init() {

            if ($scope.$parent.folhaPagamentoId) {
                $scope.filtro = {
                    cpfProfissional: null,
                    nomeMunicipio: null,
                    municipioId: null,
                    unidadeEscolarId: null,
                    programaId: null,
                    programaCargoId: null,
                    folhaPagamentoId: $scope.$parent.folhaPagamentoId
                }

                $scope.obterMunicipios();
                $scope.obterProgramas();
                $scope.obterFolhaPagamento();
                $scope.obterVerbas();
                $scope.obterLancamentos();
            }
            else
                $scope.redirecionarPesquisar();
        }

        init();
    }
]);