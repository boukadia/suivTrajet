
// Import modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/api/userRoutes');
const camionRoutes = require('./routes/api/camionRoutes');
const remorqueRoutes = require('./routes/api/remorqueRoutes');
const pneuRoutes = require('./routes/api/pneuRoutes');
const trajetRoutes = require('./routes/api/trajetRoutes');
const maintenanceRoutes = require('./routes/api/maintenanceRoutes');


// Initialize app
const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./config/database');
connectDB();


// Routes

app.use('/api/users', userRoutes);
app.use('/api/camions', camionRoutes);
app.use('/api/remorques', remorqueRoutes);
app.use('/api/pneus', pneuRoutes);
app.use('/api/trajets', trajetRoutes);
app.use('/api/maintenances', maintenanceRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Backend Fleet Management API is running 🚀');
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
