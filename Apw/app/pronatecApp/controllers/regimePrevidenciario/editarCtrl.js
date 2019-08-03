regimePrevidenciarioMdl.controller('editarCtrl', ['$scope', 'globalSvc', 'regimePrevidenciarioSvc', 'ValidationService',
    function ($scope, globalSvc, service, ValidationService) {

        $scope.obterRegimePrevidenciario = function () {
            $scope.loadTela = service.obterDadosRegimePrevidenciarioParaEditar($scope.regimePrevidenciarioId).then(function (response) {
                $scope.dados = response.data
            });
        }

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new ValidationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo');
            }

            if (valido) {
                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                })
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }

        var init = function () {
            if($scope.$parent.regimePrevidenciarioId){
                $scope.obterRegimePrevidenciario();
            }
            else{
                $scope.$parent.redirecionarPesquisar();
            }
        }

        init();
    }
])