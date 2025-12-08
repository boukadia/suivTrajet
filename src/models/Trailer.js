// src/models/Trailer.js
const mongoose = require('mongoose');

const trailerSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true, unique: true },
    type: { type: String },
    capacity: { type: Number },
    status: { type: String, enum: ['Disponible', 'En maintenance'], default: 'Disponible' },
}, { timestamps: true });

module.exports = mongoose.model('Trailer', trailerSchema);
