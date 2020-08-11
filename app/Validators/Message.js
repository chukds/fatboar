"use strict";
const { rule } = use("Validator");

class Message {
  get rules() {
    return {
      // validation rules
      email: "required|email",
      name: [
        rule("min", 2),
        rule("max", 30),
        rule("required"),
        rule("regex", /[\w]/g),
      ],
      message: [
        rule("min", 20),
        rule("max", 500),
        rule("required"),
        rule("regex", /[\s\'\()\.\,\@\?\!\;\^\"\:\w]/gm),
      ],
    };
  }

  get messages() {
    return {
      required: "Woah, {{ field }} est requis.",
      email: "Woah, {{ field }} n'est pas au bon format.",
      regex: "Woah, {{ field }} n'est pas COOL!",
      min: "Woah, {{ field }} doit avoir 20 caractères au minimum.",
      max: "Woah, {{ field }} doit avoir 500 caractères au maximum.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = Message;
