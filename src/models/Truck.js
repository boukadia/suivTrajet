// src/models/Truck.js
const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true, unique: true },
    brand: { type: String },
    model: { type: String },
    mileage: { type: Number, default: 0 },
    fuelConsumption: { type: Number, default: 0 },
    tyres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tyre' }],
}, { timestamps: true });

module.exports = mongoose.model('Truck', truckSchema);
