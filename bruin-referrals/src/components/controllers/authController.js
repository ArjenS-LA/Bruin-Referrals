const userDb = {
  users: require("../../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  // ADD EMAIL LOGIN LATER
  // (Username or Email) and password are required
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if user exists
  const foundUser = userDb.users.find((person) => person.username === username);
  if (!foundUser) return res.status(404).json({ message: "User not found" });

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Incorrect password" });

  // Create JWTs
  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Save refresh token to database
  const otherUsers = userDb.users.filter(
    (u) => u.username !== foundUser.username
  );
  const currentUser = { ...foundUser, refreshToken };
  userDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "../../data/users.json"),
    JSON.stringify(userDb.users)
  );

  /* Store access token in memory or http cookie, not in local
  storage for accessibility to javscript
  makes them vulnerable */

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ accessToken });
  // Return success message
  // res.status(200).json({ message: "Login successful" });
};

module.exports = { handleLogin };
