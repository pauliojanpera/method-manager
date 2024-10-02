import { expect } from "chai";
import { MethodManager } from "../dist/es/method-manager.js";

class MyComponent {
  static {
    MethodManager.mixin(MyComponent);
  }
  /** @type {MethodManager<this>} */
  methodManager;

  constructor() {
    this.methodManager = /** @type {any} */ (this);
  }

  init() {
    this.methodManager.enableMethod("myResettableSingleShotMethod");
  }

  async myResettableSingleShotMethod() {
    this.methodManager.disableMethod("myResettableSingleShotMethod");
    return "myResettableSingleShotMethod executed";
  }
}

describe("MethodManager", () => {
  it("should enable and disable methods dynamically", async () => {
    const component = new MyComponent();

    // Initially method is enabled.
    expect(await component.myResettableSingleShotMethod?.()).to.equal(
      "myResettableSingleShotMethod executed",
    );

    // The method should disable itself at every call.
    expect(await component.myResettableSingleShotMethod?.()).to.be.undefined;

    // Re-enable method.
    component.init();
    expect(await component.myResettableSingleShotMethod?.()).to.equal(
      "myResettableSingleShotMethod executed",
    );
  });
});
