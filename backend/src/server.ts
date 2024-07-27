import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import qrCodeRoutes from './routes/qrCode';
import analyticsRoutes from './routes/analytics';
import { errorHandler } from './middleware/errorHandler';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/qr_code_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'QR Code API' });
}); 

app.use('/api/qr', qrCodeRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});