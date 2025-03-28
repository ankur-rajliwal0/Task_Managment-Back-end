const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

module.exports = verifyAdmin;
