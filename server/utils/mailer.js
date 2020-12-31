const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

var mailOptions = {
  from: process.env.EMAIL,
  to: '',
  subject: '',
  text: '',
  html: '',
};

const mailer = async (toEmail, text = '', html = '', subject = '') => {
  mailOptions.to = toEmail;
  mailOptions.text = text;
  mailOptions.html = html;
  mailOptions.subject = subject;
  await transporter.sendMail(mailOptions);
};

module.exports = mailer;
