const express = require('express');
const router = express.Router();
const {listerTrajets,ajouterTrajet,obtenirTrajet,modifierTrajet,supprimerTrajet} = require('../../controllers/trajetController');

// Liste des trajets
router.get('/', listerTrajets);

// Ajouter un trajet
router.post('/', ajouterTrajet);

// Obtenir un trajet par ID
router.get('/:id', obtenirTrajet);

// Modifier un trajet
router.put('/:id', modifierTrajet);

// Supprimer un trajet
router.delete('/:id', supprimerTrajet);

module.exports = router;
