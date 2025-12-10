const Remorque = require('../models/Remorque');

// Lister toutes les remorques
exports.listerRemorques = async (req, res) => {
    try {
        const remorques = await Remorque.find();
        res.json(remorques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une remorque
exports.ajouterRemorque = async (req, res) => {
    try {
        const remorque = new Remorque(req.body);
        await remorque.save();
        res.status(201).json(remorque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir une remorque par ID
exports.obtenirRemorque = async (req, res) => {
    try {
        const remorque = await Remorque.findById(req.params.id);
        if (!remorque) return res.status(404).json({ message: 'Remorque non trouvée' });
        res.json(remorque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier une remorque
exports.modifierRemorque = async (req, res) => {
    try {
        const remorque = await Remorque.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(remorque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une remorque
exports.supprimerRemorque = async (req, res) => {
    try {
        await Remorque.findByIdAndDelete(req.params.id);
        res.json({ message: 'Remorque supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Changer le status d'une remorque
exports.changerStatusRemorque = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({ message: 'Status requis' });
        }
        
        const remorque = await Remorque.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!remorque) {
            return res.status(404).json({ message: 'Remorque non trouvée' });
        }
        
        res.json({ 
            message: `Status changé en ${status}`,
            remorque 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
