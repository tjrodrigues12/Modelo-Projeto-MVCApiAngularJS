globalMdl.service('loginSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/Api/Login/';

        this.obterListaDominio = function () {
            return $http.get(serviceBase + 'GetListaDominio').then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.postLogin = function (dadosLogin) {
            return $http.post(serviceBase + 'PostLogin', dadosLogin).then(response => {
                return globalSvc.getResponse(response);
            });
        }

        //this.postLogin = function (dadosLogin) {
        //    return $http.post(serviceBase + 'PostLogin', dadosLogin).then(function (response) {
        //        return globalSvc.getResponse(response);
        //    });
        //}

        //this.postLogin = function (dadosLogin) {
        //    return $http.get(serviceBase + 'PostLogin', { params: dadosLogin }).then(function (response) {
        //        return globalSvc.getResponse(response);
        //    });
        //}
    }
]);