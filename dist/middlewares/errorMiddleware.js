"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    // Si une propriété 'status' est définie sur l'erreur, utilisez-la pour définir le code de statut
    const statusCode = err.status || 500;
    // Si une propriété 'message' est définie sur l'erreur, utilisez-la pour définir le message d'erreur
    const errorMessage = err.message || 'Internal Server Error';
    // Log the error
    console.error(err);
    // Set the status code and error message
    res.status(statusCode).json({ error: errorMessage });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map