const mongoose = require('mongoose');

const remorqueSchema = new mongoose.Schema({
    numeroImmatriculation: { type: String, required: true, unique: true },
    type: { type: String },
    capacite: { type: Number },
     kilometrage: Number, // kilometrage actuel de la remorque
    dernierControleKm: Number,
    dernierControleDate: Date,
    status: { type: String, enum: ['Disponible', 'Hors Service','En trajet', 'En maintenance'], default: 'Disponible' },
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Remorque', remorqueSchema);
