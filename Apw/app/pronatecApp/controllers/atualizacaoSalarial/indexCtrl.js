atualizacaoSalarialMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisar = function () {
            return $location.path("/pesquisar");
        }

        $scope.redirecionarPesquisarProfissional = function () {
            return $location.path("/pesquisarProfissional")
        }

        $scope.redirecionarEditar = function () {
            return $location.path("/editar")
        }

        $scope.redirecionarEditarHolerite = function () {
            return $location.path("/editarHolerite")
        }

        $scope.redirecionarIncluir = function () {
            return $location.path("/incluir")
        }

        $scope.redirecionarPesquisarHolerite = function () {
            return $location.path("/pesquisarHolerite")
        }

        $scope.redirecionarIncluirHolerite = function () {
            return $location.path("/incluirHolerite")
        }

        $scope.pesquisarProfissional = {

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

        //$scope.pesquisar = {

        //    grid: {
        //        useExternalPagination: true,
        //        useExternalSorting: true,
        //        enableColumnMenus: false,
        //        i18n: 'pt-br',
        //        paginationPageSize: 10,
        //        paginationPageSizes: [10, 25, 50, 100]
        //    },
        //    filtro: {
        //        pagina: 1,
        //        tamanhoPagina: 10,
        //        orientacao: null,
        //        ordenacao: null,
        //        textoPesquisa: null
        //    }
        //};

        $scope.filtroProfissional = {};
        $scope.filtro = {};


    }
]);