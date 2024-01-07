import { User } from '../types/User';
import { ValidationResult } from '../interfaces/ValidationResult';

export function validateUser(user: User): ValidationResult {
    const errors: string[] = [];

    if (!user.firstName) {
        errors.push('First name is required');
    }

    if (!user.lastName) {
        errors.push('Last name is required');
    }

    if (!user.email) {
        errors.push('Email is required');
    } else if (!isValidEmail(user.email)) {
        errors.push('Invalid email format');
    }

    if (!user.password) {
        errors.push('Password is required');
    } else if (!isValidPassword(user.password)) {
        errors.push('Invalid password format');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    // Use bcrypt to match the password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
