const express = require('express');
const router = express.Router();
const {listerPneus,ajouterPneu,obtenirPneu,modifierPneu,supprimerPneu} = require('../../controllers/pneuController');
const {authenticate, authorize} = require('../../middlewares/auth');
const {validateAjouterPneu, validateModifierPneu, validateId} = require('../../validator/pneuValidator');

// Liste des pneus
router.get('/', authenticate, listerPneus);

// Ajouter un pneu
router.post('/', authenticate, authorize('Admin'), validateAjouterPneu, ajouterPneu);

// Obtenir un pneu par ID
router.get('/:id', authenticate, validateId, obtenirPneu);

// Modifier un pneu
router.put('/:id', authenticate, authorize('Admin'), validateModifierPneu, modifierPneu);

// Supprimer un pneu
router.delete('/:id', authenticate, authorize('Admin'), validateId, supprimerPneu);

module.exports = router;
