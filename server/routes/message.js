const express = require("express");
const { addChat, getChats } = require("../controllers/message");
const router = express.Router();

router.post("/addChat", addChat);
router.post("/getChat", getChats);

module.exports = router;
