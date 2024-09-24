const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create the transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dpchowdaryd@gmail.com", // Replace with your Gmail email
    pass: "grsb ulcv hyhp nmbh", // Replace with your Gmail App Password
  },
});

// Serve static HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to receive form data and send an email
app.post("/send-email", (req, res) => {
  const { name, mobile } = req.body;

  // Mail options
  const mailOptions = {
    from: "dpchowdaryd@gmail.com", // Your email
    to: "prasanna.dommalapati@gmail.com", // Recipient email
    subject: `Duuty RegistrationSubmission from ${name}`,
    html: `
            <html>
                <div>
                    <h2>Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Mobile Number:</strong> ${mobile}</p>
                </div>
            </html>
        `,
  };

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Email failed to send" });
    } else {
      console.log("Email sent:", info.response);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
