const mongoose = require('mongoose');

const camionSchema = new mongoose.Schema({
    numeroImmatriculation: { type: String, required: true, unique: true },
    marque: { type: String },
    modele: { type: String },
    kilometrage: { type: Number, default: 0 },
    consommationCarburant: { type: Number, default: 0 },
    pneus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pneu' }],
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Camion', camionSchema);
