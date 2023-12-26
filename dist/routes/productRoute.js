"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// POST /product
router.post('/', productController_1.createProduct);
// GET /product
router.get('/', productController_1.getAllProducts);
// GET /product/:id
router.get('/:id', productController_1.getProductById);
// PATCH /product/:id
router.patch('/:id', productController_1.updateProductById);
// DELETE /product/:id
router.delete('/:id', productController_1.deleteProductById);
exports.default = router;
//# sourceMappingURL=productRoute.js.map