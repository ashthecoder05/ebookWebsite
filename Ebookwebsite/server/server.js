import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Database configuration
import { testConnection } from './config/database.js';
import { syncModels } from './models/index.js';

// Routes
import bookRoutes from './routes/bookRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscriptionRoutes);

// Test database connection and sync models
const initializeDatabase = async () => {
  await testConnection();
  // Set force to true only the first time to create tables
  // After the first run, set it to false to avoid losing data
  await syncModels(false);
};

// Start server after database initialization
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
}); 