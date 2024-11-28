const express = require("express");
const path = require("path");
const app = express();
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
//const cors = require("cors");

// // TESTING
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// Parse incoming JSON data
app.use(express.json());

// Parse incoming cookies
app.use(cookieParser());

// API Routes
app.use("/register", require("./src/components/Routes/register"));
app.use("/auth", require("./src/components/Routes/auth"));
app.use("/refreshToken", require("./src/components/Routes/refresh"));

// Serve React App for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Routes with JWT verification

// Serve static files from React app
app.use(express.static(path.join(__dirname, "./public")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
