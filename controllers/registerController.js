const User = require("../data/User");
const bcrypt = require("bcrypt");
const { sendWelcomeEmail, sendEmail } = require("../utils/sendEmail"); // Assuming sendEmail is in utils
const jwt = require("jsonwebtoken");

/**
 * Handles new user registration.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    console.warn("Registration attempt with missing fields.");
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  // Username validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: "Username must be 3-30 characters long and can contain letters, numbers, and underscores." });
  }

  // Email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Password strength validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters long and contain both letters and numbers." });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username: username }).exec();
    if (userExists) {
      console.warn(`Registration failed: Username '${username}' already exists.`);
      return res.status(409).json({ message: "Username already exists." });
    }

    const emailExists = await User.findOne({ email: email }).exec();
    if (emailExists) {
      console.warn(`Registration failed: Email '${email}' already in use.`);
      return res.status(409).json({ message: "Email already in use." });
    }

    // Create new user
    const newUser = await User.create({
      username: username,
      email: email,
      password: password, // Password will be hashed in pre-save middleware
    });

    console.log(`User '${username}' created successfully.`);

    // Send welcome email
    await sendWelcomeEmail(newUser);

    // Generate email verification token
    const verificationToken = jwt.sign(
      { username: newUser.username },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: "1d" }
    );

    // Send verification email
    const verificationURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    await sendEmail({
      email: newUser.email,
      subject: "Email Verification",
      text: `Hello ${newUser.name},\n\nPlease verify your email by clicking the link below:\n${verificationURL}`,
      html: `<p>Hello <strong>${newUser.name}</strong>,</p><p>Please verify your email by clicking the link below:</p><a href="${verificationURL}">Verify Email</a>`,
    });

    res.status(201).json({ message: `User '${username}' registered successfully. Please verify your email.` });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Verifies a user's email using the verification token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    const user = await User.findOne({ username: decoded.username }).exec();

    if (!user) {
      console.warn(`Email verification failed: User '${decoded.username}' not found.`);
      return res.status(400).json({ message: "Invalid token." });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    user.isEmailVerified = true;
    await user.save();

    console.log(`User '${user.username}' email verified successfully.`);

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = { handleNewUser, verifyEmail };
