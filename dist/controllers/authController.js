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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const dotenv_1 = require("dotenv");
const bcrypt_2 = require("bcrypt");
const prisma = new client_1.PrismaClient();
(0, dotenv_1.config)(); // Load environment variables from .env file
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT secret key is missing');
}
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        // Hash the password
        const hashedPassword = yield (0, bcrypt_2.hash)(password, 10);
        // Create a new user
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        // Generate a JWT token
        const token = (0, jsonwebtoken_1.sign)({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });
        // Send the token in the response
        return res.status(201).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Verify that the password matches the one stored in the database
        const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // Generate a JWT token
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        // Send the token in the response
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map