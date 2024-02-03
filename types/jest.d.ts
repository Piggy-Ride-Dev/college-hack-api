import "jest";

declare global {
  namespace jest {
    interface MockInstance<T, Y extends any[]> {
      mockImplementation(fn?: (...args: Y) => T): Mock<T, Y>;
      mockResolvedValue(value: T): Mock<T, Y>;
    }
  }
}
