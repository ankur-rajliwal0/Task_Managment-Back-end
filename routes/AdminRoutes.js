const express = require("express");
const GetUserforAdmin = require("../controllers/admin/GetUsersData.js");
const verifyAdmin = require("../middlewares/VerifyRole.js");
const AdminLogin = require("../controllers/admin/adminlogin.js");
const AdminRoutes = express.Router();

AdminRoutes.post("/adminLogin",AdminLogin)
AdminRoutes.get("/getalldata", verifyAdmin, GetUserforAdmin);

module.exports = AdminRoutes;
