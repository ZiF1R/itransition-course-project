"use strict";

const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.login.bind(userController));
router.post("/", userController.createUser);

module.exports = router;
