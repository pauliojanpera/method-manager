# method-manager
*a platform-agnostic zero-dependency mixin class for enabling/disabling EcmaScript/Typescript object methods dynamically*

Masks methods in the object prototype by setting a property with the undefined value in the object (class instance).
This effectively denies access to the method of the same name in the prototype. Re-enabling methods is just about
removing the masking property with `delete`.

# Usage

```javascript
class MyComponent {
  greet() {
    return 'hello';
  }
}
// Insert MethodManager into MyComponent. All this does is
// add the enableMethod() and disableMethod() methods into
// MyComponent.prototype.
MethodManager.mixin(MyComponent);

const myComponent = new MyComponent();
console.log(myComponent.greet?.()); // 'hello'
myComponent.disableMethod('greet');
console.log(myComponent.greet?.()); // undefined
myComponent.enableMethod('greet');
console.log(myComponent.greet?.()); // 'hello'
```
See the [test/method-manager.test.js](test/method-manager.test.js) for more elaborate usage.
