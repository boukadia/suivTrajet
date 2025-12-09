const express = require('express');
const router = express.Router();
const {listerRemorques,ajouterRemorque,obtenirRemorque,modifierRemorque,supprimerRemorque} = require('../../controllers/remorqueController');
const {authenticate, authorize} = require('../../middlewares/auth');
const {validateAjouterRemorque, validateModifierRemorque, validateId} = require('../../validator/remorqueValidator');

// Liste des remorques
router.get('/', authenticate, listerRemorques);

// Ajouter une remorque
router.post('/', authenticate, authorize('Admin'), validateAjouterRemorque, ajouterRemorque);

// Obtenir une remorque par ID
router.get('/:id', authenticate, validateId, obtenirRemorque);

// Modifier une remorque
router.put('/:id', authenticate, authorize('Admin'), validateModifierRemorque, modifierRemorque);

// Supprimer une remorque
router.delete('/:id', authenticate, authorize('Admin'), validateId, supprimerRemorque);

module.exports = router;
