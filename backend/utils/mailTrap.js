import { MailtrapClient } from "mailtrap"

function verificationEmail(userData) {
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

function verified(userData){

    const TOKEN = process.env.MAILTRAP_KEY
const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
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

export{
    verificationEmail,
    verified,   
}