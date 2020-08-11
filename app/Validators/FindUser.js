"use strict";
const { rule } = use("Validator");

class FindUser {
  get rules() {
    return {
      // validation rules
      email: "email",
      coupon_name: [
        rule("min", 10),
        rule("max", 10),
        rule("regex", /[a-zA-Z0-9]/g),
      ],
      telephone: [
        rule("min", 10),
        rule("max", 10),
        rule("regex", /[0][0-9]{9}/g),
      ],
    };
  }
  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      min: "Woah, {{ field }} est trop court.",
      max: "Woah, {{ field }} est trop long.",
      regex: "Woah, {{ field }} n'est pas au bon format.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = FindUser;
