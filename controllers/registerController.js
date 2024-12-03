const User = require("../data/User");
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
  const userExists = await User.findOne({ username: username }).exec();
  if (userExists)
    return res.status(409).json({ message: "User already exists" });
  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const result = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Log success message
    console.log(result);
    // Return success message
    res.status(201).json({ success: `User created ${username} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
