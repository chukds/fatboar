"use strict";

const Event = use("Event");
const Mail = use("Mail");

Event.on("password::forgot", async (data) => {
  await Mail.send("emails.recover", data, (message) => {
    message
      .to(data.user.email)
      .from("hello@fatboar.com")
      .subject("Réinitialisation de mot de passe");
  });
});

Event.on("password::reset", async (data) => {
  await Mail.send("emails.confirm", data, (message) => {
    message
      .to(data.user.email)
      .from("hello@fatboar.com")
      .subject("Mot de passe modifié");
  });
});

Event.on("message::send", async (data) => {
   const user= JSON.parse(data.user)

  await Mail.send("emails.message", data, (message) => {
    message
      .to("admin@fatboar.online")
      .from(user.email)
      .subject(
        `Message de Fatboar Formulaire de Contact - ${user.name}`
      );
  });
});

