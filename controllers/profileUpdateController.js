const User = require("../data/User");

const getProfile = async (req, res) => {
    try {
      const userId = req.user.id;
    
      const user = await User.findById(userId, "name bio about profilepicture");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching profile data" });
    }
  };

const handleEdit = async(req, res) => {
    const { name, profilepicture, bio, about} = req.body;
    const newUser = { name, profilepicture, bio, about};
    const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ status: "Sucess", results: { updatedUser } });
};

module.exports = { getProfile, handleEdit };