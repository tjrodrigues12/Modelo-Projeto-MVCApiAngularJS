parametroCargoAlunoCargaHorariaMdl.controller('incluirVigenciaCtrl', ['$scope', 'paramentroCargoAlunoCargaHorariaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        //#region Obter Dados

        $scope.obterProgramas = function () {
            $scope.loadProgramas = service.obterProgramas().then(response => {
                $scope.listaProgramas = response.data;
                $scope.listaProgramaCargo = null;
            });
        }

        $scope.obterProgramasCargos = function () {
            $scope.dados.programaCargoId = null;
            $scope.loadCargo = service.obterProgramasCargos($scope.dados.programaId).then(response => {
                $scope.listaProgramaCargo = response.data;
            });
        }

        //#endregion

        //#region Eventos

        $scope.incluir = function () {
            globalSvc.limparMensagens();
            var valido = true;

            if (!new ValidationService().checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verique os campos abaixo');
            }

            if (valido && ($scope.dados.dataInicioVigencia == null || $scope.dados.dataInicioVigencia == undefined 
                || $scope.dados.dataFimVigencia == null || $scope.dados.dataFimVigencia == undefined)) {
                valido = false;
                globalSvc.mensagemAviso('Verique os campos abaixo');
            }

            if (valido && $scope.dados.dataInicioVigencia > $scope.dados.dataFimVigencia) {
                valido = false;
                globalSvc.mensagemAviso('A data de início não pode ser maior que a data final');
            }

            if (valido) {
                $scope.loadIncluir = service.incluirParametroVigencia($scope.dados).then(response => {
                    if (response.data) { $scope.redirecionarPesquisar(); }
                });
            }
        }

        //#endregion

        $scope.init = function () { 
            $scope.dados = {};            
            $scope.obterProgramas();
        }

        $scope.init();

    }
]);