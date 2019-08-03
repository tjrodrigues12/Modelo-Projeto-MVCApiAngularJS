pessoaMdl.controller('indexCtrl', ['$scope', '$location',
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

        $scope.redirecionarPesquisarAprovar = function () {
            return $location.path("/pesquisarAprovar");
        }

        $scope.redirecionarAprovar = function () {
            return $location.path("/aprovar");
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
                ordenacao: 'nomeCompleto',
                cpf: null,
                situacaoAprovacaoId: null,
                municipioId: null,
                unidadeEscolarId: null,
                textoPesquisa: null
            },
            lista: {
                municipios: [],
                unidadesEscolares: [],
                situacoesAprovacao: []
            }
        };

        $scope.manterEstadoPesquisar = function (estado) {
            if (estado == undefined) $scope.estadoPesquisar = {};
            $scope.estadoPesquisar = estado;
        };

        $scope.filtro = {
            textoPesquisa: '',
            pagina: 1,
            tamanhoPagina: 10,
            ordenacao: 'pessoa',
            orientacao: 'ASC'
        }

        
    }
]);