var app = angular.module('shareApp',['ngRoute']);
var rootUrl = 'http://share.in-sync.co';
var test ;
app.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider){

    $locationProvider.html5Mode(false);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
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
        .when('/mypublished/update/:updateSpeechId',{
            templateUrl : 'modules/share/updateshare.html',
            controller : 'UpdateSpeechController'
        })
        .when('/mypublished',{
            templateUrl : 'modules/share/mypublished.html',
            controller : 'ShareController'
        })
        .when('/unschedule',{
            templateUrl : 'modules/share/unschedule.html',
            controller : 'ShareController'
        })
        .when('/onschedule',{
            templateUrl : 'modules/share/schedule.html',
            controller : 'ShareController'
        })
        .when('/mycommented',{
            templateUrl : 'modules/share/mycommented.html',
            controller : 'ShareController'
        })
        .when('/myinterested',{
            templateUrl : 'modules/share/myinterested.html',
            controller : 'ShareController'
        })
        .when('/myfeedbacked',{
            templateUrl : 'modules/share/myfeedbacked.html',
            controller : 'ShareController'
        })
        .otherwise({redirectTo:'/login'})
}]);

app.run(function ($rootScope, $location, loginService) {
    var routespermission = ['/share','/iwanttoshare','/mypublished','/unschedule','/onschedule','/mycommented','/myinterested','/myfeedbacked'];
    var updatePattern = /^\/mypublished\/update\//;
    var speechByIdPattern = /^\/share\//;
    $rootScope.$on('$routeChangeStart',function(){
        if( routespermission.indexOf($location.path()) !=-1 || updatePattern.test($location.path()) ||speechByIdPattern.test($location.path()))
        {
            var connected = loginService.islogged();
            if(!connected)
            {
                $location.path('/login');
            }
        }
    });
});

app.controller('AppController',['$scope','loginService','sessionService',function ($scope,loginService,sessionService) {
    $scope.logout = function(){
        loginService.logout(sessionService);
    };
}]);

