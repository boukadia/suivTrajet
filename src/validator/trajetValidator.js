const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour ajouter un trajet
exports.validateAjouterTrajet = [
    body('chauffeur')
        .notEmpty()
        .withMessage('Le chauffeur est obligatoire')
        .isMongoId()
        .withMessage('ID du chauffeur invalide'),

    body('camion')
        .notEmpty()
        .withMessage('Le camion est obligatoire')
        .isMongoId()
        .withMessage('ID du camion invalide'),

    body('remorque')
        .optional()
        .isMongoId()
        .withMessage('ID de la remorque invalide'),

    body('pointDepart')
        .notEmpty()
        .withMessage('Le point de départ est obligatoire')
        .isString()
        .withMessage('Le point de départ doit être du texte'),

    body('pointArrivee')
        .notEmpty()
        .withMessage('Le point d\'arrivée est obligatoire')
        .isString()
        .withMessage('Le point d\'arrivée doit être du texte'),

    body('status')
        .optional()
        .isIn(['A faire', 'En cours', 'Terminé'])
        .withMessage('L\'état doit être: A faire, En cours ou Terminé'),

    body('kilometrageDepart')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage de départ doit être un nombre'),

    body('kilometrageArrivee')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage d\'arrivée doit être un nombre'),

    body('volumeCarburant')
        .optional()
        .isNumeric()
        .withMessage('Le volume de carburant doit être un nombre'),

    body('remarques')
        .optional()
        .isString()
        .withMessage('Les remarques doivent être du texte'),

    checkValidationErrors
];

// Validation pour modifier un trajet
exports.validateModifierTrajet = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    body('chauffeur')
        .optional()
        .isMongoId()
        .withMessage('ID du chauffeur invalide'),

    body('camion')
        .optional()
        .isMongoId()
        .withMessage('ID du camion invalide'),

    body('remorque')
        .optional()
        .isMongoId()
        .withMessage('ID de la remorque invalide'),

    body('pointDepart')
        .optional()
        .isString()
        .withMessage('Le point de départ doit être du texte'),

    body('pointArrivee')
        .optional()
        .isString()
        .withMessage('Le point d\'arrivée doit être du texte'),

    body('status')
        .optional()
        .isIn(['A faire', 'En cours', 'Terminé'])
        .withMessage('L\'état doit être: A faire, En cours ou Terminé'),

    body('kilometrageDepart')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage de départ doit être un nombre'),

    body('kilometrageArrivee')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage d\'arrivée doit être un nombre'),

    body('volumeCarburant')
        .optional()
        .isNumeric()
        .withMessage('Le volume de carburant doit être un nombre'),

    body('remarques')
        .optional()
        .isString()
        .withMessage('Les remarques doivent être du texte'),

    checkValidationErrors
];

// Validation pour l'ID
exports.validateId = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    checkValidationErrors
];
