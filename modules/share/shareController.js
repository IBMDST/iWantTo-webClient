/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','$rootScope','$compile','initService','loginService','speechService','branchService','interestService','commentService','feedbackService','$location','paintService','httpFacade',function($scope,$rootScope, $compile,initService,loginService,speechService,branchService,interestService,commentService,feedbackService,$location,paintService,httpFacade){
    $scope.speechesList = [];
    $scope.feedbackByCurrentUserList = [];
    var userId = initService.init();
    $scope.currentUser = userId;
    var path = $location.path();

    feedbackService.getFeedbackByUserId(userId).success(function(response){
        $scope.feedbackByCurrentUserList = response;
    });

    if(path=='/share')
    {
        speechService.getSpeeches().success(function (response) {
            paintService.paint($scope,response);
            $scope.speechesList = response;
            if(response.length==0){$scope.allsharemessage="No speech"}
        });
    }
    else if(path=='/mypublished')
    {
        $scope.showSpeeches = [];
        branchService.mySpeeches(userId).success(function (response) {
            paintService.paint($scope,response);
            if(response.length==0){$scope.mypulishedmessage="No speech you published"}
            $scope.mySpeechesList = response;
        });
    }
    else if(path=='/unschedule')
    {
        $scope.unscheduledSpeechesList = [];
        branchService.unscheduledSpeeches().success(function (response) {
            paintService.paint($scope,response);
            if(response.length==0){$scope.unscheduledmessage="No speech on unschedule"}
            $scope.unscheduledSpeechesList = response;
        });
    }
    else if(path=='/onschedule')
    {
        $scope.scheduledSpeechesList = [];
        branchService.scheduledSpeeches().success(function (response) {
            paintService.paint($scope,response);
            if(response.length==0){$scope.scheduledmessage="No speech on schedule"}
            $scope.scheduledSpeechesList = response;
        });
    }
    else if(path=='/mycommented')
    {
        $scope.mycommentedSpeechesList = [];
        httpFacade.getSpeeches().success(function(response) {
            branchService.speechesByType($scope,'comment',response);
            paintService.paint($scope,response);
         });


    }
    else if(path=='/myinterested')
    {
        $scope.myinterestedSpeechesList = [];
        httpFacade.getSpeeches().success(function(response) {
            branchService.speechesByType($scope,'interest',response);
            paintService.paint($scope,response);
        });
    }
    else if(path=='/myfeedbacked')
    {
        $scope.myfeedbackedSpeechesList = [];
        httpFacade.getSpeeches().success(function(response) {
            branchService.speechesByType($scope,'feedback',response);
            paintService.paint($scope,response);
        });
    }

    $scope.display = function(data){
        var content = $scope.feedbackByCurrentUserList;
        var flag = 0;
        for(var i =0;i<content.length;i++)
        {
            if( data == content[i].speechID )
            {
                flag = 1;
                break;
            }
        }
        if(flag==1)
        {
            return false;
        }
        else
        {
            return true;
        }
    };

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

    $scope.editFeedback = function(id) {
        $('#star'+id).raty({ readOnly: false, score :  $('#star' + id+'>input').val()});
        var commentNode = $('#feedback-comment' + id);
        var commentNodeText = commentNode.text();
        var input = $("<input type='text' style='width: 100%;' value='" + commentNodeText + "'/>");
        var submit = $("<button type='button'  class='btn btn-warning btn-xs' style='margin-top:-10px;'  ng-click='updateFeedback(\""+id+"\")'>save</button>");
        commentNode.html(input);
        input.trigger("focus");
        $('#feedback-submit'+id).html(submit);
        $compile(submit)($scope);
    };

    $scope.updateFeedback = function(id){
        var text = $('#feedback-comment' +id+'>input').val();
        var star = $('#star' + id + '>input').val();
        var data = {'comment' : text, 'stars' : star, createdOn:new Date().valueOf()};
        feedbackService.updateFeedback(data,id,userId,$scope);
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




