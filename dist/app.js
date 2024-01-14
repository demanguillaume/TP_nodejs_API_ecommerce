"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("./utils/passport");
const passport_1 = __importDefault(require("passport"));
// ROUTES
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
// MIDDLWARES
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const responseErrorMiddleware_1 = require("./middlewares/responseErrorMiddleware");
const sendJsonResponse_1 = require("./middlewares/sendJsonResponse");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createAdminUser_1 = require("./utils/createAdminUser");
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Limit requests from the same IP
const limiter = (0, express_rate_limit_1.default)({
    max: 15,
    windowMs: 2 * 60 * 1000, // 2 minutes
    message: 'Too many requests from this IP, please try again in 2 minutes !',
});
app.use(limiter);
// Middleware to parse request bodies as JSON
app.use(body_parser_1.default.json());
// Middleware to allow requests from all domains (CORS)
// Initialize passport (authentication middleware)
app.use(passport_1.default.initialize());
// Authentication routes (not protected by the isAuthenticated middleware)
app.use('/auth', authRoute_1.default);
// Middleware to check if user is authenticated
app.use(isAuthenticated_1.isAuthenticated);
// User routes
app.use('/user', userRoute_1.default);
// Product routes
app.use('/product', productRoute_1.default);
// Order routes
app.use('/order', orderRoute_1.default);
// Response middleware
app.use(sendJsonResponse_1.sendJsonResponse);
// Response Error middleware
app.use(responseErrorMiddleware_1.responseErrorMiddleware);
// Application listening port
const PORT = process.env.PORT || 3000;
// Create the admin user if needed
(0, createAdminUser_1.createAdminUser)();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map