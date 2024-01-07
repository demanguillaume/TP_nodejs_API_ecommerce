"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseErrorMiddleware = void 0;
const ResponseError_1 = require("../types/ResponseError");
const responseErrorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof ResponseError_1.ResponseError) {
        if (err.message && err.message.trim() !== '') {
            console.error(err.message);
        }
        return res.status(err.statusCode).json({ error: err.clientMessage });
    }
    else {
        next(err);
    }
};
exports.responseErrorMiddleware = responseErrorMiddleware;
//# sourceMappingURL=responseErrorMiddleware.js.map