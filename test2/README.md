The validator is, in fact, a liberator...

As you can see, if an input gets assigned a "release function" (the so-called "validator"), then the model bound to the input is not set if the validation fails.

Thus, the term "release function" is more appropriate that "validation function" or "validator". Indeed, unless the value entered by the user is valid, it is not "released" from the input container (to the scope).

Therefore, toward the rest of this document, we will use the term "release function" instead of "validator", as it is more appropriate to describe the behavior of the "validation functionality".

While this behavior is a "dignified" one, you may want to give users detailed error messages in case their entries are not valid. If you rely on the attribute `$error` (bound to the input), then all you can say is that the field is not valid or that no value is given although it is required. You may want to tell the user a little more.

One way to do that is to set a handler to the "blur" event, which signals that the input lost the focus. The function that implements the event handler gets the event as argument: `function(event)`. You get the actual value of the input by extracting it from the DOM, rather than from the DOM: `angular.element(event.currentTarget).val()`. Then, once you get the value, you can perform any operation on it and on the DOM.
