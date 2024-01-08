"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
// MIDDLEWARES
const validateUserDatas_1 = require("../middlewares/validateUserDatas");
const sendJsonResponse_1 = require("../middlewares/sendJsonResponse");
const router = express_1.default.Router();
// signup
router.post('/signup', (0, validateUserDatas_1.validateUserDatas)(), authController_1.registerUser, (0, sendJsonResponse_1.sendJsonResponse)('token'));
// signin
router.post('/signin', authController_1.loginUser, (0, sendJsonResponse_1.sendJsonResponse)('token'));
exports.default = router;
//# sourceMappingURL=authRoute.js.map