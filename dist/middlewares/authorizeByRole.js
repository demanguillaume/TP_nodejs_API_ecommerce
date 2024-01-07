"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeByRole = void 0;
const ResponseError_1 = require("../types/ResponseError");
const authorizeByRole = (roles) => {
    return (req, res, next) => {
        const user = res.locals.user;
        if (user && user.role && roles.includes(user.role)) {
            next();
        }
        else {
            next(new ResponseError_1.ResponseError(403, 'Unauthorized'));
        }
    };
};
exports.authorizeByRole = authorizeByRole;
//# sourceMappingURL=authorizeByRole.js.map