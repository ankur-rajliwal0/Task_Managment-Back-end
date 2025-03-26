const express = require("express");
const routes = express.Router();
const userRoutes = require("./useRoutes.js");
const taskRoutes = require("./taskRoutes.js");
const AdminRoutes = require("./AdminRoutes.js");

routes.use("/auth", userRoutes);
routes.use("/task", taskRoutes);
routes.use("/admin", AdminRoutes);

module.exports = routes;
