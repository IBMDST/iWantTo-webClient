/**
 * Created by wangqr on 3/27/2015.
 */
app.factory('loginService',function($http, $location, sessionService,httpFacade){
    return{
        login : function(data,scope){
            httpFacade.checkUser(data).success(function(success){
                var uid = success.uid;
                if(typeof uid == 'undefined')
                {
                    scope.loginError = 'Not login successfully';
                }
                else
                {
                    sessionService.set('uid',uid);
                    $location.path('/share');
                }
            }).error(function (errors) {
                scope.loginError = errors;
            });
        },

        logout:function(service){
            service.destroy('uid');
            $location.path('/login');
        },

        islogged : function()
        {
            if(sessionService.get('uid'))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
});



app.factory('signupService', function($http, $location,sessionService,httpFacade){
    return{
        signup : function(data,scope){
            httpFacade.saveUser(data).success(function (success) {
                var uid = success.uid;
                sessionService.set('uid',uid);
                $location.path('/share');
            }).error(function(errors){
                scope.signupFailtext = errors;
            })
        }
    }
});