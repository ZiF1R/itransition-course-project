"use strict";

const Router = require("express");
const router = new Router();
const itemsController = require("../controllers/items.controller");

router.get("/", itemsController.getItems.bind(itemsController));
router.post("/:id", itemsController.editItem.bind(itemsController));
router.delete("/:id", itemsController.removeItem.bind(itemsController));
router.post("/", itemsController.createItem.bind(itemsController));
router.get("/optional_fields", itemsController.generateItemOptionalFields);

module.exports = router;
