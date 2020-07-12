"use strict";
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");

class AuthController {
  // Login user
  async login({ request, auth, response, session, view }) {
    const formData = request.only(["email", "password", "remember"]);
    /*
      const userId = await User.query()
        .where("email", formData.email)
        .ids();
    */
    // return formData;
    try {
      const user = await User.findBy("email", formData.email);

      /*const totalCoupons = await Coupon.query()
        .where("user_id", user.id)
        .count("* as total");

      const inactiveCoupons = await Coupon.query()
        .where("user_id", user.id)
        .where("status", 0)
        .count("* as total");

      const activeCoupons = await Coupon.query()
        .where("user_id", user.id)
        .where("status", 1)
        .count("* as total");*/

      await auth
        .remember(!!formData.remember)
        .attempt(formData.email, formData.password);

      if (auth.user.role === "admin") {
        return response.route("admin-home");
      } else if (auth.user.role === "staff") {
        return response.route("staff-home");
      }

      /*return response.route("user-home", {
        totalCoupons: totalCoupons[0].total,
        activeCoupons: activeCoupons[0].total,
        inactiveCoupons: inactiveCoupons[0].total
      });*/
      return response.route("user-home");
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, Nous ne pouvons pas vous indentifiez.`,
        },
      });

      return response.redirect("back");
    }
  }

  // Register without captcha
  async enrol({ request, response, auth, session }) {
    const userData = request.only([
      "firstname",
      "lastname",
      "email",
      "telephone",
      "password",
      "is_adult",
      "is_cgu",
      "is_news",
    ]);
    // return formData;

    try {
      const user = await User.create(userData);
      const login = await auth.login(user);
      return response.route("user-home");
      /*return response.route("user-home", {
        totalCoupons: 0,
        activeCoupons: 0,
        inactiveCoupons: 0
      });*/
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, Nous ne pouvons pas vous inscrire.`,
        },
      });

      return response.redirect("back");
    }
  }

  // Register user with captcha
  async register({ request, response, auth, session }) {
    const userData = request.only([
      "firstname",
      "lastname",
      "email",
      "telephone",
      "password",
      "is_adult",
      "is_cgu",
      "is_news",
    ]);
    // return formData;

    try {
      const user = await User.create(userData);
      const login = await auth.login(user);
      return response.route("user-home");
      /*return response.route("user-home", {
        totalCoupons: 0,
        activeCoupons: 0,
        inactiveCoupons: 0
      });*/
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, Nous ne pouvons pas vous inscrire.`,
        },
      });

      return response.redirect("back");
    }
  }

  // Logout user
  async logout({ auth, response }) {
    await auth.logout();

    return response.route("home");
  }
}

module.exports = AuthController;
