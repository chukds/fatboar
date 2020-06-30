"use strict";

class Message {
  get rules() {
    return {
      // validation rules
      name: "required",
      message: "required|min:20|max:500",
      email: "required|email"
    };
  }

  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      required: "Woah, {{ field }} est requis.",
      min: "Woah, {{ field }} doit avoir 20 caractères au minimum.",
      max: "Woah, {{ field }} doit avoir 500 caractères au maximum."
      // unique: "Wait a second, the {{ field }} already exists"
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = Message;
