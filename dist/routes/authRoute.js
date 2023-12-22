"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
console.log('authRoute');
// signup
router.post('/signup', authController_1.registerUser);
// signin
router.post('/signin', authController_1.loginUser);
exports.default = router;
//# sourceMappingURL=authRoute.js.map