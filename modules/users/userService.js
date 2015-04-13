/**
 * Created by wangqr on 3/27/2015.
 */
app.factory('loginService',function($http, $location, sessionService,httpFacade){
    return{
        login : function(data,scope){
            httpFacade.checkUser(data).success(function(success){
                var uid = success.uid;
                sessionService.set('uid',uid);
                $location.path('/share');
            }).error(function (errors) {
                switch(errors.status) {
                    case 500: {
                        scope.message = "Something went wrong!";
                        break;
                    }
                    case 401:{
                        scope.loginError = "Username and password are not matched";
                        break;
                    }
                }
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
                switch(errors.status) {
                    case 500: {
                        scope.message = "Something went wrong!";
                        break;
                    }
                    case 400:{
                        scope.signupFailtext = "username "+ errors.errors.username;
                        break;
                    }
                }
            })
        }
    }
});