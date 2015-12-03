// This example shows how to create service "providers"/"factories"/"constructors".
// A service is registered via a "service builder". The "service builder" will be used to create the service.
// A service builder may be:
//     - A simple object with a special method called "$get" that returns the service itself.
//     - A simple function that returns the service itself.
//     - A simple constructor that creates the service itself.



// ------------------------------------------------------------------------------
// Services' declarations for angular.Module.provider().
// The service builder is a simple object with a special method called "$get" that
// returns the service itself.
// ------------------------------------------------------------------------------

// The variable "service_provider_object" is a simple object.
// It contains the special property "$get".
// The special property "$get" must be a function that returns an object (that will be the service itself).
var service_provider_object = {
	$get: function() {
		return { // The returned object will be the service itself.
			name: "Service 1 is created by a provider that has been defined as an object.",
			getName: function() {
				return this.name;
			}
		}
	}
};

// The variable "service_provider_function" is a constructor.
// It is invoked by using the operator "new".
// The constructor must create an object that contains the special property "$get".
// The special property "$get" must be a function that returns an object (that will be the service itself).
var service_provider_function = function() {
	this.$get = function() {
		return { // The returned object will be the service itself.
			name: "Service 2 is created by a provider that has been defined as a constructor.",
			getName: function() {
				return this.name;
			}
		}
	}
};


// ------------------------------------------------------------------------------
// Services' declarations for angular.Module.factory().
// The service builder is a simple function that returns the service itself.
// ------------------------------------------------------------------------------

// The variable "service_factory_function" is a function that returns an object (that will be the service itself).
var service_factory_function = function() {
	return { // The returned object will be the service itself.
		name: "Service 3 is created by a factory that has been defined as a function.",
		getName: function() {
			return this.name;
		}
	}
};

// The variable "service_factory_array" is an array. It declares a service that has dependencies.
// Please note that the service provided by the function "service_function" depends on another service: the service which (registered) name is "service1Provider".
// WARNING !!!!!
// The string "service1Provider" refers to a service that should already be registered (within the DIC).
var service_function = function(service1) {
	return { // The returned object will be the service itself.
		name: "Service 4 is created by a factory that has been defined as an array.",
		getName: function() {
			console.log(service1);
			return this.name;
		}
	}
};
var service_factory_array = [ 'service1Provider', service_function];

// ------------------------------------------------------------------------------
// Services' declarations for angular.Module.service().
// The service builder is a simple constructor that creates the service itself.
// ------------------------------------------------------------------------------

// The variable "service_service_constructor" is a constructor.
var service_service_constructor = function() {
	this.name = "Service 5 is created by a constructor that has been defined as a function (should be registered by using angular.Module.service()).",
	this.getName = function() {
		return this.name;
	}
}

// The variable "service_constructor_array" is an array. It declares a service that has dependencies.
// Please note that the service provided by the function "service_constructor" depends on another service: the service which (registered) name is "service1Provider".
// WARNING !!!!!
// The string "service1Provider" refers to a service that should already be registered (within the DIC).
var service_constructor = function(service1) {
	this.name = "Service 6 has been defined by an array.",
	this.getName = function() {
		console.log(service1);
		return this.name;
	}
};
var service_constructor_array = [ 'service1Provider', service_constructor];


