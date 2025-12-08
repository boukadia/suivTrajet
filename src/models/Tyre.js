// src/models/Tyre.js
const mongoose = require('mongoose');

const tyreSchema = new mongoose.Schema({
    brand: { type: String },
    model: { type: String },
    state: { type: String, enum: ['Neuf', 'Usé', 'A remplacer'], default: 'Neuf' },
    truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
}, { timestamps: true });

module.exports = mongoose.model('Tyre', tyreSchema);
