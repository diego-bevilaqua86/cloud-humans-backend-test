export class HttpException extends Error {
  private _status: number;
  private _message: string;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
    this._message = message;
  }

  get status(): number {
    return this._status;
  }

  set status(newStatus: number) {
    this._status = newStatus;
  }

  get message(): string {
    return this._message;
  }

  set message(newMessage: string) {
    this._message = newMessage;
  }
}
