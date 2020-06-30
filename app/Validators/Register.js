"use strict";

class Register {
  get rules() {
    return {
      // validation rules
      is_cgu: "required",
      is_news: "required",
      is_adult: "required",
      firstname: "required",
      lastname: "required",
      email: "required|email|unique:users",
      password: "required|min:8",
      telephone: "required|min:10|max:10"
    };
  }

  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      required: "Woah, {{ field }} est requis.",
      min: "Woah, {{ field }} est trop court.",
      max: "Woah, {{ field }} doit avoir 10 caractères au maximum.",
      unique: "Désolé, ce {{ field }} existe déjà."
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashExcept(["password"]);

    return this.ctx.response.redirect("back");
  }
}

module.exports = Register;
