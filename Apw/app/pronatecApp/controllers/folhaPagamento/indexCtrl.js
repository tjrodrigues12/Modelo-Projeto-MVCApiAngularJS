folhaPagamentoMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.redirecionarPesquisar = function () {
            return $location.path("/pesquisar");
        }

        $scope.redirecionarGerar = function () {
            return $location.path("/gerar");
        }

        $scope.redirecionarDetalhes = function () {
            return $location.path("/detalhes");
        }

        $scope.redirecionarLancamento = function () {
            return $location.path("/lancamento");
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
                programaId: null,
                programaCargoId: null,
                verbaPagamentoId: null,
                ativo: null
            }
        };

        $scope.manterEstadoPesquisar = function (estado) {
            if (estado == undefined) $scope.estadoPesquisar = {};
            $scope.estadoPesquisar = estado;
        };

        //#region Pesquisar Planilha Pagamento Docente

        $scope.estadoPesquisarPlanilhaPagamentoDocente = {
            filtro: {
                anoCompetencia: null,
                mesCompetencia: null,
                anoLetivoId: null,
                cursoId: null,
                tipoOfertaId: null,
                programaId: null,
                projetoCicloId: null,
                anoFaseId: null,
                turnoId: null
            },
            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                i18n: "pt-br",
                paginationPageSize: 10,
                paginationPageSizes: [10, 25, 50, 100]
            }
        }

        $scope.manterEstadoPesquisarPlanilhaPagamentoDocente = function (estado) {
            if (estado == undefined) $scope.estadoPesquisarPlanilhaPagamentoDocente = {};
            $scope.estadoPesquisarPlanilhaPagamentoDocente = estado;
        };

        $scope.redirecionarPesquisarPlanilhaPagamentoDocente = function () {
            return $location.path("/pesquisar/planilha/pagamento/docente");
        }

        //#endregion

        //#region Pesquisar Planilha Pagamento Administrativo

        $scope.estadoPesquisarPlanilhaPagamentoAdministrativo = {
            filtro: {
                anoCompetencia: null,
                mesCompetencia: null,
                anoLetivoId: null,
                cursoId: null,
                pesquisaDetalhada: false
            },
            grid: {
                useExternalPagination: true,
                useExternalSorting: true,
                enableColumnMenus: false,
                i18n: "pt-br",
                paginationPageSize: 10,
                paginationPageSizes: [10, 25, 50, 100]
            }
        }

        $scope.manterEstadoPesquisarPlanilhaPagamentoAdministrativo = function (estado) {
            if (estado == undefined) $scope.estadoPesquisarPlanilhaPagamentoAdministrativo = {};
            $scope.estadoPesquisarPlanilhaPagamentoAdministrativo = estado;
        };

        $scope.redirecionarPesquisarPlanilhaPagamentoAdministrativo = function () {
            return $location.path("/pesquisar/planilha/pagamento/administrativo");
        }

        //#endregion

        //#region Lançar Planilha Pagamento Docente

        $scope.redirecionarLancarPlanilhaPagamentoDocente = function () {
            return $location.path("/lancar/planilha/pagamento/docente");
        }

        //#endregion

        //#region Lançar Planilha Pagamento Administrativo

        $scope.redirecionarLancarPlanilhaPagamentoAdministrativo = function () {
            return $location.path("/lancar/planilha/pagamento/administrativo");
        }

        //#endregion

        //#region Pesquisar Lote

        $scope.estadoPesquisarLote = {
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
                folhaPagamentoId: null,
                folhaLotePagamentoId: null
            }
        };

        $scope.manterEstadoPesquisarLote = function (estado) {
            if (estado == undefined) $scope.estadoPesquisar = {};
            $scope.estadoPesquisarLote = estado;
        };

        $scope.redirecionarPesquisarLote = function () {
            return $location.path("/pesquisarLote");
        }

        

        //#endregion

        //#region detalhes lote

        $scope.redirecionarDetalhesLote = function () {
            return $location.path("/detalhesLote");
        }

        //#endregion

        //#region gerar lote

        $scope.redirecionarGerarLote = function () {
            return $location.path("/gerarLote");
        }

        //#endregion
    }
]);