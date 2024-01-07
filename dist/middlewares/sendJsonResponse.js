"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonResponse = void 0;
const sendJsonResponse = (key) => {
    return (req, res, next) => {
        const responseStatus = res.statusCode || 200;
        let responseData = key ? res.locals[key] : res.locals;
        if (key === 'token') {
            responseData = { token: responseData };
        }
        return res.status(responseStatus).json(responseData);
    };
};
exports.sendJsonResponse = sendJsonResponse;
//# sourceMappingURL=sendJsonResponse.js.map