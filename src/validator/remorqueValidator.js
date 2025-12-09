const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour ajouter une remorque
exports.validateAjouterRemorque = [
    body('numeroImmatriculation')
        .notEmpty()
        .withMessage('Le numéro d\'immatriculation est obligatoire')
        .isString()
        .withMessage('Le numéro d\'immatriculation doit être du texte'),

    body('type')
        .optional()
        .isString()
        .withMessage('Le type doit être du texte'),

    body('capacite')
        .optional()
        .isNumeric()
        .withMessage('La capacité doit être un nombre'),

    body('etat')
        .optional()
        .isIn(['Disponible', 'En maintenance'])
        .withMessage('L\'état doit être: Disponible ou En maintenance'),

    checkValidationErrors
];

// Validation pour modifier une remorque
exports.validateModifierRemorque = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    body('numeroImmatriculation')
        .optional()
        .isString()
        .withMessage('Le numéro d\'immatriculation doit être du texte'),

    body('type')
        .optional()
        .isString()
        .withMessage('Le type doit être du texte'),

    body('capacite')
        .optional()
        .isNumeric()
        .withMessage('La capacité doit être un nombre'),

    body('etat')
        .optional()
        .isIn(['Disponible', 'En maintenance'])
        .withMessage('L\'état doit être: Disponible ou En maintenance'),

    checkValidationErrors
];

// Validation pour l'ID
exports.validateId = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    checkValidationErrors
];
