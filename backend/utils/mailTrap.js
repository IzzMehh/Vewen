import { MailtrapClient } from "mailtrap"

function verifyUserRequestEmail(userData) {
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
      template_uuid: "20a8b29e-cb29-443f-a648-4be1ee90550a",
      template_variables: {
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
        "display_name": userData.display_name,
        "link": `https://vewen.vercel.app/${userData._id}/passwordReset/${userData.passwordResetToken}`
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
export {
  verifyUserRequestEmail, verifyUserConfirmationEmail, passwordResetRequestEmail, passwordResetConfirmationEmail
}