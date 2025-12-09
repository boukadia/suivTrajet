const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tokenBlacklist = new Set();

exports.tokenBlacklist = tokenBlacklist;
const generateToken = (user) => {
  return jwt.sign({
    userId: user._id,
    email: user.email,
    role: user.role,
    nom: user.nom
  }, process.env.JWT_SECRET, { expiresIn: '6000s' });
};

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
        const token = generateToken(user);
        console.log(user);

        res.status(201).json({ token, user });
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
        const token = generateToken(user);  
        res.json({ token, user:{    
            _id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
            status: user.status
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logOut=async(req,res)=>{
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }
    
    tokenBlacklist.add(token);
    
    res.status(200).json({ 
      message: "User logged out successfully",
      success: true 
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user: " + error.message });
  }
}

exports.toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    
    // Mettre à jour le statut
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    ).select('-password');
    
    const message = newStatus === 'active' ? 'User activated successfully' : 'User deactivated successfully';
    
    res.json({ message, user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};