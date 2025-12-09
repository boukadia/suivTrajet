const Trajet = require('../models/Trajet');

// Lister tous les trajets
exports.listerTrajets = async (req, res) => {
    try {
        const trajets = await Trajet.find()
            .populate('chauffeur')
            .populate('camion')
            .populate('remorque');
        res.json(trajets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un trajet
exports.ajouterTrajet = async (req, res) => {
    try {
        const trajet = new Trajet(req.body);
        await trajet.save();
        res.status(201).json(trajet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un trajet par ID
exports.obtenirTrajet = async (req, res) => {
    try {
        const trajet = await Trajet.findById(req.params.id)
            .populate('chauffeur')
            .populate('camion')
            .populate('remorque');
        if (!trajet) return res.status(404).json({ message: 'Trajet non trouvé' });
        res.json(trajet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un trajet
exports.modifierTrajet = async (req, res) => {
    try {
        const trajet = await Trajet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(trajet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un trajet
exports.supprimerTrajet = async (req, res) => {
    try {
        await Trajet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Trajet supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
