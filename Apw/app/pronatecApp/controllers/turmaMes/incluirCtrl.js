turmaMesMdl.controller('incluirCtrl', ['$scope', 'turmaMesSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dadosIncluir = $scope.$parent.dadosIncluir;

        //#region Obter Dados

        $scope.obterDadosAlunos = function () {
            var formObterDados = { turmaId: $scope.dadosIncluir.turmaId, anoReferencia: $scope.dadosIncluir.anoReferencia, mesId: $scope.dadosIncluir.mesId };

            $scope.loadObterAlunos = service.obterDadosAlunosParaIncluir(formObterDados).then(response => {
                $scope.dadosAlunos = response.data;
                if (!($scope.dadosAlunos != null && $scope.dadosAlunos != undefined && $scope.dadosAlunos.length > 0)) {
                    globalSvc.mensagemNegativo('Nenhum aluno encontrado para os dados informados');
                }
            });
        }

        //#endregion

        //#region Eventos

        $scope.salvar = function () {
            var incluirTurmaMes = {
                anoReferencia: $scope.dadosIncluir.anoReferencia,
                mesId: $scope.dadosIncluir.mesId,
                turmaId: $scope.dadosIncluir.turmaId,
                listaAlunos: $scope.dadosAlunos
            };

            $scope.loadSalvar = service.incluirTurmaMesAluno(incluirTurmaMes).then(response => {
                if (response.data) { $scope.redirecionarPesquisar(); }
            });
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dadosIncluir == null || $scope.dadosIncluir == undefined) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosAlunos();
        }

        $scope.init();
       
    }
]);