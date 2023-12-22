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
exports.deleteAllUsers = exports.deleteUserById = exports.getUserByEmail = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const validationUtils_1 = require("../utils/validationUtils");
const prisma = new client_1.PrismaClient();
// Controller for creating a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Check if the request body contains the necessary data
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is required' });
        }
        const { email, password, firstName, lastName } = req.body;
        // Validate user fields
        const validationError = (0, validationUtils_1.validateUser)({ email, password, firstName, lastName });
        if (validationError) {
            return res.status(400).json({ errors: validationError });
        }
        // Create a new user with the data provided in the request body
        const user = yield prisma.user.create({ data: req.body });
        // Return a 201 response with the created user
        return res.status(201).json({ user });
    }
    catch (error) {
        if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
            return res.status(400).json({ message: 'Duplicate key error: Email must be unique' });
        }
        // Handle other errors
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});
exports.createUser = createUser;
// Controller for getting a user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        // Check if no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getUserById = getUserById;
// Controller for getting all users
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
// Controller for getting a user by email
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for validation errors
        const userEmail = req.params.email;
        const user = yield prisma.user.findUnique({ where: { email: userEmail } });
        // Check if no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getUserByEmail = getUserByEmail;
// Controller for updating a user by ID
// export const updateUserById = async (req: Request, res: Response) => {
//     try {
//         const userId = Number(req.params.id);
//         // Check if the request body is empty
//         if (!req.body || Object.keys(req.body).length === 0) {
//             return res.status(400).json({ message: 'Request body is required' });
//         }
//         // Validate user fields
//         const validationError = validateUser({email, password, firstName, lastName});
//         if (validationError) {
//             return res.status(400).json({ errors: validationError });
//         }
//         const updatedUser = await prisma.user.update({
//             where: { id: userId },
//             data: req.body,
//         });
//         // Check if no user is found
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ user: updatedUser });
//     } catch (err: any) {
//         return res.status(500).json({ error: err.message });
//     }
// };
// Controller for deleting a user by ID
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const deleteUser = yield prisma.user.delete({ where: { id: userId } });
        // Check if no user is found
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteUserById = deleteUserById;
// Controller for deleting all users
const deleteAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAllUsers = yield prisma.user.deleteMany();
        // Check if no user is found
        if (!deleteAllUsers) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ message: 'All users deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteAllUsers = deleteAllUsers;
//# sourceMappingURL=userController.js.map