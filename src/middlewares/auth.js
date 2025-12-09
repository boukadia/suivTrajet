const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { tokenBlacklist } = require('../controllers/userController');

// exports.authenticate = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ error: 'Access denied' });
//     }
    
//     if (tokenBlacklist.has(token)) {
//       return res.status(401).json({ error: 'logout - please login again' });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId).select('-password');// 
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };


exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token reçu :", token);

    if (!token) {
      console.log("Aucun token fourni");
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    if (tokenBlacklist.has(token)) {
      console.log("Token dans la liste noire");
      return res.status(401).json({ error: "Token invalidated. Please log in again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé :", decoded);
    
    // Récupérer l'utilisateur depuis la DB
    const user = await User.findById(decoded.userId).select("-motDePasse");
    
    if (!user) {
      console.log("Utilisateur non trouvé");
      return res.status(404).json({ error: "User not found." });
    }
    
    // Assigner les infos du user à req.user avec les champs du modèle
    req.user = {
      userId: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      status: user.status,
      dateCreation: user.dateCreation,
      dateMiseAJour: user.dateMiseAJour
    };
    
    console.log("Utilisateur authentifié:", req.user.email, "Role :", req.user.role);
    next();
  } catch (error) {
    console.error("Erreur dans authenticate :", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};



exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};