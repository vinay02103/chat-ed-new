const { login, register, allUsers } = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allUsers/:id", allUsers);

module.exports = router;
