folhaPagamentoMdl.controller('detalhesLoteCtrl', ['$scope', 'folhaPagamentoSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService) {

        $scope.obterDetalhesLotePagamento = function () {
            $scope.loadDetalhes = service.obterDetalhesLotePagamento($scope.$parent.folhaLotePagamentoId).then(response => {
                $scope.dados = response.data;
            });
        };

        function init() {
            if ($scope.$parent.folhaLotePagamentoId > 0)
                $scope.obterDetalhesLotePagamento();
            else
                $scope.redirecionarPesquisarLote();
        }

        init();

    }
]);