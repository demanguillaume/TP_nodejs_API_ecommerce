import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoute from './routes/authRoute';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

// Middleware pour autoriser les requêtes de tous les domaines (à ajuster en fonction de vos besoins)
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Routes utilisateur
console.log('app.ts - authRoute');
app.use('/auth', authRoute);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

// Port d'écoute de l'application
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
