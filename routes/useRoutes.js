const express = require("express");
const userRoutes = express.Router();
const { createAcount, login } = require("../controllers/User/index.js");

userRoutes.post("/signup", createAcount);
userRoutes.post("/login", login);

module.exports = userRoutes;
