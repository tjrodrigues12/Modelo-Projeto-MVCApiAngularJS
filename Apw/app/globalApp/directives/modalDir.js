globalMdl.directive('modal', function () {
    return {
        restrict: 'EA',
        scope: {
            id: '@modalId',
            title: '@modalTitle',
            header: '@modalHeader',
            body: '@modalBody',
            footer: '@modalFooter',
            callbackbuttonleft: '&ngClickLeftButton',
            callbackbuttonright: '&ngClickRightButton'
        },
        templateUrl: '/app/globalApp/templates/modal.html',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.handler = $scope.id;
        }
    };
});