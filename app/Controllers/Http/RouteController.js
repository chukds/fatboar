"use strict";

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

  /*
  sendError({ response, view }) {
    return response.send(view.render("404"));
  }
  */
}

module.exports = RouteController;
