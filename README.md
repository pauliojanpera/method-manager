# method-manager

a platform-agnostic zero-dependency mixin class for enabling/disabling EcmaScript/Typescript object methods dynamically

# Usage

```javascript
class MyComponent {
  greet() {
    return 'hello';
  }
}
// Insert MethodManager into MyComponent.
// All this does is add the enableMethod() and disableMethod() methods into MyComponent.prototype.
MethodManager.mixin(MyComponent);

const myComponent = new MyComponent();
console.log(myComponent.greet?.()); // 'hello'
myComponent.disableMethod('greet');
console.log(myComponent.greet?.()); // undefined
myComponent.enableMethod('greet');
console.log(myComponent.greet?.()); // 'hello'
```
See the [test/method-manager.test.js](test/method-manager.test.js) for more elaborate usage.
