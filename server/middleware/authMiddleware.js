// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Log user object
    console.log("User (authMiddleware):", user);

    req.user = user;
    
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
  next();// change next from line25 to line30
};

module.exports = authMiddleware;