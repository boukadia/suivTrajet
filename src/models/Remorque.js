const mongoose = require('mongoose');

const remorqueSchema = new mongoose.Schema({
    numeroImmatriculation: { type: String, required: true, unique: true },
    type: { type: String },
    capacite: { type: Number },
    pneus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pneu' }],
    status: { type: String, enum: ['Disponible', 'Hors Service','En trajet', 'En maintenance'], default: 'Disponible' },
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Remorque', remorqueSchema);
