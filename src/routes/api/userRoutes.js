const express = require('express');
const router = express.Router();
const {listerUsers,creerUser,obtenirUser,modifierUser,supprimerUser,loginUser} = require('../../controllers/userController');

// Liste de tous les users (Admin)
router.get('/', listerUsers);

// Créer un user
router.post('/', creerUser);

// Obtenir un user par ID
router.get('/:id', obtenirUser);

// Modifier un user
router.put('/:id', modifierUser);

// Supprimer un user
router.delete('/:id', supprimerUser);

// Login
router.post('/login', loginUser);

module.exports = router;
