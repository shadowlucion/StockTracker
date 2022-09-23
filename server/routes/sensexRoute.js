const express = require("express");
const router = express.Router();
const sensexController = require("./../controllers/sensexController");

router
  .route("/")
  .get(sensexController.getAllRecords)
  .post(sensexController.addNewRecord);

module.exports = router;
