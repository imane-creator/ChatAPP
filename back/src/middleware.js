// middleware.js
/*const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    // Décoder le token JWT pour vérifier l'authenticité et récupérer les informations
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extraire l'ID de l'utilisateur du token décodé
    req.userId = decodedToken.userId;

    //next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;
*/