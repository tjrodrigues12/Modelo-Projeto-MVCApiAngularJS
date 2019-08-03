atualizacaoSalarialPerfilProfissionalMdl.controller('indexCtrl', ['$scope', '$location',
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

        $scope.redirecionarEditarHolerite = function () {
            return $location.path("/editarHolerite");
        }

        $scope.redirecionarPesquisarHolerite = function () {
            return $location.path("/pesquisarHolerite");
        }

        $scope.redirecionarIncluirHolerite = function () {
            return $location.path("/incluirHolerite");
        }

        $scope.pesquisarHolerite = {

            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                multiSelect: false,
                i18n: 'pt-br',
                paginationPageSize: 12,
                paginationPageSizes: [12, 25, 50, 100]
            },
            filtro: {
                pagina: 1,
                tamanhoPagina: 12,
                orientacao: null,
                ordenacao: null,
                textoPesquisa: null,
                anoReferencia: null
            }
        };

        $scope.dados = null;
        $scope.dadosHolerite = {};

    }
]);