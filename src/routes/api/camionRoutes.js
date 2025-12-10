const express = require('express');
const router = express.Router();
const {listerCamions,ajouterCamion,obtenirCamion,modifierCamion,supprimerCamion,changerStatusCamion} = require('../../controllers/camionController');
const {authenticate, authorize} = require('../../middlewares/auth');
const {validateAjouterCamion, validateModifierCamion, validateId} = require('../../validator/camionValidator');

// Liste des camions
router.get('/', authenticate, listerCamions);

// Ajouter un camion
router.post('/', authenticate, authorize('Admin'), validateAjouterCamion, ajouterCamion);

// Obtenir un camion par ID
router.get('/:id', authenticate, validateId, obtenirCamion);

// Modifier un camion
router.put('/:id', authenticate, authorize('Admin'), validateModifierCamion, modifierCamion);

// Supprimer un camion
router.delete('/:id', authenticate, authorize('Admin'), validateId, supprimerCamion);

// Changer le status d'un camion
router.put('/:id/status', authenticate, authorize('Admin'), changerStatusCamion);

module.exports = router;
