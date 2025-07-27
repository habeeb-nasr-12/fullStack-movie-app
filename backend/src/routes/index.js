const express = require('express');
const movieTVShowRoutes = require('./movieTVShowRoutes');
const authRoutes = require('./authRoutes');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});


router.use('/auth', authRoutes);


router.use('/movies', authenticateToken, movieTVShowRoutes);

module.exports = router; 