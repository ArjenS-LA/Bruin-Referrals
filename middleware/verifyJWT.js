const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT tokens and extract user information.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.warn("No token provided in the Authorization header.");
    return res.status(401).json({ message: "No token provided" }); // Unauthorized
  }

  const token = authHeader.split(" ")[1];
  console.log(`Verifying token: ${token}`);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.warn("JWT token has expired.");
        return res.status(403).json({ message: "Token expired" }); // Forbidden
      } else {
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token" }); // Forbidden
      }
    }

    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    console.log(`Token verified. User: ${req.user}, Roles: ${req.roles}`);
    next();
  });
};

module.exports = verifyJWT;
