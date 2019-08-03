atualizacaoSalarialPerfilProfissionalMdl.controller('pesquisarCtrl', ['$scope', 'atualizacaoSalarialPerfilProfissionalSvc', 'globalSvc',
    function ($scope, service, globalSvc) {
        $scope.dados = $scope.$parent.dados;

        //#region Obter Dados
        $scope.obterDadosProfissional = function () {
            $scope.loadDadosProfissional = service.obterDadosProfissional().then(function (response) {
                $scope.dados = response.data;
            });
        }
        //#endregion

        //#region Métodos
        $scope.editar = function (item) {
            $scope.$parent.pessoaTrabalhoId = item.pessoaTrabalhoId;
            $scope.redirecionarEditar();
        };

        $scope.incluir = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.listaAnoRef = null; //Força reset da lista de Ano Referência na tela de consulta de Folhas de Pagamentos
            $scope.redirecionarIncluir();
        }

        $scope.pesquisarHolerite = function (item) {
            $scope.$parent.pessoaTrabalhoId = item.pessoaTrabalhoId;
            $scope.$parent.listaAnoRef = null; //Força reset da lista de Ano Referência na tela de consulta de Folhas de Pagamentos
            $scope.$parent.pesquisarHolerite.filtro.anoReferencia = null; //Força reset da lista de Ano Referência na tela de consulta de Folhas de Pagamentos
            $scope.redirecionarPesquisarHolerite();
        }
        //#endregion

        $scope.init = function () {
            if ($scope.dados == null || $scope.dados == undefined) {
                $scope.obterDadosProfissional();
            }
        }

        $scope.init();

    }
]);