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
// All this does is add the enable() and disable() methods into MyComponent.prototype.
MethodManager.mixin(MyComponent);

const myComponent = new MyComponent();
console.log(myComponent.greet?.()); // 'hello'
myComponent.disable('greet');
console.log(myComponent.greet?.()); // undefined
myComponent.enable('greet');
console.log(myComponent.greet?.()); // 'hello'
```
See the `test/method-manager.test.js` for more elaborate usage.
