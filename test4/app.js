// This example shows how to use services.
// Please note that the JavaScript code that contains the services must be included before this file.
//
// WARNING !!!! Make sure to load the file "angular-route.js"


(function() {

    // The example illustrates the use of services.
    var app = angular.module('app', ['ngRoute']);

    // Declare the services.
    app.provider('service1Provider', service_provider_object);
    app.provider('service2Provider', service_provider_function);
    app.factory('service3Provider', service_factory_function);
    app.factory('service4Provider', service_factory_array);
    app.service('service5Provider', service_service_constructor);
    app.service('service6Provider', service_constructor_array);


    // var $injector = angular.injector();
    // $injector.get('service1Provider');

    // -----------------------------------------------------------------------------------------------------------------
    // Controllers
    // ----------------------------------------------------------------------------------------------------------------

    /**
     * This function implements the pages' controller.
     */
    var controller = function($scope, service1, service2, service3, service4, service5, service6) {
        // Here we initialize the scope.
      $scope.value = 1;
      $scope.service1 = service1.getName();
      $scope.service2 = service2.getName();
      $scope.service3 = service3.getName();
      $scope.service4 = service4.getName();
      $scope.service5 = service5.getName();
      $scope.service6 = service6.getName();
    };

    // -----------------------------------------------------------------------------------------------------------------
    // Directives
    // -----------------------------------------------------------------------------------------------------------------

    var directive = function() {

        // Create an empty directive's definition.
        var directive = {};

        // The function "directive.compile" is called once for each occurrence of the directive in the HTML page.
        // This function must return a function (called "link") that will be used to bind the directive's content to the scope.
        // The function "directive.compile" should be used to perform a one-time initialization for each occurrence of the directive in the HTML page.
        directive.compile = function(element, attributes) {
            // Perform one-time initialization for each occurrence of the directive in the HTML page.
            // ...

            // Return the function called "link".
            return function(inScope, inElement, inAttrs) {
                // Note that:
                //   - inElement.append: call the AngularJS' implementation of jQuery.
                //   - $(inElement).append: call the real implementation of jQuery.
                inElement.append('<ul>');
                inElement.append('<li>value = ' + inScope.value + '</li>');
                inElement.append('<li>' + inScope.service1 + '</li>');
                inElement.append('<li>' + inScope.service2 + '</li>');
                inElement.append('<li>' + inScope.service3 + '</li>');
                inElement.append('<li>' + inScope.service4 + '</li>');
                inElement.append('<li>' + inScope.service5 + '</li>');
                inElement.append('<li>' + inScope.service6 + '</li>');
                inElement.append('</ul>');
            };
        };

        // Return the directive's definition.
        return directive;
    };

    // -----------------------------------------------------------------------------------------------------------------
    // Register the module's components.
    // -----------------------------------------------------------------------------------------------------------------

    app.controller('PageController', ['$scope', 'service1Provider', 'service2Provider', 'service3Provider', 'service4Provider', 'service5Provider', 'service6Provider', controller]);
    app.directive('myDirective', [directive]);

})();
