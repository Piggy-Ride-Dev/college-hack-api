export class ControllerResponse<T> {
  constructor(
    public status: number = 200,
    public message: string = "",
    public data: T | null = null
  ) {
    if (this.isError()) {
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }

  static success<T>(data: T) {
    return new ControllerResponse(200, "Success", data);
  }

  static error<T>(status: number, message: string) {
    return new ControllerResponse<T>(status, message, null);
  }

  isSuccess() {
    return this.status >= 200 && this.status < 300;
  }

  isError() {
    return this.status >= 400;
  }
}
