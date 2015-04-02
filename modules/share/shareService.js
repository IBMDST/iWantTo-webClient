/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('shareService',function($http,$location,sessionService){
    return {
        speeches : function(){
            return $http.get(rootUrl + '/speeches');
        },

        iWantToShare : function(data,scope){
            var $promise = $http.post(rootUrl + '/speeches',data);
            $promise.then(function(success){
                $location.path('/share');
            },function(error){
                scope.iWantToShareFailtext =  error.errors;
                $location.path('/share');
            })
        },

        submitComment : function(data,scope) {
            var $promise = $http.post(rootUrl + '/speech-comments', data);
            $promise.then(function () {
                $http.get(rootUrl + '/speeches').success(function(response){
                    scope.speechesList = response;
                });
                $location.path('/share');
            }, function (error) {
                scope.commitCommentFailtext = error.errors;
                $location.path('/share');
            })
        },


        showInterest : function(){
           return $http({
                method : 'GET',
                url : rootUrl + '/speech-interested',
                params : {'userID' : sessionService.get('uid')}
            });
        },

        interestId : function(speechID){
            return $http({
                method : 'GET',
                url : rootUrl + '/speech-interested',
                params : {'userID' : sessionService.get('uid') , 'speechID' : speechID}
            });
        },

        deleteInterest : function(ID,speechId, scope){
            $http({
                method : 'DELETE',
                url : rootUrl + '/speech-interested/' + ID
            }).success(function(){
                $http.get(rootUrl + '/speeches').success(function(response){
                    scope.speechesList = response;
                    eval("scope.interest" + speechId + "=" + 'false');
                });
                $location.path('/share');
            });
        },

        addInterest : function(speechID,scope){
            $http({
                method : 'POST',
                url : rootUrl + '/speech-interested',
                data : {'userID' : sessionService.get('uid') , 'speechID' : speechID, 'createdOn' : new Date().valueOf()}
            }).success(
                function(){
                    $http.get(rootUrl + '/speeches').success(function(response){
                        scope.speechesList = response;
                        eval("scope.interest" + speechID + "=" + 'true');
                    });
                    $location.path('/share');
                }
            );
        }
    }
});
