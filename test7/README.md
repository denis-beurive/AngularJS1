This example illustrates the use of the service "ngAnimate".

It points out the following uses:

* The use of the animation callback promise that allows us to perform an action at the end of the animation.
* The use of jqLite to set event handlers (instead of using the directive "ng-click"). This technique implies the use of "$scope.apply()".
* The use of jqLite to set buttons' attributes (instead of using the directive "ng-disabled").

The example uses the following CSS stylesheet for the animations:

https://github.com/daneden/animate.css

Very important notes:

* Make sure to load `angular-animate.js`.
* Make sure to declare the dependencies to the module `ngAnimage`.
* Make sure to declare the dependencies to  `$animate` (for directives).
* Do _NOT_ apply animation on a directive's tag.
* Use `$scope.appy(...)` when necessary (typically within an event handler).

If you forget one of these points, you won't get any error message! But it won't work!

Furthermore, note that children directives inherit the scope from their parent. Then you must make sure that all children directives use a distinct name as variables within the scope. Typically, if you have two forms within a "container directive", then do not define the same variable `$scope.disabled.submit` for the two forms.