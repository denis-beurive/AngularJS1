# Theoretical description

A document is a piece of HTML that may contain _directives_, in the form of elements, attributes, comments or class' names. Before the document can be rendered, it needs to be processed so that the included directives are converted into HTML and JavaSccript. This processing involves two passes (the Angular parser parses the document twice):

* The compilation.
* The link process.

First, Angular "compiles" the document. But what does compiling the document mean?

Directives may contain _templates_, and these templates may contain _expressions_. Please note that templates can be stored within the _directive definition object_ (returned by the _directive's factory function_), or within an external file (which path is defined witin the _directive definition object_). These _templates_ need to be injected into the document, and their _expressions_ "processed". Processing an _expression_ means that we attach "watchers" on it, so that we create a two way binding between the _expression_ and the _scope_.

Creation of two way bindings between _expressions_ and the _scope_ is done by Angular automatically. Developers don't need to write any code to perform this task. However, developers can define specific bindings within the so-called "compile" function: `function compile(tElement, tAttrs)` [The Angular documentation](https://docs.angularjs.org/api/ng/service/$compile).

Secondly, Angular "links" the directives with the DOM.

[The Angular documentation](https://docs.angularjs.org/guide/directive):
> Directives that want to modify the DOM typically use the link option. `link` takes a function with the following signature, `function link(scope, element, attrs) { ... }`...

While this is true, it is not totally correct. The "link" function (that is, in fact, the _post linking_ function - see below) should be used to perform any initialization that needs to be done each time a directive is encountered in the document. Such initialization may involve the modification of the DOM, but it is not limited to. You may, for example, modify the scope.

Furthermore, note that the "link" function takes more that 3 parameters. It takes 5 parameters:

[The Angular documentation](https://docs.angularjs.org/api/ng/service/$compile):
> `function link(scope, iElement, iAttrs, controller, transcludeFn)`

Moreover, to be comprehensive, the linking process can be spanned into two sub-processes:

* The pre linking process. [See details](https://docs.angularjs.org/api/ng/service/$compile).
* The post linking process. [See details](https://docs.angularjs.org/api/ng/service/$compile).

# In practice

The following text is the formatted output obtained when loading the HTML document.

    <element1 name="E1-A"></element1>
    <element1 name="E1-B"></element1>

    Execute <element1Directive>.  // "element1" seen for the first time.
                                  // Return the directive definition object
    Execute <element1Directive::compile> on E1-A.
    Execute <element1Directive::compile> on E1-B.

    <element2 name="E2-A"></element2>
    <element2 name="E2-B"></element2>

    Execute <element2Directive>.  // "element2" seen for the first time.
                                  // Return the directive definition object
    Execute <element2Directive::compile> on E2-A.
    Execute <element2Directive::compile> on E2-B.

    <element1 name="E1-C" attribute1 attribute2></element1>

    Execute <attribute2Directive>.  // "attribute2" seen for the first time.
                                    // Return the directive definition object
    Execute <attribute1Directive>.  // "attribute2" seen for the first time.
                                    // Return the directive definition object
    Execute <attribute1Directive::compile> on E1-C.
    Execute <attribute2Directive::compile> on E1-C.
    Execute <element1Directive::compile> on E1-C.

    <element1 name="E1-D" attribute1 attribute2></element1>

    Execute <attribute1Directive::compile> on E1-D.
    Execute <attribute2Directive::compile> on E1-D.
    Execute <element1Directive::compile> on E1-D.

    <element1 name="E1-E">
      <element2 name="E2-C"></element2>
      <element2 name="E2-D"></element2>
    </element1>

    Execute <element1Directive::compile> on E1-E.
    Execute <element2Directive::compile> on E2-C.
    Execute <element2Directive::compile> on E2-D.

    // At this point, all instances of directives seen within the document have been compiled.
    // Execute the controllers and perform the link process.

    Execute <pageCtrl>.

    <element1 name="E1-A"></element1>
    <element1 name="E1-B"></element1>

    Execute <element1Directive::controller>.
    Execute <element1Directive::compile::pre_link> on E1-A.
    Execute <element1Directive::compile::post_link> on E1-A.
    Execute <element1Directive::controller>.
    Execute <element1Directive::compile::pre_link> on E1-B.
    Execute <element1Directive::compile::post_link> on E1-B.

    <element2 name="E2-A"></element2>
    <element2 name="E2-B"></element2>

    Execute <element2Directive::controller>.
    Execute <element2Directive::compile::pre_link> on E2-A.
    Execute <element2Directive::compile::post_link> on E2-A.
    Execute <element2Directive::controller>.
    Execute <element2Directive::compile::pre_link> on E2-B.
    Execute <element2Directive::compile::post_link> on E2-B.

    <element1 name="E1-C" attribute1 attribute2></element1>

    Execute <attribute1Directive::controller>.
    Execute <attribute2Directive::controller>.
    Execute <element1Directive::controller>.
    Execute <attribute1Directive::compile::pre_link> on E1-C.
    Execute <attribute2Directive::compile::pre_link> on E1-C.
    Execute <element1Directive::compile::pre_link> on E1-C.
    Execute <element1Directive::compile::post_link> on E1-C.
    Execute <attribute2Directive::compile::post_link> on E1-C.
    Execute <attribute1Directive::compile::post_link> on E1-C.

    <element1 name="E1-D" attribute1 attribute2></element1>

    Execute <attribute1Directive::controller>.
    Execute <attribute2Directive::controller>.
    Execute <element1Directive::controller>.
    Execute <attribute1Directive::compile::pre_link> on E1-D.
    Execute <attribute2Directive::compile::pre_link> on E1-D.
    Execute <element1Directive::compile::pre_link> on E1-D.
    Execute <element1Directive::compile::post_link> on E1-D.
    Execute <attribute2Directive::compile::post_link> on E1-D.
    Execute <attribute1Directive::compile::post_link> on E1-D.

    <element1 name="E1-E">
      <element2 name="E2-C"></element2>
      <element2 name="E2-D"></element2>
    </element1>

    Execute <element1Directive::controller>.
    Execute <element1Directive::compile::pre_link> on E1-E.
    Execute <element2Directive::controller>.
    Execute <element2Directive::compile::pre_link> on E2-C.
    Execute <element2Directive::compile::post_link> on E2-C.
    Execute <element2Directive::controller>.
    Execute <element2Directive::compile::pre_link> on E2-D.
    Execute <element2Directive::compile::post_link> on E2-D.
    Execute <element1Directive::compile::post_link> on E1-E.


During the first pass:

* The parser creates directives' definition objects for all directives (*not instances of directives*) encountered within the document. The first time the Angular's parser encounters a directive within the document, it immediately executes the _directive's factory function_, which returns the _directive definition object_. Please note that a _directive' factory function_ is executed only once, no matter how many times the directive is seen within the document being parsed. Furthermore, note that the application's module may contain more _directives' factory functions_ than the number of directives actually seen within the document. Only the _directives' factory functions_ associated to the directives actually seen within the document are executed.

* The parser compiles the _templates_ that represent directives. The goal of the compilation process is to attach event listeners to the HTML to make it interactive. The compilation is done by the so-called "compile" function. Unlike the _directive's factory function_, the so-called "compile" function is executed each time an instance of a directive is encountered within the document. Remember, however, that the so-called "compile" function can be used for something else than attaching listeners to the HTML.

Please note that the _directive's factory function_ returns the _directive's definition object_, which contains the so-called "compile" function used to compile the _template_ that represent directives. This implies that the compilation is necessarily done after the execution of the _directive's factory function_. Furthermore, note that the so-called "compile" function receives as aguments the directive's template: `function(inElement, inAttrs)`.

During the second pass:

The parser executes controllers and performs links.

When the parser encounters a directive's instance, it executes its controller.

We can see that, when an element contains attributes:

* Attributes' controllers are executed before the element's controller.
* Pre-linking is done for the attributes first. Secondary, the element is entirely linked. Finally, the post linking process is done for the attributes. This strategy allows the attributes' directives to interact (through a controller) with the element's directive's template during the post linking process - since the element's directive's template has been processed beforehand.

We can see that, when an element contains nested elements:

* The deeper an element is nested, the latter its controller is executed.
* The deeper an element is nested, the sooner it is *totally* compiled (that is: the sooner the post compilation is done). The consequence of this strategy is that when an element is "post compiled", its template is ready to be accessed.
