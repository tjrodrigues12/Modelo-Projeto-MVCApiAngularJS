globalMdl.directive('dropDown', function ($compile, $templateRequest) {
    return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
            name: '@',
            ngModel: '=ngModel',
            selected: '=?',
            autoComplete: '=',
            refreshFunction: '=',
            refreshDelay: '=',
            minimumInputLength: '=',
            list: '=',
            listFilter: '@',
            listFilterParams: '=',
            listId: '@',
            listLabel: '@',
            listLabelFilter: '@',
            listLabelFilterParams: '=',
            width: '@',
            placeHolder: '@',
            clear: '=',
            disabled: '='
        },
        controller: function ($scope, $filter) {

            $scope.drop_noResult = "Nenhum resultado encontrado";

            //#region Name

            $scope.drop_name = "";

            if ($scope.name != undefined && $scope.name != null && $scope.name != "") {
                $scope.drop_name = $scope.name;
            }

            //#endregion

            //#region AutoComplete

            $scope.drop_autoComplete = false;

            if ($scope.autoComplete != undefined && $scope.autoComplete != null && $scope.autoComplete != "" && $scope.autoComplete == true) {
                $scope.drop_autoComplete = true;
            }

            //#region Refresh Function

            /* Método que deverá ser invocado para atualizar a lista do dropdown, conforme o texto da pesquisa
               seja alterado. Este método obrigatóriamente, deve possuir somente um parâmetro do tipo string */

            $scope.drop_refresh = function (textoPesquisa) {
                if ($scope.drop_autoComplete) {
                    var pesquisar = true;
                    var valor = "";
                    if (textoPesquisa != undefined && textoPesquisa != null && textoPesquisa != "") {
                        valor = textoPesquisa;
                        if (textoPesquisa.length < $scope.drop_minimumInputLength) pesquisar = false;
                    }
                    if (pesquisar) $scope.refreshFunction(valor);
                }
            }

            //#endregion

            //#region Minimum Input Length

            /* Quantidade mínima de caracteres para disparar uma nova pesquisa na API */
            /* Valor Default: 3 */

            $scope.drop_minimumInputLength = "3";

            if ($scope.minimumInputLength != undefined && $scope.minimumInputLength != null && $scope.minimumInputLength != "" && $scope.minimumInputLength > 0) {
                $scope.drop_minimumInputLength = $scope.minimumInputLength;
            }

            //#endregion

            //#region Refresh Delay

            /* Tempo de Delay para realizar a consulta na API, valor atribuído em milisegundos */
            /* Valor Default: 1000 ( 1seg ) */

            $scope.drop_refreshDelay = 0;

            if ($scope.refreshDelay != undefined && $scope.refreshDelay != null && $scope.refreshDelay != "" && $scope.refreshDelay > 0) {
                $scope.drop_refreshDelay = $scope.refreshDelay;
            }

            //#endregion

            //#endregion

            //#region PlaceHolder

            $scope.drop_placeHolder = "(Selecione)";

            if ($scope.placeHolder != undefined && $scope.placeHolder != null && $scope.placeHolder != "") {
                $scope.drop_placeHolder = $scope.placeHolder;
            }

            //#endregion

            //#region Selected

            $scope.onSelected = function (selected) {
                if ($scope.selected == undefined || $scope.selected == null) $scope.selected = {};

                $scope.selected = selected;
            }

            //#endregion

            //#region Width

            $scope.drop_style = "width:";

            if ($scope.width == undefined || $scope.width == null || $scope.width == "") {
                $scope.drop_style += "300px;";
            }
            else $scope.drop_style += $scope.width + "px;";

            //#endregion

            //#region Clear

            $scope.drop_allowClear = true;

            if ($scope.clear != undefined && $scope.clear != null && $scope.clear == false) {
                $scope.drop_allowClear = $scope.clear;
            }

            //#endregion

            //#region List

            $scope.drop_list = [];

            $scope.drop_list = $scope.list;

            if ($scope.list != undefined && $scope.list != null && $scope.list.length > 0) {
                $scope.drop_list = $scope.list;
            }

            //#endregion

            //#region List Id

            $scope.drop_id = "";

            if ($scope.listId != undefined && $scope.listId != null && $scope.listId != "") {
                $scope.drop_id = $scope.listId;
            }

            //#endregion

            //#region List Label

            $scope.drop_label = undefined;

            if ($scope.listLabel != undefined && $scope.listLabel != null && $scope.listLabel != "") {
                $scope.drop_label = $scope.listLabel;
            }

            //#endregion

            //#region List Label Filter

            $scope.drop_labelFilter = 'label';

            if ($scope.listLabelFilter != undefined && $scope.listLabelFilter != null && $scope.listLabelFilter != "") {
                $scope.drop_labelFilter = $scope.listLabelFilter;
            }

            //#endregion

            //#region List Filter

            //#endregion

            //#region List Filter Params

            //#endregion

            //#region List Label Filter Params

            $scope.drop_paramsFilter = null;

            if ($scope.listLabelFilterParams != undefined && $scope.listLabelFilterParams != null && $scope.listLabelFilterParams != null) {
                $scope.drop_paramsFilter = $scope.listLabelFilterParams;
            }

            //#endregion

            //#region Disabled

            $scope.drop_disabled = false;

            if ($scope.disabled != undefined && $scope.disabled != null) {
                $scope.drop_disabled = $scope.disabled;
            }

            //#endregion
        },
        templateUrl: '/app/globalApp/templates/dropDown.html'
    };
});

globalMdl.filter('customHighlight', [function () {

    var accentMap = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'Ä': 'a', 'ä': 'a', 'Ë': 'e', 'ë': 'e', 'Ï': 'i', 'ï': 'i', 'Ö': 'o', 'ö': 'o', 'Ü': 'u', 'ü': 'u',
        'â': 'a', 'ê': 'e', 'ô': 'o', 'Â': 'A', 'Ê': 'E', 'Ô': 'O',
        'ã': 'a', 'õ': 'o', 'Ã': 'A', 'Õ': 'O',
        'à': 'a', 'À': 'A',
        'Ç': 'C', 'ç': 'c'
    };

    function accentFold(s) {
        if (!s) {
            return '';
        }

        var ret = '',
            char;

        for (var i = 0; i < s.length; i++) {
            char = s.charAt(i);
            ret += accentMap[char] || char;
        }

        return ret;
    }

    function escapeRegexp(queryToEscape) {
        return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function normalize(s) {
        if (!s) {
            return '';
        }

        return accentFold(s).toLowerCase();
    }

    return function (matchItem, query) {
        if (!matchItem || !query) {
            return matchItem;
        }

        // Get the normalized and escaped version of the search query
        query = escapeRegexp(normalize(query));

        var startIndex,
            endIndex,
            toBeReplaced,
            highlightedItem = '';

        // Find and replace all occurrences of query inside matchItem, while preserving case and accents

        while (matchItem.length) {
            startIndex = normalize(matchItem).indexOf(query);

            if (startIndex !== -1) {
                endIndex = startIndex + query.length;

                toBeReplaced = matchItem.substring(startIndex, endIndex);

                highlightedItem += matchItem.substring(0, startIndex) +
                        '<span class="ui-select-highlight">' + toBeReplaced + '</span>';

                matchItem = matchItem.substring(endIndex, matchItem.length);
            } else {
                // Add the rest of the string
                highlightedItem += matchItem;
                matchItem = '';
            }
        }

        return highlightedItem;
    };
}
]);