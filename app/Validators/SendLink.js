"use strict";

class SendLink {
  get rules() {
    return {
      // validation rules
      email: "required|email"
    };
  }
  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      required: "Woah, {{ field }} est requis."
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = SendLink;
