const userDb = {
  users: require("../../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.body;

  // Check if refresh token exists
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(jwt);
  const refreshToken = cookies.jwt;

  // Check if user exists
  const foundUser = userDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403);

  // Evaluate refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.status(403);
    }
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
