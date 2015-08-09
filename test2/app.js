(function() {

    var app = angular.module('app', []);

    // -------------------------------------------------------------------------
    // Controllers
    // -------------------------------------------------------------------------

    var pageCtrl = function($scope) {
      console.log("Init the page controller !");
    };

    var registerCtrl = function($scope) {
      console.log("Init the registration controller !");
      $scope.user = {};

      // This function is executed when the user submits the form.
      $scope.register = function() {
        console.log("Submiting the form.");
        console.log($scope.user);
      };

      // Watch for the input's value "email" (NOT for the input's field).
      $scope.$watch('user.email', function(inValue) {
        console.log("The value of email has been mmodified (" + inValue + ").");
        console.log($scope.user.email);
        console.log($scope.registration);
      });

      // Watch for the form's validity.
      $scope.$watch('registration.$valid', function(inValue) {
        console.log("The form has been mmodified. Is it valid? " + inValue);
      });

      // Watch for a form's entry.
      // Here we want to detect when the entry looses the focus.
      $scope.$watch('registration.uEmail.$touched', function(inValue) {
        console.log("The entry <uEmail> of the form has lost the focus.");

        if ($scope.registration.uEmail.$valid) {
          console.log("The given value represents a valid email address (" + $scope.registration.uEmail.$viewValue + ")");
        } else {
          console.log("The given value does not represent a valid email address (" + $scope.registration.uEmail.$viewValue + ")");
        }
        console.log($scope.registration.uEmail);
        // $scope.registration.uEmail.$setUntouched();
        // $scope.registration.uEmail.$validate();
      });

    };

    app.controller('PageController', ['$scope', pageCtrl]);
    app.controller('RegisterController', ['$scope', registerCtrl]);

    // -------------------------------------------------------------------------
    // Directives
    // -------------------------------------------------------------------------

    var inputTextDirective = function() {

      var directive = {
        restrict: 'A'
      };

      directive.compile = function(element, attributes) {

        return function(inScope, inElement, inAttrs) {

          inElement.on("blur", function(event) {
            console.log("Element lost its focus. Value is <" + inElement.val() + ">");
            console.log(angular.element(event.currentTarget).val());
          });
        };
      };

      return directive;
    };

    app.directive('myInputText', [inputTextDirective]);

})();
