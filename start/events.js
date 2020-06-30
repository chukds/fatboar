"use strict";

const Event = use("Event");
const Mail = use("Mail");

Event.on("forgot::password", async data => {
  await Mail.send("emails.recover", data, message => {
    message
      .to(data.user.email)
      .from("hello@fatboar.com")
      .subject("Réinitialisation de mot de passe");
  });
});

Event.on("password::reset", async data => {
  await Mail.send("emails.confirm", data, message => {
    message
      .to(data.user.email)
      .from("hello@fatboar.com")
      .subject("Mot de passe modifié");
  });
});
