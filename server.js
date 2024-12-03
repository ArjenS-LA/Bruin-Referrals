require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// Connect to MongoDB
connectDB();

// Parse incoming JSON data
app.use(express.json());

//Handle cross origin
app.use(
  cors({
    origin: "http://localhost:3000",
    //methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// Parse incoming cookies
app.use(cookieParser());

// API Routes
app.use("/register", require("./src/components/Routes/register"));
app.use("/auth", require("./src/components/Routes/auth"));
app.use("/refresh", require("./src/components/Routes/refresh"));
app.use("/logout", require("./src/components/Routes/logout"));
app.use("/posts", require("./src/components/Routes/postRoute"));

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

// Connect to MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
