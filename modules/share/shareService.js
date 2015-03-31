/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('shareService',function($http,$location,sessionService){
    return {
        speeches : function(){
            return $http.get('http://share.in-sync.co:2403/speeches');
        },

        iWantToShare : function(data,scope){
            var $promise = $http.post('http://share.in-sync.co:2403/speeches',data);
            $promise.then(function(success){
                $location.path('/share');
            },function(error){
                scope.iWantToShareFailtext =  error.errors;
                $location.path('/share');
            })
        },

        submitComment : function(data,scope) {
            var $promise = $http.post('http://share.in-sync.co:2403/speech-comments', data);
            $promise.then(function (success) {
                $http.get('http://share.in-sync.co:2403/speeches').success(function(response){
                     scope.speechesList = response;
                });
                $location.path('/share');
            }, function (error) {
                scope.commitCommentFailtext = error.errors;
                $location.path('/share');
            })
        },

        addInterest : function(data,scope) {
            var $promise = $http.post('http://share.in-sync.co:2403/speech-interested', data);
            $promise.then(function (success) {
                var speechID = success.data.speechID;
                var sessionName = speechID + "Interest";
                sessionService.set(sessionName,speechID);
                $location.path('/share');
            }, function (error) {
                scope.commitInterestFailtext = error.errors;
                $location.path('/share');
            })
        }
    }
});
