const Camion = require('../models/Camion');

// Lister tous les camions
exports.listerCamions = async (req, res) => {
    try {
        const camions = await Camion.find().populate('pneus');
        res.json(camions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un camion
exports.ajouterCamion = async (req, res) => {
    try {
        const camion = new Camion(req.body);
        await camion.save();
        res.status(201).json(camion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un camion par ID
exports.obtenirCamion = async (req, res) => {
    try {
        const camion = await Camion.findById(req.params.id).populate('pneus');
        if (!camion) return res.status(404).json({ message: 'Camion non trouvé' });
        res.json(camion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un camion
exports.modifierCamion = async (req, res) => {
    try {
        const camion = await Camion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(camion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un camion
exports.supprimerCamion = async (req, res) => {
    try {
        await Camion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Camion supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
