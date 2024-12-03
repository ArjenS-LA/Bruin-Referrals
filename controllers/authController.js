const User = require("../data/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, email, password } = req.body;

  // ADD EMAIL LOGIN LATER
  // (Username or Email) and password are required
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if user exists
  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.status(404).json({ message: "User not found" });

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Incorrect password" });

  // Role-based access control
  const roles = Object.values(foundUser.roles);

  // Create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Save refresh token to database
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  console.log(result);
  console.log(roles);

  /* Store access token in http cookie */
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken });
  // Return success message
  // res.status(200).json({ message: "Login successful" });
};

module.exports = { handleLogin };
