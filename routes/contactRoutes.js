const router = require("express").Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Gmail Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mahersaba441@gmail.com",
    pass: "fogdazexpaqopebw",
  },
});

// CREATE CONTACT
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // MongoDB Save
    const data = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send Email
    await transporter.sendMail({
      from: "mahersaba441@gmail.com",
      to: "mahersaba441@gmail.com", // jis gmail par message rece

      subject: `New Contact Message - ${subject || "No Subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({
      success: true,
      data,
      message: "Message saved and email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;