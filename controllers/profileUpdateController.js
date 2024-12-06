const User = require("../data/User");

const getProfile = async (req, res) => {
  try {
    const username = req.user;

    console.log(username);

    const user = await User.findOne({ username: username }).exec();

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile data" });
  }
};

const handleEdit = async (req, res) => {
  try {
    const { name, profilepicture, bio, about } = req.body;
    const username = req.user;

    const updates = { name, profilepicture, bio, about };

    // Define options for findOneAndUpdate
    const options = {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
      context: "query", // Necessary for some validators
    };

    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: updates },
      options
    ).exec();

    if (!updatedUser) {
      return res.status(403).json({ message: "User not found." });
    }

    res.status(200).json({ status: "Success", results: { updatedUser } });
  } catch (error) {
    console.log("Error updating profile:", error);

    // Handle duplicate key error (e.g., username or email already exists)
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({ message: `The ${duplicatedField} is already in use.` });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: "Validation Error.", errors: messages });
    }

    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { getProfile, handleEdit };
