(function() {

	var module = angular.module('dbJavascriptServiceProviderModule', []); 

	var Singleton = {

		inArray: function(needle, haystack) {
    		var length = haystack.length;
    		for(var i = 0; i < length; i++) {
        		if(haystack[i] == needle) return true;
    		}
    		return false;
		}
	};

	/**
	 * Service provider.
	 */
	var serviceProvider = function() {
		this.$get = function() {
			return Singleton;
		};
	};

	// Register the service into the Angular's DIC.
	module.provider('dbJavascriptServiceProvider', serviceProvider);

})();