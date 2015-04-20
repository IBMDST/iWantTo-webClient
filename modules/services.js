/**
 * Created by wangqr on 4/9/2015.
 */
var rootUrl = 'http://share.in-sync.co';
//var rootUrl = 'http://share.in-sync.co:2403';

app.factory('sessionService', ['$http','$rootScope','httpFacade', function($http,$rootScope,httpFacade){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $rootScope.isLogged = false;
            httpFacade.logout();
            return sessionStorage.removeItem(key);
        }
    };
}]);

app.factory("httpFacade", function ($http) {
    var debug = true  ;
    var  _checkUser,_saveUser,_getSpeeches , _saveSpeech ,_updateSpeech , _getInterestById,_saveComment ,_deleteInterest, _saveInterest,
        _getSpeechById , _deleteComment ,_getFeedbackById,_saveFeedback,_deleteFeedback,_updateFeedback,_getSpeechByFixed
        ,_getCommentById,_logout,_deleteSpeech;
    if(!debug)
    {
        _checkUser = function (data) {
            return $http({
                method: 'POST',
                url: rootUrl + '/users/login',
                data: $.param(data)
            });
        };

        _logout = function(){
            return $http({
                method: 'POST',
                url: rootUrl + '/users/logout'
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

        _deleteSpeech = function(data){
            return $http({
                method : 'DELETE',
                url : rootUrl + '/speeches/' + data
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

        _deleteSpeech = function() {
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

        _logout = function(){
            return $http.get(
                rootTestUrl+'success.json'
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
        getCommentById : _getCommentById,
        logout : _logout,
        deleteSpeech : _deleteSpeech
    };
});

app.factory('initService', ['$rootScope','loginService','sessionService', function($rootScope,loginService,sessionService){
    return{
        init:function(){
            $rootScope.isLogged = loginService.islogged();
            $rootScope.currentUser = sessionService.get('uid');
            return sessionService.get('uid');
        },

        buttonAble : function(event){
            event.currentTarget.disabled=false;
        },

        buttonDisabled : function(event){
            event.currentTarget.disabled=true;
        }
    };
}]);


app.factory('paintService', function($rootScope,httpFacade, speechService,branchService){
    return{


        paint:function(scope,speeches){
                speechService.showFeedbackForm(speeches,scope);
                speechService.showSpeeches(speeches,scope);
        },


        paintWithComment:function(scope){
            httpFacade.getSpeeches().success(function(response){
                scope.speechesList = response;
                speechService.showStars(response);
                branchService.speechesByType(scope,'mypulished',response);
                branchService.speechesByType(scope,'unschedule',response);
                branchService.speechesByType(scope,'onschedule',response);
                branchService.speechesByType(scope,'comment',response);
                branchService.speechesByType(scope,'interest',response);
                branchService.speechesByType(scope,'feedback',response);
            });
        },

        paintWithFeedback:function(scope){
            httpFacade.getSpeeches().success(function(response){
                    speechService.showFeedbackForm(response,scope);
                    scope.speechesList = response;
                    speechService.showStars(response);
                    branchService.speechesByType(scope,'mypulished',response);
                    branchService.speechesByType(scope,'unschedule',response);
                    branchService.speechesByType(scope,'onschedule',response);
                    branchService.speechesByType(scope,'comment',response);
                    branchService.speechesByType(scope,'interest',response);
                    branchService.speechesByType(scope,'feedback',response);

            });
        },

        paintWithInterest:function(scope,speechId,b){
            httpFacade.getSpeeches().success(function(response){
                scope.speechesList = response;
                eval("scope.interest" + speechId + "=" + b);
                speechService.showStars(response);
                branchService.speechesByType(scope,'mypulished',response);
                branchService.speechesByType(scope,'unschedule',response);
                branchService.speechesByType(scope,'onschedule',response);
                branchService.speechesByType(scope,'comment',response);
                branchService.speechesByType(scope,'interest',response);
                branchService.speechesByType(scope,'feedback',response);
            });

        }
    };
});
