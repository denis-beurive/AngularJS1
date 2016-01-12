(function() {

    var app = angular.module('app', ['ngRoute', 'dbJavascriptServiceProviderModule', 'dbServiceServiceProviderModule']);

    var controller = function($scope, dbServiceServiceProvider) {
    	var service = dbServiceServiceProvider;
    	var s = new service(["A", "B", "C"]);
    	$scope.value1 = s.elementInArray("A");
    	$scope.value2 = s.elementInArray("Z");
    };

    app.controller('PageController', ['$scope', 'dbServiceServiceProvider', controller]);

})();