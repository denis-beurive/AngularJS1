# AngularJS1

Very important notes:

* In the HTML file for the application, make sure to load `angular-animate.js` if you plan to use `$animate`.
* In the HTML file for the application, make sure to load `angular-route.js` if you plan to declare services.
* In the declaration for a module, make sure to declare the dependencies to the module `ngAnimage` if you plan to use `$animate`.
* In the declaration for a directive, make sure to declare the dependencies to  `$animate` (for directives).
* Do _NOT_ apply animation on a directive's tag (exemple: <my-directive />). 
* Use `$scope.apply(...)` when necessary (typically within an event handler).
* Let's assume that you write a directive that uses other directives. In the declaration for your directive's module, make sure to declare the dependencies to all modules that define directives used within your directive's template.   

If you forget one of these points, **you won't get any error message**! But it won't work! You can spend hours trying to find the cause of the error! From this point of view AngularJS is really shit.  

Furthermore, note that children directives inherit the scope from their parent. Then you must make sure that all children directives use distinct names for variables within the scope. Typically, if you have two forms within a "container directive", then do not define the same variable `$scope.disabled.submit` for the two forms.


In order to make sure that a module is loaded, you can use the following test:

	angular.module(<name of the module>);

