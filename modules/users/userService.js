/**
 * Created by wangqr on 3/27/2015.
 */
app.factory('loginService',function($http, $rootScope,$location, sessionService,httpFacade){
    return{
        login : function(data,scope,event){
            event.currentTarget.disabled=true;
            httpFacade.checkUser(data).success(function(success){
                var uid = success.uid;
                if(typeof uid == 'undefined')
                {
                    scope.loginError = 'Not login successfully';
                }
                else
                {
                    sessionService.set('uid',uid);
                    console.log("api admin");
                    if(success.isAdmin)
                    {
                        sessionService.set('isAdmin',true);
                        $rootScope.isAdmin = true;
                        $location.path('/admin');
                    }
                    else
                    {
                         sessionService.set('isAdmin',false);
                         $rootScope.isAdmin = false;
                         $location.path('/share');
                    }
                }
            }).error(function (errors) {
                event.currentTarget.disabled=false;
                scope.loginError = errors;
            });
        },

        logout:function(){
            sessionService.destroy('uid');
            sessionService.destroy('isAdmin');
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
        },

        isAdmin : function()
        {

            if(sessionService.get('isAdmin')=='true')
            {
                console.log('session true');
                return true;
            }
            else
            {
                console.log('session false');
                return false;
            }
        }
    }
});



app.factory('signupService', function($http, $location,sessionService,httpFacade,initService){
    return{
        signup : function(data,scope,event){
            initService.buttonDisabled(event);
            httpFacade.saveUser(data).success(function (success) {
                var uid = success.uid;
                sessionService.set('uid',uid);
                $location.path('/share');
            }).error(function(errors){
                initService.buttonAble(event);
                scope.signupFailtext = errors;
            })
        }
    }
});