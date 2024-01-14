const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: 'dp200393ana@gmail.com' };
  console.log(email);
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
