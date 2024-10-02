export class MethodManager<T> {
  /**
   * Disables a method in the prototype by setting a property of the same name to "undefined" in the object instance.
   */
  disableMethod(
    method: keyof {
      // eslint-disable-next-line no-unused-vars
      [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
    },
  ): void {
    (this as unknown as T)[method] = undefined;
  }

  /**
   * Enables a method by removing its "undefined" masking property to reveal the method in the prototype.
   */
  enableMethod(
    method: keyof {
      // eslint-disable-next-line no-unused-vars
      [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
    },
  ): void {
    delete (this as unknown as T)[method];
  }

  static mixin<T>(targetClass: new () => T) {
    const methods = Object.getOwnPropertyNames(MethodManager.prototype).filter(
      (methodName) => methodName !== "constructor",
    );

    for (const methodName of methods)
      targetClass.prototype[methodName] = MethodManager.prototype[methodName];
  }
}
