import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

// Middleware to allow requests from all domains (adjust according to your needs)
app.use(cors());

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// User routes
app.use('/user', userRoute);

// Auth routes
app.use('/auth', authRoute);

// Product routes
app.use('/product', productRoute);

// Order routes
app.use('/order', orderRoute);

// Error handling middleware
app.use(errorMiddleware);

// Application listening port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
