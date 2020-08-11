"use strict";
const Event = use("Event");

class RouteController {
  // Check consent of user
  // async consentCheck({ request, auth, response, session }) {
  consentCheck({ request, response }) {
    const formData = request.only(["email", "is_adult"]);
    return response.send(formData);
  }

  //send message to user
  sendMessage({ response }) {
    return response.send("Message sent!");
  }

  toSendMessage({ request, response, session }) {
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
      console.log(e)
      session.flash({
        notification: {
          type: "danger",
          message: "Désolé, erreur d'envoi de message."
        }
      });
      return response.redirect("back");
    }
  }
}

module.exports = RouteController;
