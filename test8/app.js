// This example shows how to use promises.

(function() {


    var app = angular.module('app', []);

    var controller = function($scope, $q) {
        $scope.showMe = true;
        $scope.hideMe = true;
        $scope.reject = false;

        // The following function returns a promise.
        var hide = function() {

            return $q(function(inResolve, inReject) {
                setTimeout(function() {
                    $scope.$apply(function() {
                        if (! $scope.reject) { 
                            $scope.showMe = false;
                            inResolve();
                        } else {
                            inReject();
                        }
                    })
                }, 2000)
            });
        }

        // This function hides the text "This text will disappear in 2 seconds".
        $scope.hide = function() {
            console.log("Execute the button's callback.");

            var resolve = function() { $scope.hideMe = false; }
            var reject  = function() { console.log("No, the text will __NOT__ disappear!"); }
            hide().then(resolve, reject);
        };

        // This function informs the script that the user does not want the text to disappear.
        $scope.setReject = function() {
            $scope.reject = true;
        };
    };

    app.controller('PageController', ['$scope', '$q', controller]);

})();
