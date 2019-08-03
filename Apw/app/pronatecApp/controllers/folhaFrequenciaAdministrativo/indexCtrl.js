folhaFrequenciaAdministrativoMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisar = function () {
            return $location.path("/pesquisar");
        }

        $scope.redirecionarPesquisarQuadroModelo = function () {
            return $location.path("/pesquisarQuadroModelo");
        }

        $scope.redirecionarIncluirQuadroModelo = function () {
            return $location.path("/incluirQuadroModelo");
        }

        $scope.redirecionarVisualizarQuadroModelo = function () {
            return $location.path("/visualizarQuadroModelo");
        }

        $scope.redirecionarGerarFolhaFrequenciaAdministrativo = function () {
            return $location.path("/gerarFolhaFrequenciaAdministrativo");
        }

        $scope.redirecionarEditarFolhaFrequenciaAdministrativo = function () {
            return $location.path("/editarFolhaFrequenciaAdministrativo");
        }

        $scope.redirecionarEditarQuadroModelo = function () {
            return $location.path("/editarQuadroModelo");
        }

        $scope.redirecionarFolhaPonto = function () {
            return $location.path("/folhaPonto");
        }

        $scope.estadoPesquisar = {
            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                i18n: 'pt-br',
                paginationPageSize: 10,
                paginationPageSizes: [10, 25, 50, 100]
            },
            filtro: {
                pagina: 1,
                tamanhoPagina: 10,
                orientacao: null,
                ordenacao: null,
                textoPesquisa: null
            }
        };

    }
]);