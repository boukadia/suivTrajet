
const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  typeMaintenance: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
  },
  dateMaintenance: {
    type: Date,
    default: Date.now,
  },
  kilometrage: {
    type: Number,
  },
  cout: {
    type: Number,
  },
  statut: {
    type: String,
    enum: ['Prévu', 'Effectuée', 'Annulée'],
    default: 'Prévu',
  },
  camion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Camion',
    required: false,
  },
  remorque: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Remorque',
    required: false,
  },
  pneu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pneu',
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
