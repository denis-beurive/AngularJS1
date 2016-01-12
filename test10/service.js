(function() {

	// This example shows how de declare dependencies for a service provider.
	// Please note that de declaration of the dependencies is done within the method "$get()".
	// SEE: https://docs.angularjs.org/guide/providers

	var module = angular.module('dbServiceServiceProviderModule' , ['ngRoute', 'dbJavascriptServiceProviderModule']); 

	var serviceProvider = function() {

		// Here, we declare the dependencies for this provider.
		this.$get = ['dbJavascriptServiceProvider', function(dbJavascriptServiceProvider) {

			var constructor = function(inArray) {
				this.array = inArray;
			};

			constructor.prototype = {
				elementInArray: function(inElement) {
					return dbJavascriptServiceProvider.inArray(inElement, this.array);
				}
			};			

			return constructor;
		}];
	};

	// Register the service into the Angular's DIC.
	module.provider('dbServiceServiceProvider', serviceProvider);

})();