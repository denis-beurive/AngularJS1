# Services, modules, Components...

If you used other languages or frameworks, then you may be confused by the AngularJS' terminology.

* What is a controller ? Does it contain the application's logic, as it is the case within MVC frameworks such as Symfony, ZF or ROR ?  
* What is a module ? Is it the equivalent of a Python or a Perl's module ?
* What is a service ? 
* What is a component ?

Here is a list of definitions:

**Component**: a component is any piece of code. "Component" is short for "software component". Any piece of code is a component.

**Module**: A module is a kind of component that is used as a container for other components (except for modules). Modules don't just "contain" components. Modules also organize components. Software componants contained within a module may be: services, controllers, filters, directives, configuration values.

> Please note that like any other software componants used whithin the AngularJS framework, modules have names. These names are registered within the DIC. Also, like any other software componants, modules may declare dependencies. However, unlike services, controllers, filters or directives, modules does not require to register "factory functions" (or any kind of "constructor").

**Controller**: a controller is a kind of component used to act on the "scope" component. Please note that, within the AngularJS framework, controllers don't implement the application's logic. Application's logic should ne implemented whithin services.

**Directive**: a directive is a kind of component that is associated to a DOM element.

**Filter**: a filter is a kind of component that formats the value of an expression for display to the user.

**Configuration value**: as its name suggests it is a simple value that can be used by (or injected to) the components declared within the same module.

**Service**: a service is an object that can be everything but a module, a controller, a directive, a filter or a configuration value. Controllers, directives, filters or configuration values are special types of sofware components that have specific roles whithin the AngularJS framework. Services are software components that have no specific meaning for the AngularJS framework (other that being a service). In other words, services contain the code that implements the application's logic. Usualy, services are used by controllers, directives or other services.

> Please note that, within the AngularJS framework, controllers don't implement the application's logic. Controllers act on the "scope" component. 
>
> Please note that services need to be registered whithin a module. In fact, it is the act of registerng the service whthin a module that defines the componant being registered as a service (it's like a declaration).

Services are objects. However, the services' objects are not directly injected into your AngularJS application. What is injected, and thus, registered, is a piece of code that instantiates the service's object.   

Registering a service *to a module* may be done using three methods:

* Registering a *service provider*, by using the API's method `Module::provider`.
  The *service provider* may be an object or a function.
  * If if is an object, then it must contain the property "`$get" that points to *service factory function*.
    *The service factory* function will be responsable for creating the service (which is a singleton).
  * If it is a function, then this function must return an object (with the property "`$get`"...)
* Registering a *service factory*, by using the API's method `Module::factory`.
  The service may be a function or an array.
  * If the *service factory" is a function, then it will be responsable for creating the service (which is a singleton).
  * Using an array to define a *service factory* means that we declare some depedencies.
* Registering a *service constructor*, by using the API's method `Module::service.
  The *service constructor* may be a function or an array.
  * if it as a function, then it must be a constructor that will be used by calling "new".
    The instantiated object will be the actual service.
  * Using an array to define a *service constructor* means that we declare some dependencies.

Please also note that services are often wrongly called factories or providers. These appellations are wrong because a factory or a provider is not the service itself, but a piece of code that returns the service.   

