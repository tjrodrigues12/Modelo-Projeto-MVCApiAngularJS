atualizacaoCadastralMdl.controller('dadosBancariosCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {
        
        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaDadosBancarios

        $scope.obterTiposContas = function () {
            $scope.loadTiposContas = service.obterTiposContas().then(function (response) {
                $scope.filtro.tiposContas = response.data;
            });
        }

        $scope.obterBancos = function () {
            $scope.loadBancos = service.obterBancos().then(function (response) {
                $scope.filtro.bancos = response.data;
            });
        }

        $scope.avancar = function () {
            if (new validationService().checkFormValidity($scope.formDadosBancarios)) {
                $scope.loadSalvando = service.salvarAbaDadosBancarios($scope.dados).then(function (response) {
                    if (response.data) {
                        $scope.$parent.dados = $scope.dados;
                        $scope.$parent.filtro.abaDadosBancarios = $scope.filtro;
                        $scope.redirecionarDadosAcademicos();
                    }
                });
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosBancarios = $scope.filtro;
            $scope.redirecionarDadosResidenciais();
        };

        var init = function () {
            globalSvc.limparMensagens();
            if ($scope.dados) {
                if (!$scope.filtro.tiposContas) {
                    $scope.obterTiposContas();
                    $scope.obterBancos();
                }
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);