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

var appForm = angular.module('updateForm', []);
appForm.directive('rcInitial', function() {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element', '$attrs', '$parse', function($scope, $element, $attrs, $parse) {
                var getter, setter, val;
                val = $attrs.ngInitial || $attrs.value;
                getter = $parse($attrs.ngModel);
                setter = getter.assign;
                setter($scope, val);
            }
        ]
    };
});