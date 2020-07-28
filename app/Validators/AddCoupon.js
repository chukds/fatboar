"use strict";

class AddCoupon {
  get rules() {
    return {
      // validation rules
      // coupon_name: "required|min:10|max:10",
      coupon_name: [
        rule("min", 10),
        rule("max", 10),
        rule("required"),
        rule("regex", new RegExp("/[a-zA-Z0-9]/g")),
      ],
    };
  }
  get messages() {
    return {
      required: "Woah, {{ field }} est requis.",
      regex: "Woah, {{ field }} n'est pas au bon format.",
      min: "Woah, {{ field }} doit avoir 10 caractères au minimum.",
      max: "Woah, {{ field }} doit avoir 10 caractères au maximum.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = AddCoupon;
