﻿relatorioMdl.controller('indexCtrl', ['$scope', '$location',
    function ($scope, $location) {

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

        $scope.filtro = {
            textoPesquisa: '',
            pagina: 1,
            tamanhoPagina: 10,
            ordenacao: 'usuario',
            orientacao: 'ASC'
        }
    }
]);