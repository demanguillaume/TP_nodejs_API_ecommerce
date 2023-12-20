import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const clusterName = process.env.DB_CLUSTER_NAME;

// Vérifie si les variables d'environnement nécessaires sont définies.
if (!username || !password || !clusterName) {
    console.error('Please provide values for DB_USERNAME, DB_PASSWORD, and DB_CLUSTER_NAME.');
    process.exit(1); // Arrête l'exécution du script en cas d'erreur.
}

const uri = `mongodb+srv://${username}:${password}@${clusterName}.wwdeyzg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error; // Rejette l'erreur pour que l'application puisse la gérer correctement.
});
