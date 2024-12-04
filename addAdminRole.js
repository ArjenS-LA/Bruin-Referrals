require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./data/User");
const ROLES_LIST = require("./config/roles_list");

// Database connection
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addAdminRoleToUser(username) {
  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      console.log(`User '${username}' not found.`);
      return;
    }

    // Assign the Admin role
    user.roles.Admin = ROLES_LIST.Admin;
    await user.save();

    console.log(`Admin role added to user '${username}'.`);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error adding Admin role to user '${username}':`, error);
    mongoose.connection.close();
  }
}

// Replace 'someusername' with the actual username
addAdminRoleToUser("rrios");
