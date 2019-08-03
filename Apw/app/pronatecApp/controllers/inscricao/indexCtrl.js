inscricaoMdl.controller('indexCtrl', ['$scope', '$location',
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

        $scope.redirecionarPesquisarCandidatos = function () {
            return $location.path("/pesquisar/candidatos");
        }

        $scope.redirecionarDetalhesInscricaoCandidato = function () {
            return $location.path("/detalhes/candidato");
        }

        $scope.redirecionarPesquisarAutorizar = function () {
            return $location.path("/autorizar/candidatos");
        }

        $scope.redirecionarAutorizar = function () {
            return $location.path("/autorizar");
        }

        $scope.estadoDados = {};

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

        $scope.estadoPesquisarCandidatos = {
            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                i18n: "pt-br",
                paginationPageSize: 10,
                paginationPageSizes: [10, 25, 50, 100],
                multiSelect: true,
                enableRowSelection: true,
                enableSelectAll: true,
            },
            filtro: {
                pagina: 1,
                tamanhoPagina: 10,
                orientacao: "",
                ordenacao: "",
                nomeCandidato: null,
                cpfCandidato: null,
                inscricaoId: null,
                tipoInscricaoCandidatoId: null,
                situacaoInscricaoCandidato: null
            },
            pesquisaDetalhada: false,
            pesquisaOcultada: false
        };

        $scope.manterEstadoPesquisarCandidatos = function (estado) {
            if (estado == undefined) $scope.estadoPesquisarCandidatos = {};
            $scope.estadoPesquisarCandidatos = estado;
        };

        $scope.estadoPesquisarAutorizar = {
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
                inscricaoId: null,
                tipoInscricaoCandidato: null
            }
        };

        $scope.manterEstadoPesquisarAutorizar = function (estado) {
            if (estado == undefined) $scope.estadoPesquisarAutorizar = {};
            $scope.estadoPesquisarAutorizar = estado;
        };
    }
]);