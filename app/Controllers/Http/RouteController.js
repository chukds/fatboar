"use strict";

class RouteController {
  // Check consent of user
  // async consentCheck({ request, auth, response, session }) {
  consentCheck({ request, response }) {
    const formData = request.only(["email", "is_adult"]);
    response.send(formData);
  }

  //send message to user
  sendMessage({ response }) {
    response.send("Message sent!");
  }
}

module.exports = RouteController;
