const User = require("../data/User");

const handleEdit = async(req, res) => {
    const { name, profilepicture, bio, about} = req.body;
    const newUser = { name, profilepicture, bio, about};
    const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ status: "Sucess", results: { updatedUser } });
};

module.exports = { handleEdit };