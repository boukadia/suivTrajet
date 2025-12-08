// src/app.js

// Import modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const truckRoutes = require('./routes/truckRoutes');
const trailerRoutes = require('./routes/trailerRoutes');
const tyreRoutes = require('./routes/tyreRoutes');
const tripRoutes = require('./routes/tripRoutes');

// Import middleware
const { errorHandler } = require('./middlewares/errorHandler');

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./config/database');
connectDB();


// Routes
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/trailers', trailerRoutes);
app.use('/api/tyres', tyreRoutes);
app.use('/api/trips', tripRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Backend Fleet Management API is running 🚀');
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
