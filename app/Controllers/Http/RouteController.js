"use strict";
const Env = use("Env");
const Event = use("Event");
const Fetch = require("node-fetch");

class RouteController {
  // Check consent of user
  // async consentCheck({ request, auth, response, session }) {
  consentCheck({ request, response }) {
    const formData = request.only(["email", "is_adult"]);
    return response.send(formData);
  }

  //send message to admin
  sendMessage({ request, response, session }) {
    // return response.send("Message sent!");
    // const formData = request.all();
    const user = {};
    const msgInfo = request.only(['name', 'email', 'message']);
    user.email = msgInfo.email;
    user.name = msgInfo.name;

    try {

      Event.fire("message::send", { message:msgInfo.message, user:JSON.stringify(user) });

      session.flash({
        notification: {
          type: "success",
          message: "Votre message est envoyé !"
        }
      });
      return response.redirect("back");
    }catch (e) {
      // console.log(e)
      session.flash({
        notification: {
          type: "danger",
          message: "Désolé, erreur d'envoi de message."
        }
      });
      return response.redirect("back");
    }
  }

  async secureMessage({ request, response, auth, session }) {
    const user = {};
    const msgInfo = request.only(['name', 'email', 'message']);
    user.email = msgInfo.email;
    user.name = msgInfo.name;

    const formData = request.only(["recaptcha"]);
    // return formData;
    if (formData.recaptcha) {
      const url = Env.get("RECAPTCHA_URL");
      const secret = Env.get("RECAPTCHA_SECRET");
      const token = formData.recaptcha;

      let res = await Fetch(`${url}?secret=${secret}&response=${token}`);
      let data = await res.json();

      if (data.success === true && data.score >= 0.5) {
        try {
          Event.fire("message::send", { message:msgInfo.message, user:JSON.stringify(user) });

          session.flash({
            notification: {
              type: "success",
              message: "Votre message est envoyé !"
            }
          });
          return response.redirect("back");
        } catch (e) {
          console.log(e)
          session.flash({
            notification: {
              type: "danger",
              message: "Désolé, erreur d'envoi de message."
            },
          });
          return response.redirect("back");
        }
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, êtes-vous humain ?`,
        },
      });
      console.log("Low score failure ...");
      return response.redirect("back");
    }
    session.flash({
      notification: {
        type: "danger",
        message: `Désolé, le champ recaptcha est vide.`,
      },
    });
    console.log("Outside captcha failure ...");
    return response.redirect("back");
  }
}

module.exports = RouteController;
