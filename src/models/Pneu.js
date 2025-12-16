const mongoose = require('mongoose');

const pneuSchema = new mongoose.Schema({
    marque: { type: String },
    modele: { type: String },
    kilometrageInstallation: Number, // kilometrage du camion lors de l'installation du pneu
    dateInstallation: Date,
    status: { type: String, enum: ['Neuf', 'Use', 'A remplacer'], default: 'Neuf' },
    
    camion: { type: mongoose.Schema.Types.ObjectId, ref: 'Camion', default: null },
    remorque: { type: mongoose.Schema.Types.ObjectId, ref: 'Remorque', default: null },
    
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

// Validation: un pneu ne peut appartenir qu'à un seul véhicule
pneuSchema.pre('save', function(next) {
    if (this.camion && this.remorque) {
        return next(new Error('Un pneu ne peut appartenir qu\'à un camion ET une remorque en même temps'));
    }
    next();
});

module.exports = mongoose.model('Pneu', pneuSchema);
