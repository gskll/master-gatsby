const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start walking over,  we will have your order ready in the next 20 mins.</p>
      <ul>
        ${order
          .map(
            (item) =>
              `<li>
            <img src="${item.thumbnail}" alt="${item.name}">
            ${item.size} ${item.name} - ${item.price}
          </li>`
          )
          .join("")}
      </ul>
      <p>Your total is <strong>$${total}</strong> due at pickup</p>
      <style>
        ul {
          list-style: none;
        }
      </style>
    </div>
  `;
}
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

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);

  // Check if honeypot filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "BoopBeepBopZzzst Goodbye ERR3423432" }),
    };
  }
  // Validate the data coming in is correct
  const requiredFields = ["email", "name", "order"];

  for (const field of requiredFields) {
    console.log(`Checking ${field} is good`);

    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send the email
  // Send the success or error message
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: "New order!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
