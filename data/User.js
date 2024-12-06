const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  //make requireed later
  name: {
    type: String,
    default: "First Last"
  },
  profilepicture: {
    data: Buffer,
    contentType: String,
  },
  bio: {
    type: String,
    default: "Bio",
  },
  about: {
    type: String,
    default: "Tell us about yourself...",
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
