const express = require('express');
const router = express.Router();
const {listerTrajets,ajouterTrajet,obtenirTrajet,modifierTrajet,supprimerTrajet,changerStatusTrajet,terminerTrajet} = require('../../controllers/trajetController');
const {authenticate, authorize} = require('../../middlewares/auth');
const {validateAjouterTrajet, validateModifierTrajet, validateId} = require('../../validator/trajetValidator');

// Liste des trajets
router.get('/', authenticate, listerTrajets);

// Ajouter un trajet
router.post('/', authenticate, validateAjouterTrajet, ajouterTrajet);

// Obtenir un trajet par ID
router.get('/:id', authenticate, validateId, obtenirTrajet);

// Modifier un trajet
router.put('/:id', authenticate, validateModifierTrajet, modifierTrajet);

// Supprimer un trajet
router.delete('/:id', authenticate, authorize('Admin'), validateId, supprimerTrajet);

// Changer l'état d'un trajet
router.put('/status/:id', authenticate, changerStatusTrajet);

// Terminer un trajet
router.put('/:id/terminer', authenticate, terminerTrajet);

module.exports = router;
