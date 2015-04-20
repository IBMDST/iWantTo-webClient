/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','$rootScope','$compile','initService','loginService','speechService','branchService','interestService','commentService','feedbackService','$location','paintService','httpFacade',function($scope,$rootScope, $compile,initService,loginService,speechService,branchService,interestService,commentService,feedbackService,$location,paintService,httpFacade){
    $scope.speechesList = [];
    $scope.feedbackByCurrentUserList = [];
    var userId ;
    var path = $location.path();

    switch(path){
        case "/share":
            userId = initService.init();
            speechService.getSpeeches().success(function (response) {
                paintService.paint($scope,response);
                $scope.speechesList = response;
                if(response.length==0){$scope.allsharemessage="No speech"}
            });
            break;
        case "/mypublished":
            userId = initService.init();
            $scope.showSpeeches = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'mypulished',response);
                paintService.paint($scope,response);
            });
            break;
        case "/unschedule":
            userId = initService.init();
            $scope.unscheduledSpeechesList = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'unschedule',response);
                paintService.paint($scope,response);
            });
            break;
        case "/onschedule":
            userId = initService.init();
            $scope.scheduledSpeechesList = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'onschedule',response);
                paintService.paint($scope,response);
            });
            break;
        case "/mycommented":
            userId = initService.init();
            $scope.mycommentedSpeechesList = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'comment',response);
                paintService.paint($scope,response);
            });
            break;
        case "/myinterested":
            userId = initService.init();
            $scope.myinterestedSpeechesList = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'interest',response);
                paintService.paint($scope,response);
            });
            break;
        case "/myfeedbacked":
            userId = initService.init();
            $scope.myfeedbackedSpeechesList = [];
            httpFacade.getSpeeches().success(function(response) {
                branchService.speechesByType($scope,'feedback',response);
                paintService.paint($scope,response);
            });
            break;
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

    $scope.iWantToShare = function(data,event){
        var sendShareMessage =
        {
            'subject' : data.subject,
            'description' : data.description,
            'speakerID' : userId,
            'createdOn' : new Date().valueOf()
        };
        speechService.addSpeech(sendShareMessage,$scope,event);
    };

    $scope.swapInterest = function(speechId,event){
        var cssId = $('#'+speechId);
        if(cssId.hasClass("glyphicon glyphicon-heart")){

            var interestIdName = cssId.parent('.interests').next('.interests-overlay').children('span').children('span.interestD').attr('id');
            if(typeof interestIdName !='undefined')
            {
                var interestId = interestIdName.substr('9');
                interestService.deleteInterest(interestId,speechId, $scope, event);
            }
        }
        if(cssId.hasClass("glyphicon glyphicon-heart-empty")) {

            var data = {'userID' : userId , 'speechID' : speechId, 'createdOn' : new Date().valueOf()};
            interestService.addInterest(speechId,data, $scope, event);
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
            switch(name){
                case "comment":
                    if($scope.activeTabs.indexOf('meetinginfo'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('meetinginfo'+id), 1);
                    if($scope.activeTabs.indexOf('feedback'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('feedback'+id), 1);
                    break;
                case "meetinginfo":
                    if($scope.activeTabs.indexOf('comment'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('comment'+id), 1);
                    if($scope.activeTabs.indexOf('feedback'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('feedback'+id), 1);
                    break;
                case "feedback":
                    if($scope.activeTabs.indexOf('meetinginfo'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('meetinginfo'+id), 1);
                    if($scope.activeTabs.indexOf('comment'+id)>-1)
                        $scope.activeTabs.splice($scope.activeTabs.indexOf('comment'+id), 1);
                    break;
            }
            $scope.activeTabs.push(name+id);
        }
    };



    $scope.deleteComment = function (id, event) {
        commentService.deleteComment(id,$scope,event);
    };

    $scope.submitComment = function(data,speechId,event){
        var sendCommentMessage =
        {
            'userID' : userId,
            'comment' : data,
            'speechID' : speechId,
            'createdOn' : new Date().valueOf()
        };
        commentService.addComment(sendCommentMessage,$scope,event);
    };

    $scope.submitFeedback = function(comment, speechId,event){
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
            feedbackService.addFeedback(data,$scope,event);

        }
    };

    $scope.deleteFeedback = function (id, event) {
        feedbackService.deleteFeedback(id,$scope,event);
    };

    $scope.editFeedback = function(id) {
        $('#star'+id).raty({ readOnly: false, score :  $('#star' + id+'>input').val()});
        var commentNode = $('#feedback-comment' + id);
        var commentNodeText = commentNode.text();
        var input = $("<input type='text' style='width: 100%;' value='" + commentNodeText + "'/>");
        var submit = $("<button type='button'  class='btn btn-warning btn-xs' style='margin-top:-10px;'  ng-click='updateFeedback(\""+id+"\",$event)'>save</button>");
        commentNode.html(input);
        input.trigger("focus");
        $('#feedback-submit'+id).html(submit);
        $compile(submit)($scope);
    };

    $scope.updateFeedback = function(id,event){
        var text = $('#feedback-comment' +id+'>input').val();
        var star = $('#star' + id + '>input').val();
        var data = {'comment' : text, 'stars' : star, createdOn:new Date().valueOf()};
        feedbackService.updateFeedback(data,id,userId,$scope,event);
    };


}]);

app.controller('UpdateSpeechController', function($scope,$rootScope, $routeParams, speechService, initService) {
    initService.init();
    $scope.speechById = {};

    var speechId =$routeParams.updateSpeechId;
    speechService.getSpeechById(speechId).success(function (response) {
        $scope.update = {'subject' : response.subject, 'description' : response.description};
    });

    $scope.updateSpeech = function(data,event){
        var sendMessage = {
            'subject' : data.subject,
            'description' : data.description
        };
        speechService.updateSpeech(sendMessage,speechId,event);
    }
});




