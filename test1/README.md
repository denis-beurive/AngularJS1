This test illustrates the following use cases of the Angular framework:

* Developing custom directives that communicate with one another through directive's controllers.
* Using isolated scopes for directives.
* Using jQuery's animations within Angular.
* Setting listeners that detect changes within the scope.
* Propagating a scope's change from outside the Angular's framework's execution context, so the change can be detected by listeners.

This test also underlines the following facts:

Directives' controllers are singletons. This means that variables declared within a directive's controller are shared among all instances of the directive. This may lead to serious troubles knowing that, generally, directives need their own execution's contexts. To solve this problem, we use the so-called scope's isolation technique which is nothing more than a way to create an execution context for each instance of the directive. An isolated scope is just an entry within the object that contains the main scope.

Directives' isolated scopes don't necessarily have to be declared within an application controller. Scopes just need to be declared before they are used. One way to do that is to declared the scopes within an application's controller. However, it can be done within a directive's controller too. The latter option has an advantage: the directive's user does not need to know about the directive's scope.

The directive's controller is executed before the "compile" function (and, Therefore, before the "link" function, since the latter is returned by the former). Hence, the "compile" function is a good place to Initialize an isolated scope.

When a "listener" (see note below) is defined, the scope's part that is watched is defined as a string of characters (and not as the actual variable being watched). The reason why we do not actually directly specify the variable being watched is that this variable may not be defined at the time the listener is set. We define an expression, as a string of characters, that will be interpreted later.

Please note that the term "listener" - found in the official documentation - may not be suitable. Following the API's nomenclature, I'd rather use the terms "watcher" or "observer". Indeed, the methods used to capture changes (whether from the scope or from an interpolated attributes) are: "$rootScope.Scope.$apply" (for the scope) and "$observe" (for interpolated attributes).

Code that executes within an event handler executes outside the Angular framework. Any change made to the scope from within an event handler is not notified to the possibly assigned "listeners". To notify the listeners that need to be notified, we call the method "$rootScope.Scope.$apply".

The official documentation states that the "compile" function and the "link" function should be used to manipulate the DOM. While this is true, it is not totally correct. These functions should be used to perform any initialization that needs to be done each time a directive is encountered in the document. Such initialization may involve the modification of the DOM, but it is not limited to. You may, for example, modify the scope.

Notes:

Please note the signature of the function "lonk()":

	var link = function(inScope, inElement, inAttrs, inController, inTranscludeFn)

