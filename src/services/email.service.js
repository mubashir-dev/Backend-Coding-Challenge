const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendEmail = function (resetLink, toEmail, subject, html) {
  const mailOptions = {
    from: `${process.env.MAIL_FROM_ADDRESS}`,
    to: toEmail,
    subject: subject,
    html: html,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email has not sent: %s", error);
    }
    console.log("Email has Sent");
  });
};
