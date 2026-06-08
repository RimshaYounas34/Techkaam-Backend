const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ===============================
// CREATE ADMIN (WITH BCRYPT)
// ===============================
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

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Admin created successfully",
      admin,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// LOGIN ADMIN (WITH BCRYPT)
// ===============================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔐 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
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
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET MESSAGES
// ===============================
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE MESSAGE
// ===============================
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};