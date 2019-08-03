var globalMdl = angular.module('globalMdl', ['ngRoute', 'ngTouch', 'cgBusy', 'ngSanitize', 'ui.select', 'ui.grid',
    'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.expandable', 'ui.grid.pinning', 'ui.utils.masks',
    'ngAnimate', 'ui.bootstrap', 'ghiscoding.validation', 'pascalprecht.translate', 'toastr']);

globalMdl.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

globalMdl.config(['$provide','$locationProvider',
    function ($provide,$locationProvider) {
        $provide.decorator('GridOptions', ['$delegate', 'i18nService',
            function ($delegate, i18nService) {
                var gridOptions = angular.copy($delegate);
                gridOptions.initialize = function (options) {
                    var initOptions = $delegate.initialize(options);
                    return initOptions;
                };
                i18nService.setCurrentLang('pt-br');
                return gridOptions;
            }]);

        $locationProvider.hashPrefix('');

        /* Quando usamos ui-number-mask="0" e configuramos o modelo para o valor zero,
         * o valor mostrado no input passava ser undefined mesmo que no modelo comportasse
         * zero,nessa confuguração trocamos undefined por zero.
        */
        $provide.decorator('uiNumberMaskDirective', ['$delegate',
            function ($delegate) {
                var directive = $delegate[0];
                var link = directive.link;

                directive.compile = function () {
                    return function (scope, element, attrs, ngModelCtrl) {
                        link.apply(this, arguments);

                        ngModelCtrl.$formatters.unshift(function (value) {
                            if (value === 'undefined') {
                                value = '';
                            }
                            return value;
                        });
                    };
                };

                return $delegate;

            }]);
    }
]);

globalMdl.value('cgBusyDefaults', {
    message: 'Aguarde...',
    backdrop: true,
    delay: 0
});

globalMdl.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/Scripts/angular-validation/locales/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('pt-br');
    $translateProvider.useSanitizeValueStrategy('sanitize');
});

globalMdl.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        //positionClass: 'toast-top-full-width',
        //positionClass: 'toast-top-center',
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});

globalMdl.run(['$templateCache', function ($templateCache) {
    $templateCache.put('directives/toast/toast.html', '<toaster></toaster>');
    $templateCache.put('directives/progressbar/progressbar.html',
      "<div>Your progressbar here</div>"
    );
}]);

//#region Filters

globalMdl.filter('int', function () {
    return function (valor) {
        if (valor === undefined) return 0;
        if (valor === null) return 0;
        if (valor === '') return 0;
        return parseInt(valor);
    };
});

globalMdl.filter('decimal', ['$filter',
    function ($filter) {
        return function (valor, casasDecimais) {
            if (valor === undefined) return "-";
            if (valor === null) return "-";
            if (valor === '') return "-";
            return $filter('number')(valor, casasDecimais || 2);
        };
    }
]);

globalMdl.filter('moeda', ['$filter',
    function ($filter) {
        return function (valor) {
            if (valor === undefined) return "-";
            if (valor === null) return "-";
            if (valor === '') return "-";
            return $filter('currency')(valor, 'R$ ');
        };
    }
]);

globalMdl.filter('cpf', function () {
    return function (valor) {
        var cpf = "-";
        if (valor != undefined && valor != null && valor.length == 11) {
            cpf = valor.substr(0, 3) + '.' + valor.substr(3, 3) + '.' + valor.substr(6, 3) + '-' + valor.substr(9, 2);
        }
        return cpf;
    };
});

globalMdl.filter('cnpj', function () {
    return function (valor) {
        var str = valor + '';
        str = str.replace(/\D/g, '');
        str = str.replace(/^(\d{2})(\d)/, '$1.$2');
        str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
        str = str.replace(/(\d{4})(\d)/, '$1-$2');
        return str;
    };
});

globalMdl.filter('cep', function () {
    return function (valor) {
        var cep = "-";
        if (valor != undefined && valor != null && valor.length == 8) {
            cep = valor.substr(0, 5) + '-' + valor.substr(5, 3);
        }
        return cep;
    };
});

globalMdl.filter('presenca', function () {
    return function (valor) {
        if (valor == true) {
            return 'Presente';
        }
        else if (valor == false) {
            return 'Faltou';
        }
        return '-';
    };
});

globalMdl.filter('situacaoTurmaMes', function () {
    return function (valor) {
        if (valor > 0) {
            return 'Cadastrado';
        }
        else {
            return 'Não Cadastrado';
        }
    };
});



globalMdl.filter('verificaFrequencia', function () {
    return function (valor) {
        var lancamento = 'Folha não gerada';
        if (valor > 0) {
            lancamento = 'Folha gerada';
        }
        return lancamento;
    };
});

globalMdl.filter('diaSemana', function () {
    return function (diaSemanaId) {
        var diaSemana = "";
        
        if (diaSemanaId == undefined || diaSemanaId == null)
            diaSemana = "-";
        else if (diaSemanaId === 0)
            diaSemana = "Domingo";
        else if (diaSemanaId === 1)
            diaSemana = "Segunda-feira";
        else if (diaSemanaId === 2)
            diaSemana = "Terça-feira";
        else if (diaSemanaId === 3)
            diaSemana = "Quarta-feira";
        else if (diaSemanaId === 4)
            diaSemana = "Quinta-feira";
        else if (diaSemanaId === 5)
            diaSemana = "Sexta-feira";
        else if (diaSemanaId === 6)
            diaSemana = "Sábado";

        return diaSemana;
    };
});

globalMdl.filter('meses', function () {
    return function (mesId) {
        var mes = "";

        if (mesId == undefined || mesId == null)
            mes = "-";
        else if (mesId === 1)
            mes = "Janeiro";
        else if (mesId === 2)
            mes = "Fevereiro";
        else if (mesId === 3)
            mes = "Março";
        else if (mesId === 4)
            mes = "Abril";
        else if (mesId === 5)
            mes = "Maio";
        else if (mesId === 6)
            mes = "Junho";
        else if (mesId === 7)
            mes = "Julho";
        else if (mesId === 8)
            mes = "Agosto";
        else if (mesId === 9)
            mes = "Setembro";
        else if (mesId === 10)
            mes = "Outubro";
        else if (mesId === 11)
            mes = "Novembro";
        else if (mesId === 12)
            mes = "Dezembro";

        return mes;
    };
});

globalMdl.filter('tipoOcorrencia', function () {
    return function (tipoOcorrenciaId) {
        var retorno = "-";

        if (tipoOcorrenciaId === 1)
            retorno = "Presença";
        else if (tipoOcorrenciaId === 2)
            retorno = "Viagem a serviço";
        else if (tipoOcorrenciaId === 3)
            retorno = "Realização de serviço eventual fora do local de trabalho";
        else if (tipoOcorrenciaId === 4)
            retorno = "Participação de curso, seminário ou evento técnico similar";
        else if (tipoOcorrenciaId === 5)
            retorno = "Falta Justificada ao serviço";
        else if (tipoOcorrenciaId === 6)
            retorno = "Falta não justificada";

        return retorno;
    };
});

globalMdl.filter('tipoOcorrenciaSigla', function () {
    return function (tipoOcorrenciaId) {
        var retorno = "-";

        if (tipoOcorrenciaId === 1)
            retorno = "P";
        else if (tipoOcorrenciaId === 2)
            retorno = "VS";
        else if (tipoOcorrenciaId === 3)
            retorno = "RSFT";
        else if (tipoOcorrenciaId === 4)
            retorno = "PCE";
        else if (tipoOcorrenciaId === 5)
            retorno = "FJ";
        else if (tipoOcorrenciaId === 6)
            retorno = "FNJ";

        return retorno;
    };
});

globalMdl.filter('tipoOcorrenciaBadge', function () {
    return function (tipoOcorrenciaId) {
        var retorno = "";

        if (tipoOcorrenciaId === 1)
            retorno = "badge badge-success";
        else if (tipoOcorrenciaId === 2)
            retorno = "badge badge-info";
        else if (tipoOcorrenciaId === 3)
            retorno = "badge badge-purple";
        else if (tipoOcorrenciaId === 4)
            retorno = "badge badge-grey";
        else if (tipoOcorrenciaId === 5)
            retorno = "badge badge-warning";
        else if (tipoOcorrenciaId === 6)
            retorno = "badge badge-danger";

        return retorno;
    };
});

globalMdl.filter('formataHorarioCurto', function () {
    return function (horario) {
        if (horario == undefined || horario == null || horario == '') {
            return "-"
        }
        else {
            var list = horario.split(':')
            return (list[0] + ':' + list[1]);
        }       
    };
});

globalMdl.filter('formataPeridoHorarioCurto', function () {
    return function (horario) {
        if (horario == undefined || horario == null || horario == '') {
            return "-"
        }
        else {
            var list = horario.split(':')
            return (list[0] + ':' + list[1] + ' as ' + list[3] + ':' + list[4]);
        }
    };
});

globalMdl.filter('formataDataFormatoCurto', function () {
    return function (data) {
        if (data == undefined || data == null || data == '') {
            return "-"
        }
        else {
            var list = data.split('-')
            return (list[2].substring(0,2) + '/' + list[1]);
        }
    };
});

globalMdl.filter('data', ['$filter',
    function ($filter) {
        /* A propriedade valor tem que ser do tipo DateTime ou DateTime? */
        return function (valor, formato) {
            return (!!valor) ? $filter('date')(valor, formato || 'dd/MM/yyyy') : '-';
        };
    }
]);

globalMdl.filter('telefone', function () {
    return function (valor) {
        if (valor == null) return "-";
        valor = valor.replace(/\D/g, "");             //Remove tudo o que não é dígito
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return valor;
    };
});

globalMdl.filter('unique', function () {
    return function (list, key, prop) {
        var unique = {};
        var uniqueList = [];
        if (list != undefined && list != null) {
            for (var i = 0; i < list.length; i++) {
                if (typeof unique[list[i][key]] == "undefined") {
                    unique[list[i][key]] = "";
                    if (prop != undefined && prop != null && prop != '') uniqueList.push(list[i][key]);
                    else uniqueList.push(list[i]);
                }
            }
        }

        return uniqueList;
    };
});

globalMdl.filter('label', function () {
    return function (valor, label, tipo) {
        if (label == undefined || label == null) label = "-";
        if (valor === undefined) return label;
        if (valor === null) return label;
        if (valor === '') return label;
        if (tipo != undefined && tipo != null && tipo != '') valor = tipo == "prefix" ? label + valor : valor + label;
        return valor;
    };
});

globalMdl.filter('ativo', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor == true ? 'Ativo' : 'Inativo';
    };
});

globalMdl.filter('situacaoFormacao', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor == true ? 'Concluído' : 'Em Andamento';
    };
});

globalMdl.filter('tipoInscricaoCandidato', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        switch (valor) {
            case 1:
                return "Processo Seletivo";
                break;
            case 2:
                return "Autorização";
                break;
        }
        return "-";
    };
});

globalMdl.filter('situacaoInscricaoCandidato', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        switch (valor) {
            case 1:
                return "Pendente";
                break;
            case 2:
                return "Deferido";
                break;
            case 3:
                return "Indeferido";
                break;
        }
        return "-";
    };
});

globalMdl.filter('logico', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor == true ? 'Sim' : 'Não';
    };
});

globalMdl.filter('logicoBadge', function () {
    return function (valor) {
        if (valor === undefined) return "";
        if (valor === null) return "";
        if (valor === '') return "";
        return valor == true ? 'badge badge-success' : 'badge badge-danger';
    };
});

globalMdl.filter('sexo', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor == 'M' ? 'Masculino' : valor == 'F' ? 'Feminino' : '-';
    };
});

globalMdl.filter('cardinal', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor + 'º';
    };
});

globalMdl.filter('filtroRemoverItemAdicionado', function () {
    return function (listaA, listaB, colunaChaveListaA, colunaChaveListaB) {
        if (listaA == null || listaB == null) return listaA;
        if (colunaChaveListaB == undefined || colunaChaveListaB == '') colunaChaveListaB = colunaChaveListaA;
        var out = [];
        for (var i = 0; i < listaA.length; i++) {
            var contem = false;
            for (var j = 0; j < listaB.length; j++) {
                if (listaA[i][colunaChaveListaA] == listaB[j][colunaChaveListaB]) {
                    contem = true;
                }
            }

            if (!contem) out.push(listaA[i]);
        }
        return out;
    }
});

globalMdl.filter('filtroPorId', function () {
    return function (lista, colunaId, Id) {

        if (colunaId == undefined || colunaId == null)
            return lista;

        if (Id == undefined || Id == null || Id == "")
            return lista;

        if (lista == undefined || lista == null)
            return lista;

        var out = [];

        for (var i = 0; i < lista.length; i++) {

            if (lista[i][colunaId] == Id) {
                out.push(lista[i]);
            }
        }
        return out;
    }
});

globalMdl.filter('globalFilter', ['$filter', '$injector',
    function ($filter, $injector) {

        var filterError = "The following filter does not exist: ";

        return function (value, filterName, options) {
            if (noFilterProvided(filterName)) { return value; }
            if (filterDoesNotExistInAngular(filterName)) { console.error(filterError + "\"" + filterName + "\""); return value; }
            if (options != undefined && options != null) return $filter(filterName)(value, applyOptions(options));
            return $filter(filterName)(value);
        };

        function noFilterProvided(filterName) {
            return !filterName || typeof filterName !== "string" || !filterName.trim();
        }

        function filterDoesNotExistInAngular(filterName) {
            return !$injector.has(filterName + "Filter");
        }

        function applyOptions(options) {
            if (!options) { return undefined; }
            return options;
        }
    }
]);

globalMdl.filter('versaoPagamento', function () {
    return function (valor) {
        if (valor === undefined) return "-";
        if (valor === null) return "-";
        if (valor === '') return "-";
        return valor == 1 ? 'Final' : 'Simulação';
    };
});

//#endregion

//#region Directives

globalMdl.directive('ngNumeros', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                if (!angular.isUndefined(value) && value != null && value != '') {
                    $element[0].value = value.toString().replace(/[^0-9]+/g, '');
                }
            });
        }
    }
});

globalMdl.directive('toaster', function () {
    return {
        templateUrl: '/app/globalApp/templates/toaster.html'
    }
});

globalMdl.directive('ngModal', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            tipo: '@',
            title: '@',
            texto: '@'
        },
        templateUrl: '/app/globalApp/templates/modal.html'
    }
});

//#endregioon