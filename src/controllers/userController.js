const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Lister tous les users
exports.listerUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un user
exports.creerUser = async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;
        const user = new User({ nom, email, motDePasse, role });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un user par ID
exports.obtenirUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User non trouvé' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un user
exports.modifierUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un user
exports.supprimerUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

        const valide = await user.comparerMotDePasse(motDePasse);
        if (!valide) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
