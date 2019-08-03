globalMdl.directive('tabs', function () {
    return {
        //scope: true,
        scope: {},
        replace: true,
        restrict: 'E',
        transclude: true,
        templateUrl: '/app/globalApp/templates/tabs.html',
        controller: function ($scope) {

            $scope.currentTab = 0;

            $scope.tabList = [];

            $scope.selectTab = function (index) {
                $scope.currentTab = index;
            };

            return $scope;
        }
    }
})

globalMdl.directive('tab', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        template: '<div ng-show="showTab()" ng-transclude></div>',
        link: function (scope, element, attrs, tabs) {

            var tabId = tabs.tabList.length;

            scope.showTab = function () {
                return tabId == tabs.currentTab;
            };

            tabs.tabList.push(attrs.header);
        }
    }
});