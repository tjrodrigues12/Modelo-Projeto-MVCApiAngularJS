turmaMesMdl.controller('visualizarCtrl', ['$scope', 'turmaMesSvc', 'globalSvc',
    function ($scope, service, globalSvc) {

        $scope.dadosVisualizar = $scope.$parent.dadosVisualizar;

        //#region Obter Dados

        $scope.obterDadosAlunos = function () {

            $scope.loadObterAlunos = service.obterDadosAlunosParaVisualizar($scope.dadosVisualizar.turmaMesId).then(response => {
                $scope.dadosAlunos = response.data;
                if (!($scope.dadosAlunos != null && $scope.dadosAlunos != undefined && $scope.dadosAlunos.length > 0)) {
                    globalSvc.mensagemNegativo('Nenhum aluno encontrado para os dados informados');
                }
            });
        }

        //#endregion

        $scope.init = function () {
            if ($scope.dadosVisualizar == null || $scope.dadosVisualizar == undefined) { $scope.redirecionarPesquisar(); }

            $scope.obterDadosAlunos();
        }

        $scope.init();
       
    }
]);