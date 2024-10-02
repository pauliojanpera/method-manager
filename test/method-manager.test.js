import { expect } from "chai";
import { MethodManager } from "../dist/es/method-manager.js";

class MyComponent {
  static {
    MethodManager.mixin(MyComponent);
  }
  /** @type {MethodManager<this>} */
  methodManager;

  existingProperty = "I am a property, not a method";
  
  constructor() {
    this.methodManager = /** @type {any} */ (this);
  }

  init() {
    this.methodManager.enableMethod("myResettableSingleShotMethod");
  }

  existingMethod() {
    return 'existingMethod executed';
  }

  myResettableSingleShotMethod() {
    this.methodManager.disableMethod("myResettableSingleShotMethod");
    return "myResettableSingleShotMethod executed";
  }
}

class SubComponent extends MyComponent {
  anotherMethod() {
    return "anotherMethod executed";
  }
}

describe("MethodManager", () => {
  it("should enable and disable methods dynamically", async () => {
    const component = new MyComponent();

    // Initially method is enabled.
    expect(component.myResettableSingleShotMethod?.()).to.equal(
      "myResettableSingleShotMethod executed",
    );

    // The method should disable itself at every call.
    expect(component.myResettableSingleShotMethod?.()).to.be.undefined;

    // Re-enable method.
    component.init();
    expect(component.myResettableSingleShotMethod?.()).to.equal(
      "myResettableSingleShotMethod executed",
    );
  });

  it("should not add or delete properties if method does not exist in prototype", () => {
    const component = new MyComponent();

    // Check that there is no 'nonExistentMethod' in prototype
    expect(Object.getPrototypeOf(component).hasOwnProperty("nonExistentMethod")).to.be.false;

    // Call disableMethod on a non-existent method
    expect(() => component.methodManager.disableMethod("nonExistentMethod")).to.throw(Error);

    // Ensure no property is added to the instance
    expect(component.hasOwnProperty("nonExistentMethod")).to.be.false;

    // Call enableMethod on a non-existent method
    expect(() => component.methodManager.enableMethod("nonExistentMethod")).to.throw(Error);

    // Ensure no property is deleted since it never existed
    expect(component.hasOwnProperty("nonExistentMethod")).to.be.false;
  });

  it("should not override or delete genuine properties", () => {
    const component = new MyComponent();

    // Ensure the genuine property exists initially
    expect(component.existingProperty).to.equal("I am a property, not a method");

    // Call disableMethod on a property that is not a method
    expect(() => component.methodManager.disableMethod("existingProperty")).to.throw(Error);

    // Ensure the genuine property is not overridden
    expect(component.existingProperty).to.equal("I am a property, not a method");

    // Check if enableMethod throws an error when called on a property that is not a method
    expect(() => component.methodManager.enableMethod("existingProperty")).to.throw(Error);
  
    // Ensure the genuine property is not deleted
    expect(component.existingProperty).to.equal("I am a property, not a method");
  });

  it("should handle methods inherited from parent", () => {
    const subComponent = new SubComponent();
  
    // Ensure method exists in subclass
    expect(subComponent.existingMethod?.()).to.equal("existingMethod executed");
  
    // Disable the inherited method
    subComponent.methodManager.disableMethod("existingMethod");
  
    // Ensure the method is now undefined
    expect(subComponent.existingMethod).to.be.undefined;
  
    // Re-enable the inherited method
    subComponent.methodManager.enableMethod("existingMethod");
  
    // Ensure the method is re-enabled and works again
    expect(subComponent.existingMethod?.()).to.equal("existingMethod executed");
  });

  it("should handle methods in a subclass", () => {
    const subComponent = new SubComponent();

    // Ensure method exists in subclass
    expect(subComponent.anotherMethod?.()).to.equal("anotherMethod executed");
  
    // Disable the own method
    subComponent.methodManager.disableMethod("anotherMethod");
  
    // Ensure the method is now undefined
    expect(subComponent.anotherMethod).to.be.undefined;
  
    // Re-enable the own method
    subComponent.methodManager.enableMethod("anotherMethod");
  
    // Ensure the method is re-enabled and works again
    expect(subComponent.anotherMethod?.()).to.equal("anotherMethod executed");
  });
});
