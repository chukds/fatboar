"use strict";

class Register {
  get rules() {
    return {
      // validation rules
      is_cgu: "boolean|required",
      is_news: "boolean|required",
      is_adult: "boolean|required",
      firstname: [
        rule("min", 2),
        rule("max", 50),
        rule("required"),
        rule("regex", new RegExp("/[\w]/g")),
      ],
      lastname: [
        rule("min", 2),
        rule("max", 50),
        rule("required"),
        rule("regex", new RegExp("/[\w]/g")),
      ],
      recaptcha: "required",
      password: "required|min:8",
      email: "required|email|unique:users",
      telephone: [
        rule("min", 10),
        rule("max", 10),
        rule("required"),
        rule("regex", new RegExp("/[0][0-9]{9}/g")),
      ],
    };
  }

  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      required: "Woah, {{ field }} est requis.",
      min: "Woah, {{ field }} est trop court.",
      max: "Woah, {{ field }} doit avoir 10 caractères au maximum.",
      unique: "Désolé, ce {{ field }} existe déjà.",
      regex: "Woah, {{ field }} n'est pas au bon format.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashExcept(["password"]);

    return this.ctx.response.redirect("back");
  }
}

module.exports = Register;
