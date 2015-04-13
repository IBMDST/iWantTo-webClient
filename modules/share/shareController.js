/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','$rootScope','initService','loginService','speechService','myShareService','interestService','commentService','feedbackService','$location',function($scope,$rootScope,initService,loginService,speechService,myShareService,interestService,commentService,feedbackService,$location){
    $scope.speechesList = [];
    var userId = initService.init();
    $scope.currentUser = userId;
    var path = $location.path();
    if(path=='/share')
    {
        speechService.getSpeeches().success(function (response) {
            interestService.getInterestByUserId(userId).success(function (interest) {
                speechService.showSpeeches(response,interest,$scope);
            });
            $scope.speechesList = response;
        });
    }
    else if(path=='/mypublished')
    {
        $scope.mySpeechesList = [];
        myShareService.mySpeeches(userId).success(function (response) {
            interestService.getInterestByUserId(userId).success(function (interest) {
                speechService.showSpeeches(response,interest,$scope);
            });
            if(response.length==0){$scope.mypulishedmessage="No speech you published"}
            $scope.mySpeechesList = response;
        });
    }

    $scope.iWantToShare = function(data){
        var sendShareMessage =
        {
            'subject' : data.subject,
            'description' : data.description,
            'speakerID' : userId,
            'createdOn' : new Date().valueOf()
        };
        speechService.addSpeech(sendShareMessage,$scope);
    };

    $scope.swapInterest = function(speechId){
        var interestID;
        var cssId = $('#'+speechId);
        if(cssId.hasClass("glyphicon glyphicon-heart")){
            interestService.getInterestById(speechId,userId).success(function(response){
                if(response.length>0)
                {
                    interestID = response[0].id;
                }
                interestService.deleteInterest(interestID,speechId, $scope);

            });
        }
        if(cssId.hasClass("glyphicon glyphicon-heart-empty"))
        {
            var data = {'userID' : userId , 'speechID' : speechId, 'createdOn' : new Date().valueOf()};
            interestService.addInterest(speechId,data, $scope);

        }
    };

    $scope.activeTabs = [];
    $scope.isOpenActiveTab = function (tab) {
        if ($scope.activeTabs.indexOf(tab) > -1)
        {
            return true;
        }
        else {

            return false;
        }
    };

    $scope.openTab = function (name,id) {
        if ($scope.isOpenActiveTab(name+id)) {
            $scope.activeTabs.splice($scope.activeTabs.indexOf(name+id), 1);
        } else {
            if(name=='comment')
            {
                if($scope.activeTabs.indexOf('meetinginfo'+id)>-1)
                $scope.activeTabs.splice($scope.activeTabs.indexOf('meetinginfo'+id), 1);
                if($scope.activeTabs.indexOf('feedback'+id)>-1)
                $scope.activeTabs.splice($scope.activeTabs.indexOf('feedback'+id), 1);
            }
            else if(name=='meetinginfo')
            {
                if($scope.activeTabs.indexOf('comment'+id)>-1)
                $scope.activeTabs.splice($scope.activeTabs.indexOf('comment'+id), 1);
                if($scope.activeTabs.indexOf('feedback'+id)>-1)
                 $scope.activeTabs.splice($scope.activeTabs.indexOf('feedback'+id), 1);
            }
            else if(name=='feedback')
            {
                if($scope.activeTabs.indexOf('meetinginfo'+id)>-1)
                $scope.activeTabs.splice($scope.activeTabs.indexOf('meetinginfo'+id), 1);
                if($scope.activeTabs.indexOf('comment'+id)>-1)
                $scope.activeTabs.splice($scope.activeTabs.indexOf('comment'+id), 1);
            }
            $scope.activeTabs.push(name+id);
        }
    };



    $scope.deleteComment = function (id) {
        commentService.deleteComment(id,$scope);
    };

    $scope.submitComment = function(data,speechId){
        var sendCommentMessage =
        {
            'userID' : userId,
            'comment' : data,
            'speechID' : speechId,
            'createdOn' : new Date().valueOf()
        };
        commentService.addComment(sendCommentMessage,$scope);
    };

    $scope.submitFeedback = function(comment, speechId){
        var stars = $('#feedback-comment' +speechId+'>input').val();
        if(stars=='')
        {
            alert('Stars is required');
        }
        else
        {
            var data =  {
                'userID' : userId,
                'comment' : comment,
                'speechID' : speechId,
                'createdOn' : new Date().valueOf(),
                'stars' : stars
            };
            feedbackService.addFeedback(data,$scope);
        }
    };

    $scope.deleteFeedback = function (id) {
        feedbackService.deleteFeedback(id,$scope);
    };

}]);

app.controller('UpdateSpeechController', function($scope,$rootScope, $routeParams, speechService, initService) {
    initService.init();
    $scope.speechById = {};

    var speechId =$routeParams.updateSpeechId;
    speechService.getSpeechById(speechId).success(function (response) {
        $scope.update = {'subject' : response.subject, 'description' : response.description};
    });

    $scope.updateSpeech = function(data){
        var sendMessage = {
            'subject' : data.subject,
            'description' : data.description
        };
        speechService.updateSpeech(sendMessage,speechId);
    }
});




