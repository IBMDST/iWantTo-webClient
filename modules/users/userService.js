/**
 * Created by wangqr on 3/27/2015.
 */
app.factory('loginService',function($http, $location, sessionService){
    return{
        login : function(data,scope){
            var $promise = $http.post('http://share.in-sync.co:2403/users/login',data);
            $promise.then(function(success){
                var uid = success.data.uid;
                    sessionService.set('uid',uid);
                    $location.path('/share');
            },function(error){
                $location.path('/login');
                scope.loginError = "Username and password are not matched ";
            })
        },

        logout:function(scope){
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

app.factory('sessionService', ['$http', function($http){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $http.post('http://share.in-sync.co:2403/users/logout');
            return sessionStorage.removeItem(key);
        }
    };
}]);

app.factory('signupService', function($http, $location,sessionService){
    return{
        signup : function(data,scope){
            var $promise = $http.post('http://share.in-sync.co:2403/users',data);
            $promise.then(function(success){
                var uid = success.data.id;
                sessionService.set('uid',uid);
                $location.path('/share');

            },function(error){
                scope.signupFailtext = "Name "+ error.data.errors.username;
                $location.path('/signup');
            })
        }
    }
});