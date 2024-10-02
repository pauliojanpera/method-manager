export class MethodManager<T extends Object> {
  /**
   * Disables a method in the prototype by setting a property of the same name to "undefined" in the object instance.
   */
  disableMethod(
    method: keyof {
      // eslint-disable-next-line no-unused-vars
      [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
    },
  ): void {
    const self = this as unknown as T;

    const prototype = Object.getPrototypeOf(self);
    if (typeof prototype[method] !== "function")
      throw new Error(`The method does not exist: ${String(method)}`);

    if (Object.prototype.hasOwnProperty.call(self, method))
      if (self[method] !== undefined)
        throw new Error(
          `The mask already exists and doesn't even equal undefined: ${String(method)} === ${String(self[method])}`,
        );
      else throw new Error(`The mask already exists: ${String(method)}`);

    self[method] = undefined;
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
    const self = this as unknown as T;

    const prototype = Object.getPrototypeOf(self);

    if (typeof prototype[method] !== "function")
      throw new Error(`The method does not exist: ${String(method)}`);

    if (!Object.prototype.hasOwnProperty.call(self, method))
      throw new Error(`The mask does not exist: ${String(method)}`);

    if (self[method] !== undefined)
      throw new Error(
        `The mask does not equal undefined: ${String(method)} === ${String(self[method])}`,
      );

    delete self[method];
  }

  static mixin<T>(targetClass: new () => T) {
    const methods = Object.getOwnPropertyNames(MethodManager.prototype).filter(
      (methodName) => methodName !== "constructor",
    );

    for (const methodName of methods)
      targetClass.prototype[methodName] = MethodManager.prototype[methodName];
  }
}
