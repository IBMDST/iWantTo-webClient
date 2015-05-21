/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('speechService',function($http,$location,$rootScope,$compile,$timeout,httpFacade,initService,branchService){

    return {
        getSpeeches : function(){
            return httpFacade.getSpeeches();
        },

        getSpeechById : function(speechID){
            var data = {'id' : speechID};
            return httpFacade.getSpeechById(data);
        },

        updateSpeech : function(data, speechId, event){
            initService.buttonDisabled(event);
            httpFacade.updateSpeech(data, speechId).success(function(){
                $location.path('/mypublished');
            });

        },

        addSpeech : function(data,scope,event){
            initService.buttonDisabled(event);
            httpFacade.saveSpeech(data).success(function() {
                $location.path('/share');
            });
        },

        showSpeeches : function(speeches,scope){
            $.each(speeches, function (index, content) {
                var flag = 0;
                $.each(content.interests, function(i, interestContent){
                    if($rootScope.currentUser == interestContent.userID)
                    {
                        eval("scope.interest" + content.id + "=" + 'true');
                        flag = 1;
                        return false;
                    }
                });

                if(flag == 0)
                {
                    eval("scope.interest" + content.id + "=" + 'false');
                }

            });
            this.showStars(speeches);
        },

        showStars : function(speeches){
            setTimeout(function(){
                $.each(speeches, function (index, content) {
                    $('#feedback-comment' +content.id).raty({});
                    if(content.feedbacks.length>0)
                    {
                        $.each(content.feedbacks, function(index, feedbacks){
                            $('#star'+feedbacks.id).raty({ readOnly: true, score: feedbacks.stars });
                        });
                    }
                });
            },300);
        },

        showFeedbackForm : function(speeches,scope){
            scope.feedbackByCurrentUserList = [];
            $.each(speeches, function(index, speeches){
                if(speeches.feedbacks.length>0)
                {
                    $.each(speeches.feedbacks, function(i, feekbackContent){
                        if(feekbackContent.userID== $rootScope.currentUser)
                        {
                            scope.feedbackByCurrentUserList.push(feekbackContent);
                            return false;
                        }
                    });
                }
            });
        }
    }
});


app.factory('commentService',function($http,$location,httpFacade,speechService,paintService,initService) {
    return {

        deleteComment : function(ID, scope,event){
            initService.confirmAlert( function(){
                initService.buttonDisabled(event);
                httpFacade.deleteComment(ID).success(function(){
                    paintService.paintWithComment(scope);
                    swal("This has been deleted!");
                });
            });
        },

        addComment : function(data,scope,event) {
            initService.buttonDisabled(event);
            httpFacade.saveComment(data).success(function () {
                paintService.paintWithComment(scope);
            })
        }
    }
});

app.factory('interestService',function($http,$location,httpFacade,paintService, initService) {
    return {

        getInterestById : function(speechID,id){
            var data = {'userID' : id , 'speechID' : speechID};
            return httpFacade.getInterestById(data);
        },

        deleteInterest : function(ID,speechId, scope, event){
            initService.buttonDisabled(event);
            httpFacade.deleteInterest(ID).success(function(){
                paintService.paintWithInterest(scope,speechId,false);
            });
        },

        addInterest : function(speechId,data,scope,event){
            initService.buttonDisabled(event);
            httpFacade.saveInterest(data).success(function(){
                paintService.paintWithInterest(scope,speechId,true);
            });
        }
    }
});


app.factory('branchService',function($rootScope){

    return {
        speechesByType: function (scope, type, response) {
            var lists = [];
            var onceType = ['comment','interest','feedback'];
            var mark = false;
            if(onceType.indexOf(type)!=-1)
            {
                mark = true;
            }

            if (response.length > 0) {
                if(mark)
                {
                    var circleTypeContent;
                    $.each(response, function (index, content) {
                        switch(type){
                            case "comment":
                                circleTypeContent = content.comments;
                                break;
                            case "interest":
                                circleTypeContent = content.interests;
                                break;
                            case "feedback":
                                circleTypeContent = content.feedbacks;
                                break;
                        }
                        $.each(circleTypeContent, function (i, type) {
                            if (type.userID == $rootScope.currentUser) {
                                lists.push(content);
                                return false;
                            }
                        });
                    });
                }
                else
                {
                    switch(type){
                        case "mypulished":
                            $.each(response, function (index, content) {
                                if(content.speakerID == $rootScope.currentUser)
                                lists.push(content);
                            });
                            break;
                        case "unschedule":
                            $.each(response, function (index, content) {
                                if(content.fixed == false)
                                    lists.push(content);
                            });
                            break;
                        case "onschedule":
                            $.each(response, function (index, content) {
                                if(content.fixed == true)
                                    lists.push(content);
                            });
                            break;
                    }
                }
                switch(type){
                    case "comment":
                        lists.length > 0 ? scope.mycommentedSpeechesList = lists : scope.commentedmessage = "抱歉，目前没有您评论过的培训";
                        break;
                    case "interest":
                        lists.length > 0 ? scope.myinterestedSpeechesList = lists : scope.interestedmessage = "抱歉，目前没有您感兴趣的培训";
                        break;
                    case "feedback":
                        lists.length > 0 ? scope.myfeedbackedSpeechesList = lists : scope.feedbackedmessage = "抱歉，目前没有您参加过的培训";
                        break;
                    case "mypulished":
                        lists.length > 0 ? scope.mySpeechesList = lists : scope.mypublishededmessage = "抱歉，目前没有您发起的培训";
                        break;
                    case "unschedule":
                        lists.length > 0 ? scope.unscheduledSpeechesList = lists : scope.unscheduledmessage = "抱歉，目前没有未上线的培训";
                        break;
                    case "onschedule":
                        lists.length > 0 ? scope.scheduledSpeechesList = lists : scope.onscheduledmessage = "抱歉，目前没有已上线的培训";
                        break;
                }
            }
            else{
                switch(type){
                    case "comment":
                        scope.commentedmessage = "抱歉，目前没有您评论过的培训";
                        break;
                    case "interest":
                        scope.interestedmessage = "抱歉，目前没有您感兴趣的培训";
                         break;
                    case "feedback":
                        scope.feedbackedmessage = "抱歉，目前没有您参加过的培训";
                          break;
                    case "mypulished":
                        scope.mypublishededmessage = "抱歉，目前没有您发起的培训";
                        break;
                    case "unschedule":
                        scope.unscheduledmessage = "抱歉，目前没有未上线的培训";
                        break;
                    case "onschedule":
                        scope.onscheduledmessage = "抱歉，目前没有已上线的培训";
                        break;
                }
            }
        }
    }
});

app.factory('feedbackService',function($http,$location,httpFacade,paintService,initService){
    return {
            addFeedback : function(data,scope,event){
                initService.buttonDisabled(event);
                httpFacade.saveFeedback(data).success(function(){
                    paintService.paintWithFeedback(scope);
                });
            },

            deleteFeedback : function(ID, scope, event){
                httpFacade.deleteFeedback(ID).success(function(){
                    paintService.paintWithFeedback(scope);
                });
                initService.confirmAlert( function(){
                    initService.buttonDisabled(event);
                    httpFacade.deleteFeedback(ID).success(function(){
                        paintService.paintWithFeedback(scope);
                        swal("删除成功！");
                    });
                });
            },

            updateFeedback : function(data,id,userId,scope,event){
                initService.buttonDisabled(event);
                httpFacade.updateFeedback(data,id).success(function(){
                    paintService.paintWithFeedback(scope);
                });
            }
    }
});

