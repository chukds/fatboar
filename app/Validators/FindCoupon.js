"use strict";

class FindCoupon {
  get rules() {
    return {
      // validation rules
      email: "email",
      coupon_name: "min:15|max:15",
      telephone: "min:10|max:10"
    };
  }
  get messages() {
    return {
      email: "Woah, {{ field }} n'est pas au bon format.",
      min: "Woah, {{ field }} est trop court.",
      max: "Woah, {{ field }} est trop long."
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = FindCoupon;
