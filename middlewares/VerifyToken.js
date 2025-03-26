const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");
dotenv.config();

async function verifyToken(req, res, next) {
  try {
    console.log("Token verification middleware triggered");

    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by ID stored in the token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = verifyToken;
