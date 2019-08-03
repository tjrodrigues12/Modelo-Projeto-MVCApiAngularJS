vinculoMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisarProfissional = function () {
            return $location.path("/pesquisar/profissional");
        }

        $scope.redirecionarIncluir = function () {

            if ($scope.estadoIncluir.passo == null) {
                $scope.estadoIncluir.filtro.nome = "";
                $scope.estadoIncluir.filtro.cpf = "";
                $scope.estadoIncluir.passo = 1;
                $scope.estadoIncluir.pessoaId = 0;
                $scope.estadoIncluir.anoReferencia = "";
                $scope.estadoIncluir.municipioId = "";
                $scope.estadoIncluir.unidadeEscolarId = "";
                $scope.estadoIncluir.programaId = "";
                $scope.estadoIncluir.cargoId = "";
                $scope.estadoIncluir.dataInicioVigencia = "";
                $scope.estadoIncluir.dataFinalVigencia = "";
                $scope.estadoIncluir.cargaHoraria = "";
                $scope.estadoIncluir.grid.data = [];
            }

            if ($scope.estadoIncluir.passo == 1) {
                return $location.path("/incluir/selecao/profissional");
            }
            else if ($scope.estadoIncluir.passo == 2) {
                return $location.path("/incluir/vinculo");
            }
        }

        $scope.redirecionarEditar = function () {
            return $location.path("/editar");
        }

        $scope.redirecionarAlocar = function () {
            return $location.path("/alocar/administrativo");
        }

        $scope.redirecionarAlocarDocente = function () {
            return $location.path("/alocar/docente");
        }

        $scope.redirecionarAlocarDocenteTurma = function () {
            return $location.path("/alocar/docente/turma");
        }

        $scope.redirecionarVincularCurso = function () {
            return $location.path("/vincular/curso");
        }

        $scope.estadoIncluir = {
            passo: 1,
            pessoaId: 0,
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
                nome: null,
                cpf: null
            }
        };

        $scope.manterEstadoIncluir = function (estado) {
            if (estado == undefined) $scope.estadoIncluir = {};
            $scope.estadoIncluir = estado;
        };

        $scope.estadoAlocarDocente = {};

        $scope.manterEstadoAlocarDocente = function (estado) {
            if (estado == undefined) $scope.estadoAlocarDocente = {};
            $scope.estadoAlocarDocente = estado;
        };

        $scope.estadoPesquisarProfissional = {
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
                nomeProfissional: null,
                cpfProfissional: null,
                anoReferencia: null,
                programaId: null,
                programaCargoId: null,
                municipioId: null,
                unidadeEscolarId: null
            },
            pesquisaDetalhada: false
        };

        $scope.manterEstadoPesquisarProfissional = function (estado) {
            if (estado == undefined) $scope.estadoPesquisarProfissional = {};
            $scope.estadoPesquisarProfissional = estado;
        };

        //#region Vínculos Profissional

        $scope.redirecionarVinculosProfissional = function () {
            return $location.path("/vinculos/profissional");
        }

        $scope.estadoVinculosProfissional = {
            pessoaId: null,
            anoReferencia: null,
            municipioId: null,
            unidadeEscolarId: null,
            programaId: null,
            programaCargoId: null,
            nomeProfissional: null,
            cpfProfissional: null,
            vinculos: []
        };

        $scope.manterEstadoVinculosProfissional = function (estado) {
            if (estado == undefined) $scope.estadoVinculosProfissional = {};
            $scope.estadoVinculosProfissional = estado;
        };

        //#endregion
    }
]);