(function() {

    var app = angular.module('app', []);

    // -------------------------------------------------------------------------
    // Controllers
    // -------------------------------------------------------------------------

    var pageCtrl = function($scope) {
      console.log("Execute <pageCtrl>.");
    };

    app.controller('PageController', ['$scope', pageCtrl]);

    // -------------------------------------------------------------------------
    // Directives
    // -------------------------------------------------------------------------


    /**
     * Directives' factory function for directive <element1> (as element)
     */
    var element1Directive = function() {

      console.log("Execute <element1Directive>.");

      var controller = function($scope) {
        console.log("Execute <element1Directive::controller>.");
      };

      var compile = function(inElement, inAttrs) {

        console.log("Execute <element1Directive::compile> on " + inAttrs['name'] + ".");

        var pre_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <element1Directive::compile::pre_link> on " + inAttrs['name'] + ".");
        }

        var post_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <element1Directive::compile::post_link> on " + inAttrs['name'] + ".");
        }

        return {
          pre: pre_link,
          post: post_link
        };
      }

      // return the directive definition object
      return {
        restrict: "E",
        controller: controller,
        compile: compile
      };
    };

    /**
     * Directives' factory function for directive <element2> (as element)
     */
    var element2Directive = function() {

      console.log("Execute <element2Directive>.");

      var controller = function($scope) {
        console.log("Execute <element2Directive::controller>.");
      };

      var compile = function(inElement, inAttrs) {

        console.log("Execute <element2Directive::compile> on " + inAttrs['name'] + ".");

        var pre_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <element2Directive::compile::pre_link> on " + inAttrs['name'] + ".");
        }

        var post_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <element2Directive::compile::post_link> on "  + inAttrs['name'] + ".");
        }

        return {
          pre: pre_link,
          post: post_link
        };
      }

      // return the directive definition object
      return {
        restrict: "E",
        controller: controller,
        compile: compile
      };
    };

    /**
     * Directives' factory function for directive <attribute1> (as attribute)
     */
    var attribute1Directive = function() {

      console.log("Execute <attribute1Directive>.");

      var controller = function($scope) {
        console.log("Execute <attribute1Directive::controller>.");
      };

      var compile = function(inElement, inAttrs) {

        console.log("Execute <attribute1Directive::compile> on " + inAttrs['name'] + ".");

        var pre_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <attribute1Directive::compile::pre_link> on " + inAttrs['name'] + ".");
        }

        var post_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <attribute1Directive::compile::post_link> on "  + inAttrs['name'] + ".");
        }

        return {
          pre: pre_link,
          post: post_link
        };
      }

      // return the directive definition object
      return {
        restrict: "A",
        controller: controller,
        compile: compile
      };
    };

    /**
     * Directives' factory function for directive <attribute2> (as attribute)
     */
    var attribute2Directive = function() {

      console.log("Execute <attribute2Directive>.");

      var controller = function($scope) {
        console.log("Execute <attribute2Directive::controller>.");
      };

      var compile = function(inElement, inAttrs) {

        console.log("Execute <attribute2Directive::compile> on " + inAttrs['name'] + ".");

        var pre_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <attribute2Directive::compile::pre_link> on " + inAttrs['name'] + ".");
        }

        var post_link = function(inScope, inElement, inAttrs, inController, inTranscludeFn) {
          console.log("Execute <attribute2Directive::compile::post_link> on "  + inAttrs['name'] + ".");
        }

        return {
          pre: pre_link,
          post: post_link
        };
      }

      // return the directive definition object
      return {
        restrict: "A",
        controller: controller,
        compile: compile
      };
    };

    app.directive('element1', [element1Directive]);
    app.directive('element2', [element2Directive]);
    app.directive('attribute1', [attribute1Directive]);
    app.directive('attribute2', [attribute2Directive]);

})();
