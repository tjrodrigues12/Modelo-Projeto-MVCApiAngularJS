turmaMesMdl.controller('editarCtrl', ['$scope', 'turmaMesSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dadosEditar = $scope.$parent.dadosEditar;

        //#region Obter Dados

        $scope.obterDadosAlunos = function () {
            var formObterDados = { turmaMesId: $scope.dadosEditar.turmaMesId, turmaId: $scope.dadosEditar.turmaId, anoReferencia: $scope.dadosEditar.anoReferencia, mesId: $scope.dadosEditar.mesId };

            $scope.loadObterAlunos = service.obterDadosAlunosParaEditar(formObterDados).then(response => {
                $scope.dadosAlunos = response.data;
                if (!($scope.dadosAlunos != null && $scope.dadosAlunos != undefined && $scope.dadosAlunos.length > 0)) {
                    globalSvc.mensagemNegativo('Nenhum aluno encontrado para os dados informados');
                }
            });
        }

        //#endregion

        //#region Eventos

        $scope.salvar = function () {
            var editarTurmaMes = {
                turmaMesId: $scope.dadosEditar.turmaMesId,
                listaAlunos: $scope.dadosAlunos
            };

            $scope.loadSalvar = service.editarTurmaMesAluno(editarTurmaMes).then(response => {
                if (response.data) { $scope.redirecionarPesquisar(); }
            });
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dadosEditar == undefined || $scope.dadosEditar == null) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosAlunos();
        }

        $scope.init();

    }
]);