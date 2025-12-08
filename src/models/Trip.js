// src/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
    trailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trailer' },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ['A faire', 'En cours', 'Terminé'], default: 'A faire' },
    departureMileage: { type: Number },
    arrivalMileage: { type: Number },
    fuelVolume: { type: Number },
    remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
