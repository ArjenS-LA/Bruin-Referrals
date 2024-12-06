const User = require("../data/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ message: "No users found" });
  res.json(users);
};


const getCurrentUser = async (req, res) => {
  // req.user should contain the username from your JWT middleware
  if (!req?.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ username: req.user })
      .select('-password') // Exclude password field
      .exec();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      roles: user.roles,
      _id: user._id
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching current user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "No user id provided" });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) return res.status(404).json({ message: "User not found" });

  const result = await User.deleteOne({ _id: req.body.id }).exec();
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "No user id provided" });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

module.exports = { getAllUsers, deleteUser, getUser, getCurrentUser };
