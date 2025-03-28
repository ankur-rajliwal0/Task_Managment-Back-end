const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function AdminLogin(req, res) {
  try {
    const { email } = req.body;

    if (email !== "admin@gmail.com") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.log("internal server error");
  }
}

module.exports = AdminLogin;
