"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
// Middleware pour autoriser les requêtes de tous les domaines (à ajuster en fonction de vos besoins)
app.use((0, cors_1.default)());
// Middleware pour parser le corps des requêtes en JSON
app.use(body_parser_1.default.json());
// Routes utilisateur
console.log('app.ts - authRoute');
app.use('/auth', authRoute_1.default);
// Middleware de gestion des erreurs
app.use(errorMiddleware_1.errorMiddleware);
// Port d'écoute de l'application
const PORT = process.env.PORT || 3000;
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map