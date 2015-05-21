/**
 * Created by wangqr on 3/27/2015.
 */
app.factory('loginService',function($http, $location, sessionService,httpFacade){
    return{
        login : function(data,scope,event){
            event.currentTarget.disabled=true;
            httpFacade.checkUser(data).success(function(success){
                var uid = success.uid;
                if(typeof uid == 'undefined')
                {
                    scope.loginError = '登录失败';
                }
                else
                {
                    sessionService.set('uid',uid);
                    $location.path('/share');
                }
            }).error(function (errors) {
                event.currentTarget.disabled=false;
                scope.loginError = errors;
            });
        },

        logout:function(){
            sessionService.destroy('uid');
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