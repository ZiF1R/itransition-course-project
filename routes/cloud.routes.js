"use strict";

const Router = require("express");
const router = new Router();
const cloudController = require("../controllers/cloud.controller");
// const multer = require("multer");
// const upload = multer({ dest: __dirname + "/uploads/images" });

router.post("/", /*upload.single("photo"),*/ cloudController.uploadImage);

module.exports = router;
