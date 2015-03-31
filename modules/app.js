var app = angular.module('loginApp',['ngRoute']);
var rootUrl = 'http://share.in-sync.co:2403';
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/login',{
            templateUrl : 'modules/users/login.html',
            controller : 'LoginController'
        })
        .when('/share', {
            templateUrl: 'modules/share/share.html',
            controller: 'ShareController'
        })
        .when('/signup',{
            templateUrl : 'modules/users/signup.html',
            controller : 'SignupController'
        })
        .when('/iwanttoshare',{
            templateUrl : 'modules/share/iwanttoshare.html',
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
