const router = require("express").Router();
const Contact = require("../models/Contact");

// CREATE CONTACT
router.post("/", async (req, res) => {
  try {
    const data = await Contact.create(req.body);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;