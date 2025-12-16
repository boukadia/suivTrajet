const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour ajouter un pneu
exports.validateAjouterPneu = [
    body('marque')
        .optional()
        .isString()
        .withMessage('La marque doit être du texte'),

    body('modele')
        .optional()
        .isString()
        .withMessage('Le modèle doit être du texte'),

    body('status')
        .optional()
        .isIn(['Neuf', 'Usé', 'A remplacer'])
        .withMessage('L\'état doit être: Neuf, Usé ou A remplacer'),

    body('camion')
        .optional()
        .isMongoId()
        .withMessage('ID du camion invalide'),

    checkValidationErrors
];

// Validation pour modifier un pneu
exports.validateModifierPneu = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    body('marque')
        .optional()
        .isString()
        .withMessage('La marque doit être du texte'),

    body('modele')
        .optional()
        .isString()
        .withMessage('Le modèle doit être du texte'),

    body('status')
        .optional()
        .isIn(['Neuf', 'Usé', 'A remplacer'])
        .withMessage('L\'état doit être: Neuf, Usé ou A remplacer'),

    body('camion')
        .optional()
        .isMongoId()
        .withMessage('ID du camion invalide'),

    checkValidationErrors
];

// Validation pour l'ID
exports.validateId = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    checkValidationErrors
];
