const mongoose = require('mongoose');

const pneuSchema = new mongoose.Schema({
    marque: { type: String },
    modele: { type: String },
    kilometrageInstallation: Number, // kilometrage du camion lors du l'installation du pneu
  dateInstallation: Date,   
    etat: { type: String, enum: ['Neuf', 'Usé', 'A remplacer'], default: 'Neuf' },
    camion: { type: mongoose.Schema.Types.ObjectId, ref: 'Camion' },
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

module.exports = mongoose.model('Pneu', pneuSchema);
