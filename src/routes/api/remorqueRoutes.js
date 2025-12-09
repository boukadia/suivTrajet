const express = require('express');
const router = express.Router();
const {listerRemorques,ajouterRemorque,obtenirRemorque,modifierRemorque,supprimerRemorque} = require('../../controllers/remorqueController');

// Liste des remorques
router.get('/', listerRemorques);

// Ajouter une remorque
router.post('/', ajouterRemorque);

// Obtenir une remorque par ID
router.get('/:id', obtenirRemorque);

// Modifier une remorque
router.put('/:id', modifierRemorque);

// Supprimer une remorque
router.delete('/:id', supprimerRemorque);

module.exports = router;
