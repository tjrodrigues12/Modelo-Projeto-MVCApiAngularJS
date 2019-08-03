parametroCargoAlunoCargaHorariaMdl.controller('parametroCtrl', ['$scope', 'paramentroCargoAlunoCargaHorariaSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, ValidationService) {

        $scope.parametroVigenciaId = $scope.$parent.parametroVigenciaId;

        //#region Obter Dados

        $scope.obterDadosVigencia = function () {
            $scope.loadObterVigencia = service.obterDadosVigencia($scope.parametroVigenciaId).then(response => {
                $scope.dadosVigencia = response.data;
            });
        }

        $scope.obterDadosParametros = function () {
            $scope.loadParametro = service.obterDadosParametrosParaPesquisar($scope.parametroVigenciaId).then(response => {
                $scope.dadosParametros = response.data;
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

            if ($scope.dadosIncluir.quantidadeMaximaAlunos == "")
                $scope.dadosIncluir.quantidadeMaximaAlunos = null;

            if (valido && $scope.dadosIncluir.quantidadeMaximaAlunos != undefined && $scope.dadosIncluir.quantidadeMaximaAlunos != null && $scope.dadosIncluir.quantidadeMinimaAlunos > $scope.dadosIncluir.quantidadeMaximaAlunos) {
                valido = false;
                globalSvc.mensagemAviso('A Quantidade Mínima de alunos não pode ser superior a Quantidade Máxima');
            }

            if (valido && ($scope.dadosIncluir.cargaHoraria == null || $scope.dadosIncluir.cargaHoraria == undefined)) {
                valido = false;
                globalSvc.mensagemAviso('Carga Horária informada inválida!');
            }

            if (valido) {
                $scope.dadosIncluir.parametroVigenciaId = $scope.parametroVigenciaId;
                $scope.loadIncluir = service.incluirParametroCargaHoraria($scope.dadosIncluir).then(response => {
                    if (response.data) {
                        $scope.obterDadosParametros();
                        $scope.dadosIncluir = {};
                        new ValidationService().resetForm($scope.form);
                    }
                });
            }
        }

        $scope.editar = function (item) {
            $scope.loadObterDadosEditar = service.obterDadosParametroParaEditar(item.parametroCargoAlunoCargaHorariaId).then(response => {
                $scope.dadosEditar = response.data;
            }, response => {
                $('#mdlEditar').modal('hide');
            });
        }

        $scope.confirmarEditar = function () {
            globalSvc.limparMensagens();
            var valido = true;

            if (!new ValidationService().checkFormValidity($scope.formEditar)) {
                valido = false;
                globalSvc.mensagemAviso('Verique os campos abaixo');
            }

            if ($scope.dadosEditar.quantidadeMaximaAlunos == "")
                $scope.dadosEditar.quantidadeMaximaAlunos = null;

            if (valido && $scope.dadosEditar.quantidadeMaximaAlunos != undefined && $scope.dadosEditar.quantidadeMaximaAlunos != null && $scope.dadosEditar.quantidadeMinimaAlunos > $scope.dadosEditar.quantidadeMaximaAlunos) {
                valido = false;
                globalSvc.mensagemAviso('A Quantidade Mínima de alunos não pode ser superior a Quantidade Máxima');
            }

            if (valido && ($scope.dadosEditar.cargaHoraria == null || $scope.dadosEditar.cargaHoraria == undefined)) {
                valido = false;
                globalSvc.mensagemAviso('Carga Horária informada inválida!');
            }

            if (valido) {
                $scope.loadSalvarEditar = service.editarParametroCargaHoraria($scope.dadosEditar).then(response => {
                    if (response.data) {
                        $scope.obterDadosParametros();
                        $('#mdlEditar').modal('hide');
                    }
                });
            }
        }

        $scope.excluir = function (item) {
            $scope.parametroCargoAlunoCargaHorariaId = item.parametroCargoAlunoCargaHorariaId;
        }

        $scope.confirmarExcluir = function () {
            globalSvc.limparMensagens();
            $scope.loadExcluirParametro = service.excluirParametroCargaHoraria($scope.parametroCargoAlunoCargaHorariaId).then(response => {
                if (response.data) {
                    $scope.obterDadosParametros();
                }
            });
        }

        //#endregion

        $scope.init = function () {
            if ($scope.parametroVigenciaId == null || $scope.parametroVigenciaId == undefined) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosVigencia();
            $scope.obterDadosParametros();
            $scope.dadosIncluir = {};
        }

        $scope.init();

    }
]);