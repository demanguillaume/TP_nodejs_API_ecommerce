"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const User_1 = require("../types/User");
// MIDDLEWARES
const authorizeByRole_1 = require("../middlewares/authorizeByRole");
const sendJsonResponse_1 = require("../middlewares/sendJsonResponse");
const router = express_1.default.Router();
// READ /product
router.post('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), productController_1.createProduct, (0, sendJsonResponse_1.sendJsonResponse)('product'));
// READ ALL /product
router.get('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), productController_1.getAllProducts, (0, sendJsonResponse_1.sendJsonResponse)('products'));
// READ BY ID /product/:id
router.get('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), productController_1.getProductById, (0, sendJsonResponse_1.sendJsonResponse)('product'));
// UPDATE /product/:id
router.patch('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), productController_1.updateProductById, (0, sendJsonResponse_1.sendJsonResponse)('product'));
// DELETE /product/:id
router.delete('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), productController_1.deleteProductById, (0, sendJsonResponse_1.sendJsonResponse)('message'));
exports.default = router;
//# sourceMappingURL=productRoute.js.map