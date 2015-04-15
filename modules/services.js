/**
 * Created by wangqr on 4/9/2015.
 */
app.factory('sessionService', ['$http','$rootScope', function($http,$rootScope){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $rootScope.isLogged = false;
            $http.post(rootUrl + '/users/logout');
            return sessionStorage.removeItem(key);
        }
    };
}]);

app.factory("httpFacade", function ($http) {
    var debug = false;
    var  _checkUser,_saveUser,_getSpeeches , _saveSpeech ,_updateSpeech , _getInterestById,_saveComment ,_deleteInterest, _saveInterest,
        _getSpeechById , _deleteComment ,_getFeedbackById,_saveFeedback,_deleteFeedback,_updateFeedback,_getSpeechByFixed
        ,_getCommentById;
    if(!debug)
    {
        _checkUser = function (data) {
            return $http({
                method: 'POST',
                url: rootUrl + '/users/login',
                data: $.param(data)
            });
        };
         _saveUser = function(data) {
            return $http({
                method: 'POST',
                url: rootUrl + '/users',
                data: $.param(data)
            });
        };

         _getSpeeches = function() {
            return $http({
                method: 'GET',
                url: rootUrl + '/speeches'
            });
        };

        _getSpeechById = function(data){
            return $http({
                method : 'GET',
                url : rootUrl + '/speeches',
                params : data
            });
        };
        _getSpeechByFixed = function(data)
        {
            return $http({
                method : 'GET',
                url : rootUrl + '/speeches',
                params : data
            });
        };
         _saveSpeech = function(data) {
            return $http({
                method: 'POST',
                url: rootUrl + '/speeches',
                data: $.param(data)
            });
        };

         _updateSpeech = function(data,speechId) {
            return $http({
                method: 'PUT',
                url: rootUrl + '/speeches/' + speechId,
                data : $.param(data)
            });
        };

         _getInterestById = function(data){
            return $http({
                method : 'GET',
                url : rootUrl + '/speech-interested',
                params : data
            });
        };

        _deleteInterest = function(data){
            return $http({
                method : 'DELETE',
                url : rootUrl + '/speech-interested/' + data
            });
        };

        _saveInterest = function(data){
            return  $http({
                method : 'POST',
                url : rootUrl + '/speech-interested',
                data: $.param(data)
            });
        };

         _saveComment = function(data){
            return $http({
                method: 'POST',
                url: rootUrl + '/speech-comments',
                data: $.param(data)
            });
        };

        _deleteComment = function(data){
            return $http({
                method : 'DELETE',
                url : rootUrl + '/speech-comments/' + data
            });
        };

        _getCommentById = function(data){
            return $http({
                method : 'GET',
                url : rootUrl + '/speech-comments',
                params : data
            });
        };

        _getFeedbackById = function(data){
            return $http({
                method : 'GET',
                url : rootUrl + '/speech-feedbacks',
                params : data
            });
        };

        _saveFeedback = function(data){
            return  $http({
                method : 'POST',
                url : rootUrl + '/speech-feedbacks',
                data: $.param(data)
            });
        };

        _deleteFeedback = function(data){
            return  $http({
                method : 'DELETE',
                url : rootUrl + '/speech-feedbacks/' + data
            });
        };

        _updateFeedback = function(data, feedbackId){
            return  $http({
                method: 'PUT',
                url: rootUrl + '/speech-feedbacks/' + feedbackId,
                data : $.param(data)
            });
        };
    }
    else
    {
         var rootTestUrl = 'http://localhost:63342/IWantTo/modules/json/'
          _checkUser = function () {
              return $http.get(
                  rootTestUrl+'checkuser.json'
              );
        };
            _saveUser = function() {
            return $http.get(
                rootTestUrl+'checkuser.json'
            );
        };

         _getSpeeches = function() {
             return $http.get(
                 rootTestUrl+'speeches.json'
             );
        };

        _getSpeechByFixed = function(data)
        {
            return $http.get(
                rootTestUrl+'speeches.json'
            );
        };

         _saveSpeech = function() {
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

         _updateSpeech = function() {
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

         _getInterestById = function(){
             return $http.get(
                 rootTestUrl+'speech-interested.json'
             );
        };

         _saveComment = function(){
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

         _deleteInterest = function(){
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

         _saveInterest = function(){
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

         _getSpeechById = function(){
             return $http.get(
                 rootTestUrl+'speeches-byuserid.json'
             );
        };

         _deleteComment = function(){
             return $http.get(
                 rootTestUrl+'success.json'
             );
        };

        _getFeedbackById = function(){
            return $http.get(
                rootTestUrl+'feedbacks.json'
            );
        };

        _saveFeedback = function(){
            return $http.get(
                rootTestUrl+'success.json'
            );
        };

        _deleteFeedback = function(data){
            return $http.get(
                rootTestUrl+'success.json'
            );
        };

        _updateFeedback = function(data, feedbackId){
            return $http.get(
                rootTestUrl+'success.json'
            );
        };

        _getCommentById = function(data, feedbackId){
            return $http.get(
                rootTestUrl+'speech-comments.json'
            );
        };
    }

    return {
        checkUser : _checkUser,
        saveUser : _saveUser,
        getSpeeches : _getSpeeches,
        saveSpeech : _saveSpeech,
        getInterestById : _getInterestById,
        saveComment : _saveComment,
        deleteInterest : _deleteInterest,
        saveInterest : _saveInterest,
        getSpeechById : _getSpeechById,
        deleteComment : _deleteComment,
        updateSpeech : _updateSpeech,
        getFeedbackById : _getFeedbackById,
        saveFeedback : _saveFeedback,
        deleteFeedback : _deleteFeedback,
        updateFeedback : _updateFeedback,
        getSpeechByFixed : _getSpeechByFixed,
        getCommentById : _getCommentById
    };
});

app.factory('initService', ['$rootScope','loginService','sessionService', function($rootScope,loginService,sessionService){
    return{
        init:function(){
            $rootScope.isLogged = loginService.islogged();
            return sessionService.get('uid');
        }
    };
}]);


app.factory('paintService', function(httpFacade,initService, speechService,branchService){
    var userId = initService.init();
    var data = {'speakerID' : userId};
    var dataUserId = { 'userID' : userId};
    return{


        paint:function(scope,speeches){
            httpFacade.getInterestById(dataUserId).success(function(interest){
                speechService.showSpeeches(speeches,interest,scope);
            });
        },

        paintWithComment:function(scope){
            httpFacade.getSpeeches().success(function(response){
                scope.speechesList = response;
                speechService.showStars(response);
                branchService.speechesByType(scope,'comment',response);
                branchService.speechesByType(scope,'interest',response);
                branchService.speechesByType(scope,'feedback',response);
            });
            httpFacade.getSpeechById(data).success(function(response){
                scope.mySpeechesList = response;
            });

            httpFacade.getSpeechByFixed({'fixed':false}).success(function (response) {
                scope.unscheduledSpeechesList = response;
            });

            httpFacade.getSpeechByFixed({'fixed':true}).success(function (response) {
                scope.scheduledSpeechesList = response;
            });
        },

        paintWithFeedback:function(scope){
            httpFacade.getSpeeches().success(function(response){
                httpFacade.getFeedbackById(dataUserId).success(function(feedbacks){
                    scope.feedbackByCurrentUserList = feedbacks;
                    scope.speechesList = response;
                    speechService.showStars(response);
                    branchService.speechesByType(scope,'comment',response);
                    branchService.speechesByType(scope,'interest',response);
                    branchService.speechesByType(scope,'feedback',response);
                })
            });

            httpFacade.getSpeechById(data).success(function(response){
                    scope.mySpeechesList = response;
                    speechService.showStars(response);
            });

            httpFacade.getSpeechByFixed({'fixed':false}).success(function (response) {
                scope.unscheduledSpeechesList = response;
            });

            httpFacade.getSpeechByFixed({'fixed':true}).success(function (response) {
                scope.scheduledSpeechesList = response;
            });
        },

        paintWithInterest:function(scope,speechId,b){
            httpFacade.getSpeeches().success(function(response){
                scope.speechesList = response;
                eval("scope.interest" + speechId + "=" + b);
                speechService.showStars(response);
                branchService.speechesByType(scope,'comment',response);
                branchService.speechesByType(scope,'interest',response);
                branchService.speechesByType(scope,'feedback',response);
            });

            httpFacade.getSpeechById(data).success(function(response){
                scope.mySpeechesList = response;
            });

            httpFacade.getSpeechByFixed({'fixed':false}).success(function (response) {
                scope.unscheduledSpeechesList = response;
            });

            httpFacade.getSpeechByFixed({'fixed':true}).success(function (response) {
                scope.scheduledSpeechesList = response;
            });
        }
    };
});
