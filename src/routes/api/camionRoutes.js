const express = require('express');
const router = express.Router();
const {listerCamions,ajouterCamion,obtenirCamion,modifierCamion,supprimerCamion} = require('../../controllers/camionController');

// Liste des camions
router.get('/', listerCamions);

// Ajouter un camion
router.post('/', ajouterCamion);

// Obtenir un camion par ID
router.get('/:id', obtenirCamion);

// Modifier un camion
router.put('/:id', modifierCamion);

// Supprimer un camion
router.delete('/:id', supprimerCamion);

module.exports = router;
