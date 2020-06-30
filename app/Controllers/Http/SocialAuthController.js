"use strict";
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");

class SocialAuthController {
  // Redirect to Social Login Provider
  async redirectToProvider({ ally, params }) {
    await ally.driver(params.provider).redirect();
  }

  // Social Login Provider succesful response
  async handleProviderCallback({ params, ally, auth, response }) {
    const provider = params.provider;
    try {
      const userData = await ally.driver(params.provider).getUser();

      const authUser = await User.query()
        .where({
          provider: provider,
          provider_id: userData.getId()
        })
        .first();

      // if (!(authUser === null)) {
      if (authUser !== null) {
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
          inactiveCoupons: inactiveCoupons[0].total
        });
      }
      const user = new User();
      user.username = userData.getName();
      user.email = userData.getEmail();
      user.provider_id = userData.getId();
      user.provider = provider;

      await user.save();
      await auth.loginViaId(user.id);

      return response.route("user-home", {
        totalCoupons: 0,
        activeCoupons: 0,
        inactiveCoupons: 0
      });
    } catch (e) {
      response.redirect("/auth/" + provider);
    }
  }
}

module.exports = SocialAuthController;
