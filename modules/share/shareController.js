/**
 * Created by wangqr on 3/28/2015.
 */
app.controller('ShareController',['$scope','loginService','shareService','sessionService',function($scope,loginService,shareService,sessionService){
    $scope.txt = 'page home';
    $scope.speechesList = [];
    $scope.logout=function(){
        loginService.logout();
    };

    shareService.speeches().success(function(response){
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


    $scope.speechInterest = function(speechId){
        var sendInterestMessage =
        {
            'userID' : sessionService.get('uid'),
            'speechID' : speechId,
            'createdOn' : new Date().valueOf()
        };
        if(sessionService.get(speechId+'Interest') == speechId)
        {
            console.log('exits');
        }
        else
        {
            shareService.addInterest(sendInterestMessage,$scope);
            var element = '#'+speechId;
            $(element).addClass("swap");
        }
    };
}]);


