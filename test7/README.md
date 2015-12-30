This example illustrates the use of the service "ngAnimate".

It points out the following uses:

* The use of the animation callback promise that allows us to perform an action at the end of the animation.
* The use of jqLite to set event handlers (instead of using the directive "ng-click"). This technique implies the use of "$scope.apply()".
* The use of jqLite to set buttons' attributes (instead of using the directive "ng-disabled").

The example uses the following CSS stylesheet for the animations:

https://github.com/daneden/animate.css