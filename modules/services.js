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
        _getSpeechById , _deleteComment ,_getFeedbackById,_saveFeedback,_deleteFeedback ;
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
                data : data
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
        deleteFeedback : _deleteFeedback
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
