const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour ajouter un camion
exports.validateAjouterCamion = [
    body('numeroImmatriculation')
        .notEmpty()
        .withMessage('Le numéro d\'immatriculation est obligatoire')
        .isString()
        .withMessage('Le numéro d\'immatriculation doit être du texte'),

    body('marque')
        .optional()
        .isString()
        .withMessage('La marque doit être du texte'),

    body('modele')
        .optional()
        .isString()
        .withMessage('Le modèle doit être du texte'),

    body('kilometrage')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage doit être un nombre'),

    body('consommationCarburant')
        .optional()
        .isNumeric()
        .withMessage('La consommation de carburant doit être un nombre'),
    body('status')
        .optional()
        .isIn(['Disponible', 'Hors Service','En trajet', 'En maintenance'])
        .withMessage('Le statut doit être: Disponible, Hors Service, En trajet ou En maintenance'),

    checkValidationErrors
];

// Validation pour modifier un camion
exports.validateModifierCamion = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    body('numeroImmatriculation')
        .optional()
        .isString()
        .withMessage('Le numéro d\'immatriculation doit être du texte'),

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
        .isIn(['Disponible', 'Hors Service','En trajet', 'En maintenance'])
        .withMessage('Le statut doit être: Disponible, Hors Service, En trajet ou En maintenance'),

    body('kilometrage')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage doit être un nombre'),

    body('consommationCarburant')
        .optional()
        .isNumeric()
        .withMessage('La consommation de carburant doit être un nombre'),

    checkValidationErrors
];

// Validation pour l'ID
exports.validateId = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    checkValidationErrors
];
