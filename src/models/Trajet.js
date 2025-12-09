const mongoose = require('mongoose');

const trajetSchema = new mongoose.Schema({
    chauffeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    camion: { type: mongoose.Schema.Types.ObjectId, ref: 'Camion', required: true },
    remorque: { type: mongoose.Schema.Types.ObjectId, ref: 'Remorque' },
    pointDepart: { type: String, required: true },
    pointArrivee: { type: String, required: true },
     dateDepart: { type: Date, required: true },
  dateArrivee: { type: Date },
    etat: { type: String, enum: ['A faire', 'En cours', 'Terminer'], default: 'A faire' },
    kilometrageDepart: { type: Number },
    kilometrageArrivee: { type: Number },
    volumeCarburant: { type: Number },
    remarques: { type: String },
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Trajet', trajetSchema);
