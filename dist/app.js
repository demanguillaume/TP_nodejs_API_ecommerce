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
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
// Middleware to parse request bodies as JSON
app.use(body_parser_1.default.json());
// Middleware to allow requests from all domains (CORS)
app.use((0, cors_1.default)());
// Initialize passport (authentication middleware)
app.use(passport_1.default.initialize());
// Authentication routes (not protected by the isAuthenticated middleware)
app.use('/auth', authRoute_1.default);
// Apply isAuthenticated middleware to all subsequent routes
app.use(isAuthenticated_1.isAuthenticated);
// User routes
app.use('/user', userRoute_1.default);
// Product routes
app.use('/product', productRoute_1.default);
// Order routes
app.use('/order', orderRoute_1.default);
// Error middleware
app.use(errorMiddleware_1.errorMiddleware);
// Application listening port
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map