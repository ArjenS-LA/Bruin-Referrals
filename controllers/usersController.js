const User = require("../data/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ message: "No users found" });
  res.json(users);
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

module.exports = { getAllUsers, deleteUser, getUser };
