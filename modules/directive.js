/**
 * Created by wangqr on 3/27/2015.
 */
app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }
});
app.directive('isLogged', function() {
    return function(scope, element) {
        element[0].focus();
    }
});


