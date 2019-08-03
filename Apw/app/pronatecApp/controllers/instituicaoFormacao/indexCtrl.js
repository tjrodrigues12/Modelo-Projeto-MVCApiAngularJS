instituicaoFormacaoMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisar = function () {
            return $location.path("/pesquisar");
        }

        $scope.redirecionarIncluir = function () {
            return $location.path("/incluir");
        }

        $scope.redirecionarEditar = function () {
            return $location.path("/editar");
        }

        $scope.estadoPesquisar = {
            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                i18n: "pt-br",
                paginationPageSize: 10,
                paginationPageSizes: [10, 25, 50, 100]
            },
            filtro: {
                pagina: 1,
                tamanhoPagina: 10,
                orientacao: null,
                ordenacao: null,
                textoPesquisa: null,
            }
        };

        $scope.manterEstadoPesquisar = function (estado) {
            if (estado == undefined) $scope.estadoPesquisar = {};
            $scope.estadoPesquisar = estado;
        };
    }
]);