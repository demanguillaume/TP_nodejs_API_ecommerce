"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const ResponseError_1 = require("../types/ResponseError");
const validateId = (req, res, next) => {
    const id = req.params.id;
    if (id && isNaN(Number(id))) {
        next(new ResponseError_1.ResponseError(400, 'ID must be a number'));
    }
    next();
};
exports.validateId = validateId;
//# sourceMappingURL=validateId.js.map