(function() {

	var module = angular.module('myDirectiveModule', ['ngAnimate']);
	
	var directive = function($animate) {

		var controller = function($scope) {
			$scope.fadeOutDisabled = false;
		};

		var compile = function(inElement, inAttrs) {
			var link = function(inScope, inElement, inAttrs) {
				// Find the button that triggers the animation "fade in", and the text to animate.
				var button = angular.element(inElement).find('button').eq(1); 
				var text   = angular.element(inElement).find('p');

				// Define the function that will be triggered by a click to the first button (which label is "fadeOut").
				inScope.fadeOut = function() {
					// Disable the button that triggers the fading out.
					inScope.fadeOutDisabled = true;

					// WARNING !!!
					// The second and the third argument of the method "$animate.animate()" are objects, not strings.
					// These arguments represent CSS styles (not class' names).
					$animate.animate(text, {}, {opacity:0}, 'fadingOut').then(function() {
						// Enable the button that triggers the fading in.
						button.removeAttr("disabled");
					});
				}

				// Define the function that will be triggered by a click to the second button (which label is "fadeIn").
				button.bind('click', function() {
					// Keep in mind that you will still need to run "$scope.$apply" inside of the "then" callback to trigger a digest.
					// As bind is a jQuery/jqLite method it does not trigger the digest loop automatically for you like for example "ng-click" would.
					inScope.$apply(function() {
						// Disable the button that triggers the fading in.
						button.attr("disabled", "1");
						$animate.animate(text, {}, {opacity:1}, 'fadingIn').then(function() {
							inScope.fadeOutDisabled = false;
						});
					});
				});

			};
			return link;
		};

		return {
			restrict: "E",
			controller: [ '$scope', controller ],
			compile: compile,
			replace: true,
			templateUrl: 'template.html'
		};
	};

	// Do not forget to declare the dependency for "$animate" !.
	module.directive('myDirective', ['$animate', directive]);

})();