"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const User_1 = require("../models/User");
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.role && (user.role === User_1.UserRole.ADMIN || roles.includes(user.role))) {
            next();
        }
        else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map