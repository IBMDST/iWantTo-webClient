/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','$rootScope','initService','loginService','speechService','myShareService','interestService','commentService','$location',function($scope,$rootScope,initService,loginService,speechService,myShareService,interestService,commentService,$location){
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

    $scope.isOpenComment = function (tab) {
        if ($scope.activeTabs.indexOf(tab) > -1)
        {
            return true;
        }
        else {

            return false;
        }
    };

    $scope.openComment = function (tab) {
        //check if tab is already open
        if ($scope.isOpenComment(tab)) {
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            $scope.activeTabs.push(tab);
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


app.controller('SpeechInfoController', function($scope, $routeParams, initService, speechService, feedbackService) {
    var userId = initService.init();
    var speechId =$routeParams.speechId;
    speechService.getSpeechById(speechId).success(function(response){
        $scope.meetingInfo = response;
        //2015-04-09 20:00
        var formatMeetingTime = response.when.replace(/-/ig,'/');
        var meetingTime= new Date(formatMeetingTime).valueOf();
        var currentTime = new Date().valueOf();
        if(currentTime>=meetingTime)
        {
            $scope.isMeetingStart = true;
            feedbackService.getFeedbackByUserIdSpeechId(userId,speechId).success(function(response)
            {
                if(response.length>0)
                {
                    $scope.feedback= response[0];
                    $('#feedbackForm').remove();
                    $('.isStared').raty({ readOnly: true, score: response[0].stars });
                }
                else
                {
                    $('#isFeedbacked').hide();
                    $('#star').raty({});
                }

            });
        }
        else
        {
            $scope.isMeetingStart = false;
        }
    });

    $scope.submitFeedback = function(comment){
        var stars = $('#star>input').val();
        var data =  {
            'userID' : userId,
            'comment' : comment,
            'speechID' : speechId,
            'createdOn' : new Date().valueOf(),
            'stars' : stars
        };
        feedbackService.addFeedback(data,$scope)

    };
});


