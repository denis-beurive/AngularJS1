(function() {

    var app = angular.module('app', ['ngAnimate', 'ngRoute']);

    // -----------------------------------------------------------------------------------------------------------------
    // Controllers
    // ----------------------------------------------------------------------------------------------------------------

    /**
     * This function implements the pages' controller.
     */
    var pageCtrl = function($scope) {
      // Optional: set the Directives' contexts.
      // Here, we define a default view for the second "<switch-fader>" element.
      $scope.section2 = { defaultView: "about" };
    };

    app.controller('PageController', ['$scope', pageCtrl]);

    // -----------------------------------------------------------------------------------------------------------------
    // Directives.
    // -----------------------------------------------------------------------------------------------------------------

    // WARNING: Be aware that there is only one instance of the following function.
    var switchFader = function() {
      // This is the controller for the directive.
      // WARNING: be aware that there is only one instance of the current function.
      var controller = function($scope) {

        this.setLastView = function(inViewName) {
          $scope.context.lastView = inViewName;
        };

        this.addView = function(inViewName, inView) {
          $scope.context.views[inViewName] = inView;
          if (null == $scope.context.defaultView) {
            $scope.context.defaultView = inViewName;
          }
        };

        this.setDefaultView = function(inViewName) {
          $scope.context.defaultView = inViewName;
          this.setLastView(inViewName);
        };

        // The context is not automatically created. Create it, if necessaury.
        // The directive's controller is executed before the "compile" function (and, therefore, before the "link" function, since the latter is returned by the former).
        // Therefore, the firective's controller is a good place to initialize the scope's context.
        if ("undefined" === typeof $scope.context) {
          $scope.context = {}; // Please see the object returned by the directive's function.
                               // The value of "context" will be the value of the attribute "name".
        }

        // Initialize the context.
        if ("undefined" === typeof $scope.context.defaultView) {
          // This statement below may be overwritten later.
          $scope.context.defaultView = null;
        }

        $scope.context.views = {}; // The list of views { viewName: viewElement }.
        $scope.context.lastView = null; // Name of the last printed view.
        $scope.context.inEventHandler = false;

        if (null !== $scope.context.defaultView) {
          // Set the view if it has been defined using JavaScript code.
          this.setLastView($scope.context.defaultView);
        }
      };

      // This function performs any action that requires the directive's element as input.
      // WARNING: be aware that this function executes BEFORE the Directives "caseFader" have been treated.
      //          Therefore, when the function is executed, the variable "views" has not been initialized.
      var compile = function(inElement, inAttrs) {

        var link = function(inScope, inElement, inAttrs) {

          // We have to watch for any change of the value "context.view".
          inScope.$watch('context.' + inAttrs.view, function(inValue) {

            if (inScope.context.inEventHandler) {
              // This event handler is already in used.
              return;
            }
            inScope.context.inEventHandler = true;

            if ("undefined" === typeof inValue) {
              // This is the first execution... print the default view/
              inValue = inScope.context.defaultView;
            }

            // WARNING: when the function is executed for the first time, the variable "views" is not initialized.
            //          There is only one instance of this function!
            //          Events triggered "simultaneously" launch the same handler!
            if (inScope.context.lastView !== null) {
              // This means that the directive "caseFader" have been treated.
              // Therefore, the value of "views" is initialized.
              inScope.context.views[inScope.context.lastView].fadeOut(500, function() {
                inScope.context.views[inValue].fadeIn(500, function() {
                  // The modification of the scope below is done from outside the Agular framework (from an event handler).
                  // In order to notify the possible listeners on the value "inScope.context.lastView", we need to call the function "$rootScope.Scope.$apply".
                  inScope.$apply(inScope.context.lastView = inValue);
                  inScope.context.inEventHandler = false;
                });
              });
            } else {
              // The DOM element associated to the given view name is not registered yet. Therefore, we need to find it.
              // Please note that this block is executed only once.
              $(inElement).children("[view='" + inValue + "']").fadeIn(500, function() {
                // The modification of the scope below is done from outside the Agular framework (from an event handler).
                // In order to notify the possible listeners on the value "inScope.context.lastView", we need to call the function "$rootScope.Scope.$apply".
                inScope.$apply(inScope.context.lastView = inValue);
                inScope.context.inEventHandler = false;
              });
            }
          });
        }
        return link;
      };

      return {
        restrict: "E",
        controller: controller,
        compile: compile,
        scope: {
          // <switch-fader name="section2" view="view">...</switch-fader>
          context: "=name"
        }
      };
    };

    var caseFader = function() {

      // This function performs any action that requires the directive's element as input.
      var compile = function(inElement, inAttrs) {
        var link = function(inScope, inElement, inAttrs, inSwitchFaderCtrl) {
          inSwitchFaderCtrl.addView(inAttrs.view, inElement);
          if ("undefined" !== typeof inAttrs.default) {
            inSwitchFaderCtrl.setDefaultView(inAttrs.view);
          }
        }
        return link;
      };

      return {
        restrict: "E",
        require: "^switchFader",
        compile: compile
      };
    }

    app.directive('switchFader', [switchFader]);
    app.directive('caseFader', [caseFader]);
})();
