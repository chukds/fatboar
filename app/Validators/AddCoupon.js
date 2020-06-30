"use strict";

class AddCoupon {
  get rules() {
    return {
      // validation rules
      coupon_name: "required|min:10|max:10",
    };
  }
  get messages() {
    return {
      required: "Woah, {{ field }} est requis.",
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
