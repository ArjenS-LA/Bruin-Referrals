const { model } = require("mongoose");
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const { email, subject, message } = options;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: subject,
      text: message,
    });

    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).message("Error sending email");
  }
};
