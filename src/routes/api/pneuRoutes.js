const express = require('express');
const router = express.Router();
const {listerPneus,ajouterPneu,obtenirPneu,modifierPneu,supprimerPneu} = require('../../controllers/pneuController');

// Liste des pneus
router.get('/', listerPneus);

// Ajouter un pneu
router.post('/', ajouterPneu);

// Obtenir un pneu par ID
router.get('/:id', obtenirPneu);

// Modifier un pneu
router.put('/:id', modifierPneu);

// Supprimer un pneu
router.delete('/:id', supprimerPneu);

module.exports = router;
