const adminMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User (adminMiddleware):", req.user);
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: You are not an admin" });
    }
  
    // If the user is authenticated and is an admin, proceed to the next middleware
    next();
  };
  
  module.exports = adminMiddleware;