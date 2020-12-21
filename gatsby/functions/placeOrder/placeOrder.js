const nodemailer = require("nodemailer");

// create a transport for nodemailer
// sendgrid or postmark or ethereal.email for testing
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // Workaround for ethereal dodgy certificate
  tls: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: "orders@example.com",
    subject: "New order!",
    html: `<p>Your new pizza order is here</p>`,
  });
  console.log(">>>>>>", info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
