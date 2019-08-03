frequenciaMdl.controller('imprimirFolhaDocenteCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {
    
        $scope.obtemTurmas = function () {
            $scope.loadTurmas = service.obtemTurmasParaImprimirFolhaDocente($scope.estadoPesquisar.filtro.mesId, $scope.estadoPesquisar.filtro.anoReferencia, $scope.$parent.estadoDados.pessoaSelecionada.vinculoId).then(function (response) {
                $scope.listTurmas = response.data;
                console.log(response.data);
            });
        }

        $scope.imprimirFolhaDocente = function () {

            if (!(new validationService()).checkFormValidity($scope.formGerar)) {
               globalSvc.mensagemAviso('Verifique os campos abaixo!');
               return;
            }

            //var parametro = {
            //    mesId:  $scope.estadoPesquisar.filtro.mesId,
            //    anoReferencia: $scope.estadoPesquisar.filtro.anoReferencia, 
            //    vinculoId : $scope.$parent.estadoDados.pessoaSelecionada.vinculoId,
            //    turmaId: $scope.turmaId
            //};            

            $scope.carregando = service.gerarRelatorioFolhaDocente($scope.estadoPesquisar.filtro.mesId, $scope.estadoPesquisar.filtro.anoReferencia, $scope.$parent.estadoDados.pessoaSelecionada.vinculoId, $scope.turmaId).then(function (response) {
                globalSvc.savePDF(response.data, "folhaFrequencia.pdf");
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });

        };

        function validarParametroFormulario() {

            var parametro = $scope.$parent.estadoDados.pessoaSelecionada;

            return parametro != null && !angular.equals(parametro, {});
        }

        var inicializar = function () {

            // PARAMETRO INVALIDO
            if (!validarParametroFormulario()) {
                $scope.redirecionarPesquisar();
                return;
            }
            
            $scope.listTurmas = [];

            $scope.obtemTurmas();
        }

        inicializar();
    }
]);