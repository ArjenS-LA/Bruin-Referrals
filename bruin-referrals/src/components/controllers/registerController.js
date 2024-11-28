const userDb = {
  users: require("../../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

// Define controller object
const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Username, pswd, email are required
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  // Check if user already exists
  const userExists = userDb.users.find(
    (person) => person.username === username
  );
  if (userExists)
    return res.status(409).json({ message: "User already exists" });
  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    // Add new user to database
    userDb.users.push(newUser);

    // Write updated database to file
    await fsPromises.writeFile(
      path.resolve(__dirname, "../../data/users.json"),
      JSON.stringify(userDb.users)
    );

    // Log success message
    console.log("User created successfully");
    // Return success message
    res.status(201).json({ success: `User created ${username} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
