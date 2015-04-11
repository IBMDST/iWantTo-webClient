/**
 * Created by wangqr on 3/29/2015.
 */
app.factory('speechService',function($http,$location,httpFacade){
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
                    $location.path('/share');
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
        }
    }
});


app.factory('commentService',function($http,$location,httpFacade) {
    return {

        deleteComment : function(ID, scope){
            httpFacade.deleteComment(ID).success(function(){
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                });
                $location.path('/share');
            });
        },
        addComment : function(data,scope) {
            httpFacade.saveComment(data).success(function (success) {
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                });
                $location.path('/share');
            }).error(function(status){
                switch(status) {
                    case 500: {
                        $scope.message = "Something went wrong!";
                        break;
                    }
                }
                scope.message =  error.errors;
                $location.path('/share');
            })
        }
    }
});

app.factory('interestService',function($http,$location,httpFacade) {
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
                });
                $location.path('/share');
            });
        },

        addInterest : function(speechId,data,scope){
            httpFacade.saveInterest(data).success(function(){
                httpFacade.getSpeeches().success(function(response){
                    scope.speechesList = response;
                    eval("scope.interest" + speechId + "=" + 'true');
                });
                $location.path('/share');
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


app.factory('feedbackService',function($http,$location,httpFacade){
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
                    var sendMessage={'id':data.speechID};
                    $('#feedbackForm').remove();
                    $('#isFeedbacked').show();
                    httpFacade.getSpeechById(sendMessage).success(function(response){
                        scope.feedback = response.feedbacks[0];
                        $('.isStared').raty({ readOnly: true, score: response.feedbacks[0].stars });
                    });
                    $location.path('/share/' + data.speechID);
                });
            }

    }
});
