const router = require("express").Router();

const {
  createAdmin,
  loginAdmin,
  getMessages,
  deleteMessage,
} = require("../controllers/adminController");

// ADMIN
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

// ⭐ ADD THIS (IMPORTANT)
router.get("/messages", getMessages);

module.exports = router;