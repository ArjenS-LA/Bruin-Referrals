const ROLES_LIST = {
  Admin: { value: 5150, description: "Full access to all resources." },
  Editor: { value: 1984, description: "Can edit content." },
  User: { value: 2001, description: "Basic user access." },
  Moderator: { value: 3000, description: "Can moderate user content." }, // New Role Example
};

/**
 * Retrieves role value based on role name.
 *
 * @param {string} roleName - Name of the role.
 * @returns {number|null} Role value or null if not found.
 */
const getRoleValue = (roleName) => {
  return ROLES_LIST[roleName]?.value || null;
};

/**
 * Adds a new role to the ROLES_LIST.
 *
 * @param {string} roleName - Name of the new role.
 * @param {number} value - Numeric value of the role.
 * @param {string} description - Description of the role.
 */
const addRole = (roleName, value, description) => {
  if (ROLES_LIST[roleName]) {
    console.warn(`Role '${roleName}' already exists.`);
    return;
  }
  ROLES_LIST[roleName] = { value, description };
  console.log(`Role '${roleName}' added successfully.`);
};

/**
 * Removes an existing role from the ROLES_LIST.
 *
 * @param {string} roleName - Name of the role to remove.
 */
const removeRole = (roleName) => {
  if (!ROLES_LIST[roleName]) {
    console.warn(`Role '${roleName}' does not exist.`);
    return;
  }
  delete ROLES_LIST[roleName];
  console.log(`Role '${roleName}' removed successfully.`);
};

module.exports = {
  ROLES_LIST,
  getRoleValue,
  addRole,
  removeRole,
};
