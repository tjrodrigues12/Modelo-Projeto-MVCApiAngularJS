globalMdl.directive('validationDecorator', function () {
    return {
        scope: {
            validationDecorator: '@'
        },
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl) {

            scope.form = formCtrl;

            if (scope.validationDecorator != undefined && scope.validationDecorator != "") {
                scope.fieldName = scope.validationDecorator;
            } else {
                scope.fieldName = angular.element(el[0].querySelector("[name]")).attr('name');
            }
            
            scope.$watch(
                function (scope) {

                    if (scope == undefined || scope == null) return;

                    if (scope.form[scope.fieldName] == undefined || scope.form[scope.fieldName] == null) return;

                    var retorno = (scope.form[scope.fieldName].$touched || scope.form.$submitted) && scope.form[scope.fieldName].$invalid;

                    if (el.find('drop-down').length == 0) {

                        var span = el.find('span');

                        var icon = span.find('i');

                        if (retorno == true) {
                            if (icon.length == 0) span.append(angular.element('<i class="icon-remove-sign"></i>'));
                        }
                        else {
                            icon.remove();
                            //if (icon.length == 0) span.append(angular.element('<i class="icon-ok-sign"></i>'));
                        }
                    }                    

                    return retorno;
                },
                function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        el.toggleClass('has-error', newVal);
                    }
                }
            );
        }
    }
});