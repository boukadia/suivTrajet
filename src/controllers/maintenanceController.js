const Maintenance = require('../models/Maintenance');

// Lister toutes les maintenances
exports.listerMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.find()
            .populate('camion')
            .populate('remorque')
            .populate('pneu')
            .populate('user', '-motDePasse')
            .sort({ dateMaintenance: -1 });
        res.json(maintenances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une maintenance
exports.ajouterMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenance({
            ...req.body,
            user: req.user.userId // L'utilisateur connecté
        });
        await maintenance.save();
        const maintenancePopulated = await Maintenance.findById(maintenance._id)
            .populate('camion')
            .populate('remorque')
            .populate('pneu')
            .populate('user', '-motDePasse');
        res.status(201).json(maintenancePopulated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir une maintenance par ID
exports.obtenirMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id)
            .populate('camion')
            .populate('remorque')
            .populate('pneu')
            .populate('user', '-motDePasse');
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance non trouvée' });
        }
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier une maintenance
exports.modifierMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('camion')
            .populate('remorque')
            .populate('pneu')
            .populate('user', '-motDePasse');
        
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance non trouvée' });
        }
        res.json(maintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.modifierStatusMaintenance=async(req,res)=>{
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance non trouvée' });
        } 
        if(req.body.status==='Effectuée'){
            // Mettre à jour le kilométrage du véhicule concerné
            if(maintenance.camion){
                const Camion = require('../models/Camion');
               const camion= await Camion.findByIdAndUpdate(maintenance.camion, { kilometrage: maintenance.kilometrage });
               camion.status='Disponible';
               await camion.save();
            }
            if(maintenance.remorque){
                const Remorque = require('../models/Remorque');
              const remorque=  await Remorque.findByIdAndUpdate(maintenance.remorque, { kilometrage: maintenance.kilometrage });
                remorque.status='Disponible';
                await remorque.save();
            }
            if(maintenance.pneu){
                const Pneu = require('../models/Pneu');
                const pneu=await Pneu.findByIdAndUpdate(maintenance.pneu, { kilometrage: maintenance.kilometrage });
                pneu.status='Disponible';
                await pneu.save();

            }
        }
        res.json(maintenance);  
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une maintenance
exports.supprimerMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance non trouvée' });
        }
        res.json({ message: 'Maintenance supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les maintenances par camion
exports.obtenirMaintenancesParCamion = async (req, res) => {
    try {
        const maintenances = await Maintenance.find({ camion: req.params.camionId })
            .populate('user', '-motDePasse')
            .sort({ dateMaintenance: -1 });
        res.json(maintenances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les maintenances par remorque
exports.obtenirMaintenancesParRemorque = async (req, res) => {
    try {
        const maintenances = await Maintenance.find({ remorque: req.params.remorqueId })
            .populate('user', '-motDePasse')
            .sort({ dateMaintenance: -1 });
        res.json(maintenances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les maintenances par pneu
exports.obtenirMaintenancesParPneu = async (req, res) => {
    try {
        const maintenances = await Maintenance.find({ pneu: req.params.pneuId })
            .populate('user', '-motDePasse')
            .sort({ dateMaintenance: -1 });
        res.json(maintenances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changerStatusMaintenance=async(req,res)=>{
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );  
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance non trouvée' });
        }
        res.json(maintenance);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};
