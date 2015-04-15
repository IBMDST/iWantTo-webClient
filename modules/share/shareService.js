/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('speechService',function($http,$location,$compile,$timeout,httpFacade){
    return {
        getSpeeches : function(){
            return httpFacade.getSpeeches();
        },

        getSpeechById : function(speechID){
            var data = {'id' : speechID};
            return httpFacade.getSpeechById(data);
        },

        updateSpeech : function(data, speechId){

            httpFacade.updateSpeech(data, speechId).success(function(){
                $location.path('/mypublished');
            });

        },

        addSpeech : function(data,scope){
            httpFacade.saveSpeech(data).success(function() {
                $location.path('/share');
            }).error(function(status){
                    switch(status) {
                        case 500: {
                            $scope.message = "Something went wrong!";
                            break;
                        }
                    }
                    scope.message =  error.errors;
            })
        },

        showSpeeches : function(speeches,interests,scope){
            $.each(speeches, function (index, content) {
                if(interests.length > 0)
                {
                    var flag = 0;
                    $.each(interests, function (index, interestContent) {
                        if(interestContent.speechID == content.id)
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
                }
                else
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
        }

    }
});


app.factory('commentService',function($http,$location,httpFacade,speechService,paintService) {
    return {

        deleteComment : function(ID, scope){
            httpFacade.deleteComment(ID).success(function(){
                paintService.paintWithComment(scope);
            });
        },
        addComment : function(data,scope) {
            httpFacade.saveComment(data).success(function (success) {
                paintService.paintWithComment(scope);
            }).error(function(status){
                switch(status) {
                    case 500: {
                        $scope.message = "Something went wrong!";
                        break;
                    }
                }
                scope.message =  error.errors;
            })
        }
    }
});

app.factory('interestService',function($http,$location,httpFacade,paintService) {
    return {

        getInterestById : function(speechID,id){
            var data = {'userID' : id , 'speechID' : speechID};
            return httpFacade.getInterestById(data);
        },

        deleteInterest : function(ID,speechId, scope){
            httpFacade.deleteInterest(ID).success(function(){
                paintService.paintWithInterest(scope,speechId,false);
            });
        },

        addInterest : function(speechId,data,scope){
            httpFacade.saveInterest(data).success(function(){
                paintService.paintWithInterest(scope,speechId,true);
            });
        }
    }
});


app.factory('branchService',function($http,httpFacade, initService){
    var userId = initService.init();
    return {
        mySpeeches: function (userID) {
            var data = {'speakerID': userID};
            return httpFacade.getSpeechById(data);
        },

        unscheduledSpeeches: function () {
            return httpFacade.getSpeechByFixed({'fixed': false});
        },

        scheduledSpeeches: function () {
            return httpFacade.getSpeechByFixed({'fixed': true});
        },

        speechesByType: function (scope, type, response) {
            var lists = [];
            var circleType;
            if (response.length > 0) {
                $.each(response, function (index, content) {
                    switch(type){
                        case "comment":
                            circleType = content.comments;
                            break;
                        case "interest":
                            circleType = content.interests;
                            break;
                        case "feedback":
                            circleType = content.feedbacks;
                            break;
                    }
                    $.each(circleType, function (i, type) {
                        if (type.userID == userId) {
                            lists.push(content);
                            return false;
                        }
                    });
                });
                switch(type){
                    case "comment":
                        lists.length > 0 ? scope.mycommentedSpeechesList = lists : scope.commentedmessage = "No speech on comment";
                        break;
                    case "interest":
                        lists.length > 0 ? scope.myinterestedSpeechesList = lists : scope.interestedmessage = "No speech on interest";
                        break;
                    case "feedback":
                        lists.length > 0 ? scope.myfeedbackedSpeechesList = lists : scope.feedbackedmessage = "No speech on feedback";
                        break;
                }
            }
            else{
                switch(type){
                    case "comment":
                        scope.commentedmessage = "No speech on comment"
                        break;
                    case "interest":
                        scope.interestedmessage = "No speech on interest"
                         break;
                    case "feedback":
                        scope.feedbackedmessage = "No speech on feedback"
                          break;
                }
            }
        }
    }
});

app.factory('feedbackService',function($http,$location,httpFacade,paintService){
    return {

            getFeedbackByUserId : function(userID){
                var data = {
                    'userID' : userID
                };
                return httpFacade.getFeedbackById(data);
            },

            addFeedback : function(data,scope){

                httpFacade.saveFeedback(data).success(function(){
                    paintService.paintWithFeedback(scope);
                });
            },

            deleteFeedback : function(ID, scope){

                httpFacade.deleteFeedback(ID).success(function(){
                    paintService.paintWithFeedback(scope);
                });
            },

            updateFeedback : function(data,id,userId,scope){

                httpFacade.updateFeedback(data,id).success(function(){
                    paintService.paintWithFeedback(scope);
                });
            }
    }
});

