atualizacaoSalarialPerfilProfissionalMdl.controller('editarCtrl', ['$scope', 'atualizacaoSalarialPerfilProfissionalSvc', 'globalSvc', 'ValidationService',
    function($scope, service, globalSvc,validationService){

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro;

        $scope.obterVinculoTrabalho = function () {
            $scope.loadTela = service.obterVinculoProfissional($scope.$parent.pessoaTrabalhoId).then(function (response) {
                $scope.vinculo = response.data;
            });
        }

        $scope.atualizar = function () {

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.formVinculoTrabalho)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo');
            }

            if (valido && $scope.vinculo.exigeDataTermino) {
                if ($scope.vinculo.terminoContrato == undefined || $scope.vinculo.terminoContrato == null) {
                    valido = false;
                    globalSvc.mensagemNegativo("Data Inválida!");
                }
            }

            if(valido) {
                $scope.loadAtualizar = service.editar($scope.vinculo).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }          
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        }        

        $scope.init = function () {
            if ($scope.$parent.pessoaTrabalhoId) {
                $scope.obterVinculoTrabalho();
            }
            else {
                $scope.redirecionarPesquisar();
            }
        }

        $scope.init();

    }
]);