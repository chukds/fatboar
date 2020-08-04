"use strict";
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");

class SocialAuthController {
  // Redirect to Social Login Provider
  async redirectToProvider({ ally, params }) {
    await ally.driver(params.provider).redirect();
  }

  // Social Login Provider succesful response
  async handleProviderCallback({ ally, auth, params, response, view }) {
    const provider = params.provider;
    try {
      const userData = await ally.driver(params.provider).getUser();

      const authUser = await User.query()
        .where({
          provider: provider,
          provider_id: userData.getId(),
        })
        .first();

      // if (!(authUser === null)) {
      if (authUser !== null) {
        // return authUser;
        if (authUser.is_adult !== 0) {
          const totalCoupons = await Coupon.query()
            .where("user_id", authUser.id)
            .count("* as total");

          const inactiveCoupons = await Coupon.query()
            .where("user_id", authUser.id)
            .where("status", 0)
            .count("* as total");

          const activeCoupons = await Coupon.query()
            .where("user_id", authUser.id)
            .where("status", 1)
            .count("* as total");

          await auth.loginViaId(authUser.id);

          return response.route("user-home", {
            // return view.render("user.user_home", {
            totalCoupons: totalCoupons[0].total,
            activeCoupons: activeCoupons[0].total,
            inactiveCoupons: inactiveCoupons[0].total,
          });
        }
        return view.render("consent", {
          userID: authUser.id,
        });
        /*
        const totalCoupons = await Coupon.query()
          .where("user_id", authUser.id)
          .count("* as total");

        const inactiveCoupons = await Coupon.query()
          .where("user_id", authUser.id)
          .where("status", 0)
          .count("* as total");

        const activeCoupons = await Coupon.query()
          .where("user_id", authUser.id)
          .where("status", 1)
          .count("* as total");

        await auth.loginViaId(authUser.id);

        return response.route("user-home", {
          totalCoupons: totalCoupons[0].total,
          activeCoupons: activeCoupons[0].total,
          inactiveCoupons: inactiveCoupons[0].total,
        });
        */
      }
      const user = new User();
      user.username = userData.getName();
      user.email = userData.getEmail();
      user.provider_id = userData.getId();
      user.provider = provider;

      await user.save();

      // return response.route("consent", {
      return view.render("consent", {
        userID: user.id,
      });
      /*
      await auth.loginViaId(user.id);

      return response.route("user-home", {
        totalCoupons: 0,
        activeCoupons: 0,
        inactiveCoupons: 0,
      });
      */
    } catch (e) {
      response.redirect("/auth/" + provider);
    }
  }

  // async updateConsent({ request, response, params }) {
  async checkConsent({ auth, request, response }) {
    const formData = request.all();
    // return formData;
    try {
      // looking for user in DB
      const user = await User.findBy("id", formData.uzaid);

      // updating user data
      user.is_adult = formData.is_adult;
      user.is_cgu = formData.is_cgu;
      user.is_news = formData.is_news;

      // saving updated information
      await user.save();
      await auth.loginViaId(user.id);

      return response.route("user-home", {
        // return view.render("user.user_home", {
        totalCoupons: 0,
        activeCoupons: 0,
        inactiveCoupons: 0,
      });
    } catch (error) {
      console.log(error);
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, Nous ne pouvons pas vous connecter.`,
        },
      });

      return response.redirect("back");
    }
  }
}

module.exports = SocialAuthController;
