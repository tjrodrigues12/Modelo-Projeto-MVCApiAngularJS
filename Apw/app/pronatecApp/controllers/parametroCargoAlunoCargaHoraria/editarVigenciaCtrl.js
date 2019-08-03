parametroCargoAlunoCargaHorariaMdl.controller('editarVigenciaCtrl', ['$scope', 'paramentroCargoAlunoCargaHorariaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.parametroVigenciaId = $scope.$parent.parametroVigenciaId;

        //#region Obter Dados

        $scope.obterDadosParametro = function(){
            $scope.loadDados = service.obterDadosParametroVigenciaParaEditar($scope.dados.parametroVigenciaId).then(response => {
                $scope.dados = response.data;
            });
        }

        //#endregion

        //#region Eventos

        $scope.salvar = function () {
            var valido = true;

            if (!new ValidationService().checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
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
                $scope.loadSalvar = service.editarParametroVigencia($scope.dados).then(response => {
                    if (response.data) {
                        $scope.redirecionarPesquisar();
                    }
                });
            }
        }

        //#endregion

        $scope.init = function () {
            if ($scope.parametroVigenciaId == undefined || $scope.parametroVigenciaId == null) { $scope.redirecionarPesquisar(); }

            $scope.dados = {};
            $scope.dados.parametroVigenciaId = $scope.parametroVigenciaId;
            $scope.obterDadosParametro();
        }

        $scope.init();

    }
]);