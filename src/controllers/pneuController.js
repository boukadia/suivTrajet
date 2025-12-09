const Pneu = require('../models/Pneu');

// Lister tous les pneus
exports.listerPneus = async (req, res) => {
    try {
        const pneus = await Pneu.find().populate('camion');
        res.json(pneus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un pneu
exports.ajouterPneu = async (req, res) => {
    try {
        const pneu = new Pneu(req.body);
        await pneu.save();
        res.status(201).json(pneu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un pneu par ID
exports.obtenirPneu = async (req, res) => {
    try {
        const pneu = await Pneu.findById(req.params.id).populate('camion');
        if (!pneu) return res.status(404).json({ message: 'Pneu non trouvé' });
        res.json(pneu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un pneu
exports.modifierPneu = async (req, res) => {
    try {
        const pneu = await Pneu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pneu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un pneu
exports.supprimerPneu = async (req, res) => {
    try {
        await Pneu.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pneu supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
