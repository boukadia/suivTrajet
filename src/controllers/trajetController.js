const Trajet = require('../models/Trajet');
const Camion = require('../models/Camion');
const Remorque = require('../models/Remorque');
const User = require('../models/User');

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

// Ajouter un trajet avec vérifications
exports.ajouterTrajet = async (req, res) => {
    try {
        const { chauffeur, camion: camionId, remorque: remorqueId } = req.body;

        // 1. Vérifier que le camion existe et est disponible
        const camion = await Camion.findById(camionId);
        if (!camion) {
            return res.status(404).json({ message: 'Camion non trouvé' });
        }
        
        if (['En maintenance', 'En trajet', 'Hors Service'].includes(camion.status)) {
            return res.status(400).json({ 
                message: `Camion non disponible (status: ${camion.status})` 
            });
        }

        // 2. Vérifier la remorque si spécifiée
        if (remorqueId) {
            const remorque = await Remorque.findById(remorqueId);
            if (!remorque) {
                return res.status(404).json({ message: 'Remorque non trouvée' });
            }
            if (remorque.status === 'En maintenance') {
                return res.status(400).json({ 
                    message: 'Remorque non disponible (en maintenance)' 
                });
            }
        }

        // 3. Vérifier que le chauffeur existe et n'a pas de trajet en cours
        const chauffeurUser = await User.findById(chauffeur);
        if (!chauffeurUser) {
            return res.status(404).json({ message: 'Chauffeur non trouvé' });
        }

        const trajetActif = await Trajet.findOne({ 
            chauffeur, 
            status: 'En cours' 
        });
        
        if (trajetActif) {
            return res.status(400).json({ 
                message: 'Le chauffeur a déjà un trajet en cours' 
            });
        }

        // 4. Créer le trajet avec le kilométrage de départ
        const trajet = new Trajet({
            ...req.body,
            kilometrageDepart: camion.kilometrage
        });
        
        await trajet.save();

        // 5. Mettre à jour les status
        await Camion.findByIdAndUpdate(camionId, { status: 'En trajet' });
        
        if (remorqueId) {
            await Remorque.findByIdAndUpdate(remorqueId, { status: 'En trajet' });
        }

        // Retourner le trajet avec les données peuplées
        const trajetPopulated = await Trajet.findById(trajet._id)
            .populate('chauffeur', 'nom email')
            .populate('camion')
            .populate('remorque');

        res.status(201).json(trajetPopulated);
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

// Changer l'état d'un trajet
exports.changerStatusTrajet = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({ message: 'État requis' });
        }
        
        const trajet = await Trajet.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )
        .populate('chauffeur')
        .populate('camion')
        .populate('remorque');
        
        if (!trajet) {
            return res.status(404).json({ message: 'Trajet non trouvé' });
        }
        
        res.json({ 
            message: `État changé en ${status}`,
            trajet 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Terminer un trajet
exports.terminerTrajet = async (req, res) => {
    try {
        const { kilometrageArrivee, remarques } = req.body;
        
        const trajet = await Trajet.findById(req.params.id);
        
        if (!trajet) {
            return res.status(404).json({ message: 'Trajet non trouvé' });
        }
        
        if (trajet.status === 'Terminer') {
            return res.status(400).json({ message: 'Trajet déjà terminé' });
        }
        
        // Vérifier que le kilométrage d'arrivée est logique
        if (kilometrageArrivee && trajet.kilometrageDepart && kilometrageArrivee < trajet.kilometrageDepart) {
            return res.status(400).json({ 
                message: 'Le kilométrage d\'arrivée doit être supérieur au kilométrage de départ' 
            });
        }

        // Mettre à jour le trajet
        trajet.status = 'Terminer';
        trajet.dateArrivee = new Date();
        trajet.kilometrageArrivee = kilometrageArrivee;
        if (remarques) trajet.remarques = remarques;
        await trajet.save();

        // Mettre à jour le kilométrage du camion
        if (trajet.camion && kilometrageArrivee) {
            const camion = await Camion.findById(trajet.camion);
            if (camion) {
                camion.kilometrage = Math.max(camion.kilometrage, kilometrageArrivee);
                camion.status = 'Disponible';
                await camion.save();
            }
        }

        // Remettre la remorque disponible
        if (trajet.remorque) {
            await Remorque.findByIdAndUpdate(trajet.remorque, { status: 'Disponible' });
        }

        const trajetPopulated = await Trajet.findById(trajet._id)
            .populate('chauffeur', 'nom email')
            .populate('camion')
            .populate('remorque');

        res.json({ 
            message: 'Trajet terminé avec succès',
            trajet: trajetPopulated 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
