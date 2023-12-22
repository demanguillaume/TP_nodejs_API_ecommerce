"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    // Handle the error here
    console.error(err);
    // Send an appropriate response to the client
    res.status(500).json({
        message: 'Internal Server Error',
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map