globalMdl.directive('trocarUnidadeEscolar', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'trocarUnidadeEscolarCtrl',
        templateUrl: '/app/globalApp/templates/trocarUnidadeEscolar.html'
    };
});