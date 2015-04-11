/**
 * Created by wangqr on 3/27/2015.
 */
app.controller('LoginController',  ['$scope','$rootScope','loginService',function ($scope,$rootScope,loginService) {
    $rootScope.isLogged = loginService.islogged();
    $scope.login = function(data)
    {
        loginService.login(data,$scope);
    };
}]);

app.controller('SignupController',['$scope','signupService',function ($scope,signupService){
    $scope.signUp = function(data){
        var sendMessage =
        {
            'username' : data.username,
            'password' : data.password,
            'email' : data.email,
            'createdOn' : new Date().valueOf()
        };
        signupService.signup(sendMessage,$scope);
    }
}]);