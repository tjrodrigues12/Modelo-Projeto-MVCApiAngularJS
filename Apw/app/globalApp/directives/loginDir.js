globalMdl.directive('login', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'loginCtrl',
        templateUrl: '/app/globalApp/templates/login.html'
    };
});