// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const dotenv = require("dotenv");
// dotenv.config();

// async function verifyToken2(req, res, next) {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }

// module.exports = verifyToken2;

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

async function verifyToken2(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id); // Ensure it's `_id`

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach full user object
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken2;
