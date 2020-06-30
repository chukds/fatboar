"use strict";

class PasswordReset {
  get rules() {
    return {
      // validation rules
      token: "required",
      password: "required|min:8|confirmed"
    };
  }

  get messages() {
    return {
      required: "Woah, {{ field }} est requis.",
      min: "Woah, {{ field }} est trop court.",
      confirmed: "Woah, {{ field }} ne correspond pas au saissis"
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = PasswordReset;
