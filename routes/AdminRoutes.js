const express = require("express");
const GetUserforAdmin = require("../controllers/admin/GetUsersData.js");
const verifyAdmin = require("../middlewares/VerifyRole.js");
const AdminRoutes = express.Router();

AdminRoutes.get("/getalldata", verifyAdmin, GetUserforAdmin);

module.exports = AdminRoutes;
