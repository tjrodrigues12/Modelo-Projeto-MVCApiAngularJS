atualizacaoSalarialMdl.controller('pesquisarCtrl', ['$scope', 'atualizacaoSalarialSvc', 'globalSvc',
    function ($scope, service, globalSvc) {
        $scope.usuarioId = $scope.$parent.usuarioId;

        //#region Obter Dados
        $scope.obterDadosProfissional = function () {
            $scope.loadDadosProfissional = service.obterDadosProfissional($scope.usuarioId).then(function (response) {
                $scope.dados = response.data;
            });
        }
        //#endregion

        //#region Eventos
        $scope.voltar = function () {
            $scope.redirecionarPesquisarProfissional();
        }

        $scope.excluir = function (item) {
            $scope.$parent.pessoaTrabalhoId = item.pessoaTrabalhoId;
        }

        $scope.confirmarExcluir = function (item) {
            $scope.loadTela = service.excluir($scope.$parent.pessoaTrabalhoId).then(function (response) {
                if (response.data)
                    $scope.obterDadosProfissional();
            });
        }

        $scope.incluir = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.redirecionarIncluir();
        }

        $scope.editar = function (item) {
            $scope.$parent.pessoaTrabalhoId = item.pessoaTrabalhoId;
            $scope.redirecionarEditar();
        };

        $scope.pesquisarHolerite = function (item) {
            $scope.$parent.pessoaTrabalhoId = item.pessoaTrabalhoId;
            $scope.$parent.listaAnoReferencia = null; //Força reset da lista de Ano Referência na tela de consulta de Folhas de Pagamentos
            $scope.$parent.pesquisarHolerite.filtro.anoReferencia = null; //Força reset da lista de Ano Referência na tela de consulta de Folhas de Pagamentos
            $scope.redirecionarPesquisarHolerite();
        }
        //#endregion

        $scope.init = function () {
            if ($scope.usuarioId == undefined || $scope.usuarioId == null) {
                $scope.$parent.redirecionarPesquisarProfissional();
            }
            $scope.dados = {}
            $scope.obterDadosProfissional();
        }

        $scope.init();
    }
]);