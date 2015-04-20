/**
 * Created by wangqr on 4/19/2015.
 */
app.controller('AdminController',  ['$scope','$rootScope','initService',function ($scope,$rootScope,initService) {
    initService.init();
    $rootScope.isAdmin = true;
}]);