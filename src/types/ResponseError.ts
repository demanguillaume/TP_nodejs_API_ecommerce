export class ResponseError extends Error {
  statusCode: number;
  clientMessage: string;

  constructor(statusCode: number, clientMessage: string, message: string = '') {
    super(message);
    this.name = 'ResponseError';
    this.statusCode = statusCode;
    this.clientMessage = clientMessage;
  }
}
