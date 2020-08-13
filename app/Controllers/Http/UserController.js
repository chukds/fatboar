"use strict";
//const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");
const Prize = use("App/Models/Prize");

class UserController {
  //Add user coupon
  async addCoupon({ auth, request, response, session, view }) {
    const formData = request.only(["coupon_name"]);

    try {
      const coupon = await Coupon.findBy("coupon_name", formData.coupon_name);
      if (
        coupon &&
        coupon.user_id === null &&
        coupon.status === 0 &&
        coupon.is_end === 0
      ) {
        coupon.user_id = auth.user.id;
        await coupon.save();

        const prize = await Prize.findBy("id", coupon.prize_id);

        return view.render("user.user_prize", {
          coupon: coupon.toJSON(),
          prize: prize.toJSON(),
        });
      }

      session.flash({
        notification: {
          type: "danger",
          message: `Woah, le ticket n'est pas disponible.`,
        },
      });
      return response.redirect("back");
    } catch (e) {
      console.log(e);
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, erreur de traitement de la demande sur le serveur.`,
        },
      });

      return response.redirect("back");
    }
  }
  //Show user coupon
  showUserPrize({ response }) {
    return response.send("user prize ...");
  }
  //Add user coupon
  async userCoupons({ auth, response, view }) {
    const coupons = await Coupon.query().where("user_id", auth.user.id).fetch();
    return view.render("user.user_tickets", {
      coupons: coupons.toJSON(),
    });
  }
}

module.exports = UserController;
