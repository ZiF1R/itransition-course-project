"use strict";

const Router = require("express");
const router = new Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.login.bind(usersController));
router.post("/", usersController.createUser);

module.exports = router;
