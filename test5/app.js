// This example shows how to use promises.

(function() {

    // The example illustrates the use of services.
    var app = angular.module('app', []);

    // -----------------------------------------------------------------------------------------------------------------
    // Controllers
    // ----------------------------------------------------------------------------------------------------------------

    /**
     * This function implements the pages' controller.
     */
    var controller = function($scope, $q) {
        // Here we initialize the scope.
        $scope.value = 1;

        // Here, we define a promise.
        // The parameter "inValue" should be an integer.
        var test1Promise = function(inValue) {
            return $q(function(inResolve, inReject) {
                setTimeout(function() {
                    if (inValue % 2 == 0) {
                        inResolve("OK: the value " + inValue + " even");
                    } else {
                        inResolve("WARNING: the value " + inValue + " odd");
                    }
                    $scope.value += 1;
                }, 1000);
            });
        };

        // Handler to the button used to run the fist test.
        $scope.test1 = function() {
            console.log("Ruuning test number 1");

            var resolve = function(inVal) {
                console.log(inVal);
            };

            var reject = function(inVal) {
                console.log(inVal);
            };

            test1Promise($scope.value).then(resolve, reject);
        };
    };

    // -----------------------------------------------------------------------------------------------------------------
    // Register the module's components.
    // -----------------------------------------------------------------------------------------------------------------

    app.controller('PageController', ['$scope', '$q', controller]);

})();
