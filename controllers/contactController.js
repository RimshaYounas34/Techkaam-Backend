const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // MongoDB save
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();

    // Gmail Config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mahersaba441@gmail.com",
        pass: "fogdazexpaqopebw",
      },
    });

    // Email Send
    await transporter.sendMail({
  from: "mahersaba441@gmail.com",
  to: "mahersaba441@gmail.com",
  subject: `New Contact Form - ${subject}`,
  html: `
    <h2>New Contact Message</h2>

    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b> ${message}</p>
  `,
});

    res.json({
      success: true,
      message: "Message saved and email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};