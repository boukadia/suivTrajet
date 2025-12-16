const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour ajouter une maintenance
exports.validateAjouterMaintenance = [
    body('typeMaintenance')
        .notEmpty()
        .isIn(['Pneu', 'Vidange'])

        .withMessage('Le type de maintenance est obligatoire'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être du texte'),

    body('dateMaintenance')
        .optional()
        .isISO8601()
        .withMessage('La date doit être au format valide'),

    body('kilometrage')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage doit être un nombre'),

    body('cout')
        .optional()
        .isNumeric()
        .withMessage('Le coût doit être un nombre'),

    body('statut')
        .optional()
        .isIn(['Prévu', 'Effectuée', 'Annulée'])
        .withMessage('Le statut doit être: Prévu, Effectuée ou Annulée'),

    body('camion')
        .optional()
        .isMongoId()
        .withMessage('ID du camion invalide'),

    body('remorque')
        .optional()
        .isMongoId()
        .withMessage('ID de la remorque invalide'),

    body('pneu')
        .optional()
        .isMongoId()
        .withMessage('ID du pneu invalide'),

    // Au moins un véhicule doit être spécifié
    body()
        .custom((value, { req }) => {
            if (!req.body.camion && !req.body.remorque && !req.body.pneu) {
                throw new Error('Au moins un véhicule (camion, remorque ou pneu) doit être spécifié');
            }
            return true;
        }),

    checkValidationErrors
];

// Validation pour modifier une maintenance
exports.validateModifierMaintenance = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    body('typeMaintenance')
        .optional()
        .isString()
        .withMessage('Le type de maintenance doit être du texte'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être du texte'),

    body('dateMaintenance')
        .optional()
        .isISO8601()
        .withMessage('La date doit être au format valide'),

    body('kilometrage')
        .optional()
        .isNumeric()
        .withMessage('Le kilométrage doit être un nombre'),

    body('cout')
        .optional()
        .isNumeric()
        .withMessage('Le coût doit être un nombre'),

    body('statut')
        .optional()
        .isIn(['Prévu', 'Effectuée', 'Annulée'])
        .withMessage('Le statut doit être: Prévu, Effectuée ou Annulée'),

    body('camion')
        .optional()
        .isMongoId()
        .withMessage('ID du camion invalide'),

    body('remorque')
        .optional()
        .isMongoId()
        .withMessage('ID de la remorque invalide'),

    body('pneu')
        .optional()
        .isMongoId()
        .withMessage('ID du pneu invalide'),

    checkValidationErrors
];

// Validation pour l'ID
exports.validateId = [
    param('id')
        .isMongoId()
        .withMessage('ID invalide'),

    checkValidationErrors
];

// Validation pour l'ID du camion
exports.validateCamionId = [
    param('camionId')
        .isMongoId()
        .withMessage('ID du camion invalide'),

    checkValidationErrors
];

// Validation pour l'ID de la remorque
exports.validateRemorqueId = [
    param('remorqueId')
        .isMongoId()
        .withMessage('ID de la remorque invalide'),

    checkValidationErrors
];

// Validation pour l'ID du pneu
exports.validatePneuId = [
    param('pneuId')
        .isMongoId()
        .withMessage('ID du pneu invalide'),

    checkValidationErrors
];
