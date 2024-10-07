const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
// Allow CORS by setting Access-Control-Allow-Origin
const headers = {
  "Access-Control-Allow-Origin": "https://duuty.netlify.app", // Allows any origin
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// Handle OPTIONS method for CORS preflight request
if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 200,
    headers,
    body: 'CORS preflight response',
  };
}

if (event.httpMethod !== 'POST') {
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
}


  // Parse request body
  const { name, mobile } = JSON.parse(event.body);

  // Create transporter for Gmail
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
  

  // Define email options
  const mailOptions = {
    from: "dpchowdaryd@gmail.com", // Your email
    to: "ravi.sodinger@gmail.com", // Recipient email
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

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true, message: "Email sent successfully" }),
  };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Error sending email' }),
    };
  }
};
