const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};