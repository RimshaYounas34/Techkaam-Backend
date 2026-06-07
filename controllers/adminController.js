const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

// CREATE ADMIN
exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({ email, password });

    res.json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LOGIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET MESSAGES ⭐ ADD THIS
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE MESSAGE ⭐ ADD THIS
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};