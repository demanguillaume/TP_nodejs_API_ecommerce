"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const ResponseError_1 = require("../types/ResponseError");
const prisma = new client_1.PrismaClient();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.product.create({
            data: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            },
        });
        res.status(201);
        res.locals.product = product;
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        if (products.length === 0) {
            next(new ResponseError_1.ResponseError(404, 'No products found'));
        }
        else {
            res.status(200);
            res.locals.products = products;
            next();
        }
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
        });
        if (!product) {
            next(new ResponseError_1.ResponseError(404, 'Product not found'));
        }
        else {
            res.status(200);
            res.locals.product = product;
            next();
        }
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.getProductById = getProductById;
const updateProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield prisma.product.update({
            where: {
                id: Number(productId),
            },
            data: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            },
        });
        res.status(200);
        res.locals.product = product;
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        yield prisma.product.delete({
            where: {
                id: Number(productId),
            },
        });
        res.status(200);
        res.locals.message = 'Product deleted successfully';
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=productController.js.map