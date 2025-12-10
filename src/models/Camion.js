const mongoose = require('mongoose');

const camionSchema = new mongoose.Schema({
    numeroImmatriculation: { type: String, required: true, unique: true },
    marque: { type: String },
    modele: { type: String },
    kilometrage: { type: Number, default: 0 },
     dernierVidangeKm: Number,
  dernierVidangeDate: Date,
  dernierChangementPneusKm: Number,
  dernierChangementPneusDate: Date,
  dernierControleKm: Number,
  dernierControleDate: Date,
    status: { type: String, enum: ['Disponible', 'Hors Service','En trajet', 'En maintenance'], default: 'Disponible' },
    consommationCarburant: { type: Number, default: 0 },
    pneus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pneu' }],
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Camion', camionSchema);
