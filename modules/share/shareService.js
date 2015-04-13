/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('speechService',function($http,$location,$timeout,httpFacade){
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


app.factory('commentService',function($http,$location,httpFacade,speechService) {
    return {

        deleteComment : function(ID, scope){
            httpFacade.deleteComment(ID).success(function(){
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                    speechService.showStars(response);
                });
            });
        },
        addComment : function(data,scope) {
            httpFacade.saveComment(data).success(function (success) {
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                    speechService.showStars(response);
                });
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

app.factory('interestService',function($http,$location,httpFacade,speechService) {
    return {
        getInterestByUserId : function(id){
            var data = {'userID' : id};
            return httpFacade.getInterestById(data);
        },

        getInterestById : function(speechID,id){
            var data = {'userID' : id , 'speechID' : speechID};
            return httpFacade.getInterestById(data);
        },

        deleteInterest : function(ID,speechId, scope){
            httpFacade.deleteInterest(ID).success(function(){
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                    eval("scope.interest" + speechId + "=" + 'false');
                    speechService.showStars(response);
                });
            });
        },

        addInterest : function(speechId,data,scope){
            httpFacade.saveInterest(data).success(function(){
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                    eval("scope.interest" + speechId + "=" + 'true');
                    speechService.showStars(response);
                });
            });
        }
    }
});


app.factory('myShareService',function($http,httpFacade){
    return {
        mySpeeches : function(userID){
            var data = {'speakerID' : userID};
            return httpFacade.getSpeechById(data);
        }
    }
});


app.factory('feedbackService',function($http,$location,httpFacade,speechService){
    return {
            getFeedbackByUserIdSpeechId : function(userID,speechID){
                var data = {
                    'userID' : userID,
                    'speechID' : speechID
                };
                return httpFacade.getFeedbackById(data);
             },

            addFeedback : function(data,scope){
                httpFacade.saveFeedback(data).success(function(){
                    httpFacade.getSpeeches().success(function (response) {
                        scope.speechesList = response;
                        speechService.showStars(response);
                    });

                });
            },

            deleteFeedback : function(ID, scope){
                httpFacade.deleteFeedback(ID).success(function(){
                    httpFacade.getSpeeches().success(function(response){
                        scope.speechesList = response;
                        speechService.showStars(response);
                    });
                });
            }
    }
});

