"use strict";

class Login {
  get rules() {
    return {
      // validation rules
      // username: "required|unique:users",
      email: "required|email",
      password: "required|min:8"
    };
  }

  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      min: "Woah, {{ field }} doit avoir 8 caractères au minimum.",
      required: "Woah, {{ field }} est requis."
      // unique: "Wait a second, the {{ field }} already exists"
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = Login;
