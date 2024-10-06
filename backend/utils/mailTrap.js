import { MailtrapClient } from "mailtrap"
import moment from "moment";

function verifyUserRequestEmail(userData) {
  const TOKEN = process.env.MAILTRAP_KEY

  const cooldown = moment(Number(userData.verificationTokenExpiredAt)).format("hh:mm:ss A")

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: userData.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "20a8b29e-cb29-443f-a648-4be1ee90550a",
      template_variables: {
        "expiry_time": `${cooldown}`,
        "name": userData.display_name,
        "code": userData.verificationToken,
        "company_info_country": "India"
      }
    })
    .then(console.log, console.error);
}

function verifyUserConfirmationEmail(userData) {

  const TOKEN = process.env.MAILTRAP_KEY
  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: "gauravbishtyt@gmail.com",
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "5c15af51-03df-49fd-884d-9da7c05c1905",
      template_variables: {
        "display_name": userData.display_name
      }
    })
    .then(console.log, console.error);
}

function passwordResetRequestEmail(userData) {

  const TOKEN = process.env.MAILTRAP_KEY

  const cooldown = moment(Number(userData.passwordResetTokenExpiredAt)).format("hh:mm:ss A")

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: userData.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "713530fd-ea06-465c-809e-5daad22c8198",
      template_variables: {
        "expiry_time": `${cooldown}`,
        "display_name": userData.display_name,
        "link": `${process.env.FRONTEND_URL}/${userData._id}/passwordReset/${userData.passwordResetToken}`
      }
    })
    .then(console.log, console.error);
}

async function passwordResetConfirmationEmail(userData) {
  const TOKEN = process.env.MAILTRAP_KEY

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: userData.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "d7beb74e-6691-4e9e-bc2c-205900031175",
      template_variables: {
        "display_name": userData.display_name
      }
    })
    .then(console.log, console.error);
}


async function emailResetRequestEmail(userData) {

  const TOKEN = process.env.MAILTRAP_KEY;

  const cooldown = moment(Number(userData.emailResetTokenExpiredAt)).format("hh:mm:ss A")

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: userData.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "eb15e4ec-7867-4469-bed5-88a8bb329182",
      template_variables: {
        "display_name":`${userData.display_name}`,
        "expiry_time": `${cooldown}`,
        "code": `${userData.emailResetToken}`,
      }
    })
    .then(console.log, console.error);
}


async function emailResetConfirmationEmail(userData){
  
  const TOKEN = process.env.MAILTRAP_KEY;

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "VeWen",
  };
  const recipients = [
    {
      email: userData.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "6bbae32c-9bca-4e05-a20e-b55ca09581e6",
      template_variables: {
        "display_name": userData.display_name
      }
    })
    .then(console.log, console.error);
}


export {
  verifyUserRequestEmail, verifyUserConfirmationEmail, passwordResetRequestEmail, passwordResetConfirmationEmail, emailResetRequestEmail, emailResetConfirmationEmail
}