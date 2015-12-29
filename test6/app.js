// This example shows how to use animations.

(function() {

    // WARNING !!!!
    // Do not forget to declare the dependency to the module "ngAnimate".
    // If you forget to declare the dependence, then you won't get any error message!
    // You can spend a lot of time trying to find out what's going on!
    var app = angular.module('app', ['ngAnimate']);

    var controller = function($scope, $q, $animate) {
        $scope.hideMe = false;
        $scope.swingMe = false;

        $scope.fadeOut = function() {
            $scope.hideMe = true;
        };

        $scope.fadeIn = function() {
            $scope.hideMe = false;
        };
    };

    app.controller('PageController', ['$scope', '$q', '$animate', controller]);

})();
