const express = require('express');
const router = express.Router();
const {listerUsers,register,obtenirUser,modifierUser,supprimerUser,loginUser, logOut, toggleUserStatus} = require('../../controllers/userController');
const {authenticate,authorize} = require('../../middlewares/auth');
const {validateRegister,validateLogin}=require('../../validator/userValidator');


// Liste de tous les users (Admin)
router.get('/',authenticate,authorize("Admin"), listerUsers);

// Créer un user
router.post('/', register);

// Obtenir un user par ID
router.get('/:id',authenticate,authorize("Admin") ,obtenirUser);

// Modifier un user
router.put('/:id', modifierUser);

// Supprimer un user
router.delete('/:id',authenticate,authorize("Admin") , supprimerUser);

// Login
router.post('/login',validateLogin, loginUser);

//logout
router.post('/logout', authenticate,logOut )

//Status
router.get('/status/:id', authenticate, authorize("Admin"),toggleUserStatus )

module.exports = router;
