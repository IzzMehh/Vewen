import { MailtrapClient } from "mailtrap"
import moment from "moment";
import nodemailer from "nodemailer"

function verifyUserRequestEmail(userData) {
  const cooldown = moment(Number(userData.emailVerificationTokenExpiredAt)).format("hh:mm:ss A")

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "teamvewen@gmail.com",
      pass: `${process.env.GMAIL_PASS}`,
    }
  })
  const mailOptions = {
    from: 'teamvewen@gmail.com',
    to: userData.email,
    subject: 'Verification For Account',
    html: `
 <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://th.bing.com/th/id/OIP.vmtfM-cf8nQzmbLgs1q7nwHaEK?rs=1&pid=ImgDetMain" alt="Friendly cat saying hi" style="width: 100%; max-width: 300px; display: block; margin: 0 auto 20px;">

        <h1 style="font-size: 24px; margin-bottom: 20px; text-align: center; color: #333;">Welcome, ${userData.display_name}!</h1>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
            Thanks for signing up! To complete your registration, please verify your email address by the verification code given:
        </p>

        <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 20px;">
            this code is valid for 15 minutes ! ( till ${cooldown} )
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; margin-bottom: 20px;">
            <code style="font-size: 32px; font-weight: bold; letter-spacing: 2px;">${userData.emailVerificationToken}</code>
        </div>

        <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 20px;">
            If you didn't create an account with us, please ignore this email.
        </p>

        <p style="font-size: 14px; color: #888; text-align: center; font-style: italic;">
            We hope you enjoy this journey as much as we enjoy creating it for you. ~VeWen
        </p>
    </div>
  `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("something went wrong")
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function verifyUserConfirmationEmail(userData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "teamvewen@gmail.com",
      pass: `${process.env.GMAIL_PASS}`,
    }
  })
  const mailOptions = {
    from: 'teamvewen@gmail.com',
    to: userData.email,
    subject: 'Account Verified!',
    html: `
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="position: relative; margin-bottom: 20px;">
        <img src="https://th.bing.com/th/id/OIP.5RYi2ar1pzBSptuzlDzqKwHaFX?rs=1&pid=ImgDetMain" alt="Thank you cat" style="width: 100%; max-width: 300px; display: block; margin: 0 auto 20px;">
        </div>


        <h2 style="color: #333; margin-bottom: 10px; font-size: 24px;">
            Your account ${userData.display_name}, is now verified !!
        </h2>

        <p style="color: #666; font-size: 16px; margin-top: 20px;">
            Team VeWen~
        </p>
    </div>
  `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("something went wrong")
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function passwordResetRequestEmail(userData) {

  const TOKEN = process.env.MAILTRAP_KEY

  const cooldown = moment(Number(userData.passwordResetTokenExpiredAt)).format("hh:mm:ss A")

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "teamvewen@gmail.com",
      pass: `${process.env.GMAIL_PASS}`,
    }
  })
  const mailOptions = {
    from: 'teamvewen@gmail.com',
    to: userData.email,
    subject: 'Password reset request',
    html: `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="cat-image.jpg" alt="Relaxed cat lying on its back" style="width: 100%; max-width: 500px; height: auto; display: block; margin: 0 auto 20px auto; border-radius: 8px;">

        <h1 style="color: #000; text-align: center; font-size: 24px; margin-bottom: 20px;">Password Change Request</h1>

        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>

        <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
            Hey ${userData.display_name}, have you requested for password change?
        </p>

        <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
            You can change your VeWen password Through this link:
        </p>

        <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            valid for 1 hour ( till ${cooldown} )
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/${userData._id}/passwordReset/${userData.passwordResetToken}" style="
                background-color: #39b3ed;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                display: inline-block;
                border: none;
                cursor: pointer;">
                Click here
            </a>
        </div>
    </div>
  `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("something went wrong")
    } else {
      console.log('Email sent:', info.response);
    }
  });
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
        "display_name": `${userData.display_name}`,
        "expiry_time": `${cooldown}`,
        "code": `${userData.emailResetToken}`,
      }
    })
    .then(console.log, console.error);
}


async function emailResetConfirmationEmail(userData) {

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