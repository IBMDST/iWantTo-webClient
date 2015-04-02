/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','loginService','shareService','sessionService',function($scope,loginService,shareService,sessionService){
    $scope.txt = 'page home';
    $scope.speechesList = [];

    $scope.logout=function(){
        loginService.logout();
    };


    shareService.speeches().success(function (response) {
        shareService.showInterest().success(function (interest) {
            $.each(response, function (index, content) {
                if(interest.length > 0)
                {
                    var flag = 0;
                    $.each(interest, function (index, interestContent) {
                        if(interestContent.speechID == content.id)
                        {
                            eval("$scope.interest" + content.id + "=" + 'true');
                            flag = 1;
                            return false;
                        }
                    });
                    if(flag == 0)
                    {
                        eval("$scope.interest" + content.id + "=" + 'false');
                    }
                }
                else
                {
                    eval("$scope.interest" + content.id + "=" + 'false');
                }
            });
        });
        $scope.speechesList = response;
    });



    $scope.iWantToShare = function(data){
        var sendShareMessage =
        {
            'subject' : data.subject,
            'description' : data.description,
            'speakerID' : sessionService.get('uid'),
            'createdOn' : new Date().valueOf()
        };
        shareService.iWantToShare(sendShareMessage,$scope);
    };


    $scope.submitComment = function(data,speechId){
        var sendCommentMessage =
        {
            'userID' : sessionService.get('uid'),
            'comment' : data,
            'speechID' : speechId,
            'createdOn' : new Date().valueOf()
        };
        shareService.submitComment(sendCommentMessage,$scope);
    };

    $scope.swapInterest = function(speechId){
        var interestID;
        var cssId = $('#'+speechId);
        if(cssId.hasClass("glyphicon glyphicon-heart")){
            shareService.interestId(speechId).success(function(response){
                if(response.length>0)
                {
                    interestID = response[0].id;
                }
                shareService.deleteInterest(interestID,speechId, $scope);

            });
        }
        if(cssId.hasClass("glyphicon glyphicon-heart-empty"))
        {
            shareService.addInterest(speechId, $scope);

        }
    };
}]);


