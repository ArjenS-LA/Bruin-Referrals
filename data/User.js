const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid."],
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: {
        type: Number,
        default: 0,
      },
      Admin: {
        type: Number,
        default: 0,
      },
      Moderator: {
        type: Number,
        default: 0,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    name: {
      type: String,
      default: "First Last",
      trim: true,
    },
    profilepicture: {
      data: Buffer,
      contentType: String,
    },
    bio: {
      type: String,
      default: "Bio",
      maxlength: [500, "Bio cannot exceed 500 characters."],
    },
    about: {
      type: String,
      default: "Tell us about yourself...",
      maxlength: [1000, "About section cannot exceed 1000 characters."],
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Pre-save middleware to hash passwords before saving.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Generates a password reset token.
 *
 * @returns {string} Reset token.
 */
userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return this.resetPasswordToken;
};

/**
 * Virtual field for user profile URL.
 */
userSchema.virtual("profileURL").get(function () {
  return `/users/${this._id}/profile`;
});

module.exports = mongoose.model("User", userSchema);
