"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(statusCode, clientMessage, message = '') {
        super(message);
        this.name = 'ResponseError';
        this.statusCode = statusCode;
        this.clientMessage = clientMessage;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=ResponseError.js.map