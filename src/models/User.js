const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    role: { type: String, enum: ['Admin', 'Chauffeur'], default: 'Chauffeur' },
}, { timestamps: { createdAt: 'dateCreation', updatedAt: 'dateMiseAJour' } });

userSchema.pre('save', async function() {
  if (this.isModified('motDePasse')) {
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  }
});

userSchema.methods.comparerMotDePasse = async function(motDePasse) {
  return bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
