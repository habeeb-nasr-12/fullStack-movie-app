import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import movieTVShowRoutes from './routes/movieTVShowRoutes.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://your-frontend-domain.vercel.app',
  'https://your-frontend-domain.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', authenticateToken, movieTVShowRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎬 Welcome to Movies & TV Shows API',
    version: '1.0.0',
    description: 'A comprehensive API for managing your movie and TV show collection',
    features: [
      'User authentication and authorization',
      'CRUD operations for movies and TV shows',
      'Advanced filtering and search capabilities',
      'Statistics and analytics',
      'Pagination support'
    ],
    quick_start: {
      auth: 'POST /api/auth/signup to create an account',
      login: 'POST /api/auth/signin to get access token',
      movies: 'GET /api/movies to view your collection'
    },
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    // Initialize database connection
    const sequelize = await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  console.log('⏳ SIGTERM received. Shutting down gracefully...');
  const { sequelize } = await import('../config/database.js');
  await sequelize.close();
  console.log('✅ Database connection closed.');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('⏳ SIGINT received. Shutting down gracefully...');
  const { sequelize } = await import('../config/database.js');
  await sequelize.close();
  console.log('✅ Database connection closed.');
  process.exit(0);
});

startServer(); 