// This example shows how to chain promises.

(function() {

    var app = angular.module('app', []);

    var controller = function($scope, $q) {
        $scope.showMe = true;
        $scope.hideMe = true;

        // The following function returns a promise.
        var hide = function() {

            return $q(function(inResolve) {
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.showMe = false;
                        $scope.hideMe = false;
                        inResolve();
                    })
                }, 2000);
            });
        }

        // This function hides the text "This text will disappear in 2 seconds".
        $scope.hide = function() {
            console.log("Execute the button's callback.");

            var resolve = function() {
                return $q(function(inResolve) {
                    setTimeout(function() {
                        $scope.$apply(function() {
                            console.log("OK, the text is not visible anymore... but wait, I have to execute show it again!");
                            inResolve();
                        })
                    }, 2000);
                });
            };

            var showMeAgain = function() {
                $scope.showMe = true;
                $scope.hideMe = true;
            };

            hide().then(resolve).then(showMeAgain);
        };

    };

    app.controller('PageController', ['$scope', '$q', controller]);

})();
