"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
function validateUser(user) {
    const errors = [];
    if (!user.firstName) {
        errors.push('First name is required');
    }
    if (!user.lastName) {
        errors.push('Last name is required');
    }
    if (!user.email) {
        errors.push('Email is required');
    }
    else if (!isValidEmail(user.email)) {
        errors.push('Invalid email format');
    }
    if (!user.password) {
        errors.push('Password is required');
    }
    else if (!isValidPassword(user.password)) {
        errors.push('Invalid password format');
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
}
exports.validateUser = validateUser;
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPassword(password) {
    // Use bcrypt to match the password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
//# sourceMappingURL=validationUtils.js.map