import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/passport'; 
import passport from 'passport';

// ROUTES
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

// MIDDLWARES
import { isAuthenticated } from './middlewares/isAuthenticated';
import { responseErrorMiddleware } from './middlewares/responseErrorMiddleware';
import { sendJsonResponse } from './middlewares/sendJsonResponse';

const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Middleware to allow requests from all domains (CORS)
//app.use(cors());

// Initialize passport (authentication middleware)
app.use(passport.initialize());

// Authentication routes (not protected by the isAuthenticated middleware)
app.use('/auth', authRoute);

// Middleware to check if user is authenticated
app.use(isAuthenticated);

// User routes
app.use('/user', userRoute);

// Product routes
app.use('/product', productRoute);

// Order routes
app.use('/order', orderRoute);

// Response middleware
app.use(sendJsonResponse);

// Response Error middleware
app.use(responseErrorMiddleware);

// Application listening port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
