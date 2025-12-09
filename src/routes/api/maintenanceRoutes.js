const express = require('express');
const router = express.Router();
const {
    listerMaintenances,
    ajouterMaintenance,
    obtenirMaintenance,
    modifierMaintenance,
    supprimerMaintenance,
    obtenirMaintenancesParCamion,
    obtenirMaintenancesParRemorque,
    obtenirMaintenancesParPneu
} = require('../../controllers/maintenanceController');
const {authenticate, authorize} = require('../../middlewares/auth');
const {
    validateAjouterMaintenance,
    validateModifierMaintenance,
    validateId,
    validateCamionId,
    validateRemorqueId,
    validatePneuId
} = require('../../validator/maintenanceValidator');

// Liste des maintenances
router.get('/', authenticate, listerMaintenances);

// Ajouter une maintenance
router.post('/', authenticate, validateAjouterMaintenance, ajouterMaintenance);

// Obtenir une maintenance par ID
router.get('/:id', authenticate, validateId, obtenirMaintenance);

// Modifier une maintenance
router.put('/:id', authenticate, authorize('Admin'), validateModifierMaintenance, modifierMaintenance);

// Supprimer une maintenance
router.delete('/:id', authenticate, authorize('Admin'), validateId, supprimerMaintenance);

// Obtenir les maintenances par camion
router.get('/camion/:camionId', authenticate, validateCamionId, obtenirMaintenancesParCamion);

// Obtenir les maintenances par remorque
router.get('/remorque/:remorqueId', authenticate, validateRemorqueId, obtenirMaintenancesParRemorque);

// Obtenir les maintenances par pneu
router.get('/pneu/:pneuId', authenticate, validatePneuId, obtenirMaintenancesParPneu);

module.exports = router;
