var app = angular.module('loginApp',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/login',{
            templateUrl : 'users/login.html',
            controller : 'LoginController'
        })
        .when('/share', {
            templateUrl: 'share/share.html',
            controller: 'ShareController'
        })
        .when('/signup',{
            templateUrl : 'users/signup.html',
            controller : 'SignupController'
        })
        .when('/iwanttoshare',{
            templateUrl : 'share/iwanttoshare.html',
            controller : 'ShareController'
        })
        .otherwise({redirectTo:'/login'})
}]);

app.run(function ($rootScope, $location, loginService) {
    var routespermission = ['/share','/iwanttoshare'];
    $rootScope.$on('$routeChangeStart',function(){
        if( routespermission.indexOf($location.path()) !=-1)
        {
            var connected = loginService.islogged();
            if(!connected)
            {
                $location.path('/login');
            }
        }
    });

});
