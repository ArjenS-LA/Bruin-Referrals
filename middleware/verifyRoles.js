/**
 * 
 *
 * @param  {...string} allowedRoles -
 * @returns {Function} 
 */
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      console.warn("Access denied: No roles found in the request.");
      return res.sendStatus(403); // Forbidden
    }

    const rolesArray = [...allowedRoles];
    console.log("Allowed Roles:", rolesArray);
    console.log("User Roles:", req.roles);

    // implementing role hierarchy: higher roles can access lower role resources
    const roleHierarchy = {
      Admin: 3,
      Editor: 2,
      User: 1,
    };

    const userMaxRole = Math.max(...req.roles.map(role => roleHierarchy[role] || 0));
    const allowedMaxRole = Math.max(...allowedRoles.map(role => roleHierarchy[role] || 0));

    if (userMaxRole < allowedMaxRole) {
      console.warn(`Access denied: User role level ${userMaxRole} is below required level ${allowedMaxRole}.`);
      return res.sendStatus(401); // Unauthorized
    }

    next();
  };
};

module.exports = verifyRoles;
