"use strict";
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");

class StaffController {
  async findCoupons({ response, request, session, view }) {
    const formData = request.only(["coupon_name", "email", "telephone"]);
    // return formData;
    if (formData.coupon_name || formData.email) {
      if (formData.coupon_name && formData.email === null) {
        try {
          const coupon = await Coupon.query()
            .where("coupon_name", formData.coupon_name)
            .where("status", 0)
            .fetch();
          const daCoupon = coupon.toJSON();

          const user = await User.findBy("id", daCoupon[0].user_id);
          if (daCoupon && user && daCoupon[0].is_end === 0) {
            return view.render("staff.staff_tickets", {
              coupons: daCoupon,
              user: user,
            });
          }

          session.flash({
            notification: {
              type: "danger",
              message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
            },
          });
          return response.redirect("back");
        } catch (e) {
          //console.log(e);
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, le ticket n'est pas disponible.`,
            },
          });

          return response.redirect("back");
        }
      }
      if (formData.coupon_name === null && formData.email) {
        try {
          const user = await User.findBy("email", formData.email);
          const coupon = await Coupon.query()
            .where("user_id", user.id)
            .where("status", 0)
            .fetch();
          const daCoupon = coupon.toJSON();

          if (user && daCoupon && daCoupon[0].is_end === 0) {
            // return user;
            // return coupon;
            return view.render("staff.staff_tickets", {
              coupons: daCoupon,
              user: user,
            });
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
            },
          });
          return response.redirect("back");
        } catch (e) {
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, le ticket n'est pas disponible.`,
            },
          });

          return response.redirect("back");
        }
      }
      if (formData.coupon_name && formData.email) {
        try {
          const user = await User.findBy("email", formData.email);
          const coupon = await Coupon.query()
            .where("user_id", user.id)
            .where("coupon_name", formData.coupon_name)
            .where("status", 0)
            .fetch();
          const daCoupon = coupon.toJSON();

          if (user && daCoupon && daCoupon[0].is_end === 0) {
            // return user;

            // return coupon;
            return view.render("staff.staff_tickets", {
              coupons: daCoupon,
              user: user,
            });
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
            },
          });
          return response.redirect("back");
        } catch (e) {
          console.log(e);
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, le ticket n'est pas disponible.`,
            },
          });

          return response.redirect("back");
        }
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, erreur de traitement de votre demande.`,
        },
      });
      return response.redirect("back");
    }
    // return response.send("Form is empty");
    session.flash({
      notification: {
        type: "danger",
        message: `Woah, veuillez remplire le formulaire.`,
      },
    });
    return response.redirect("back");
  }
  async couponActivate({ params, response, view, session }) {
    // console.log(params.id);
    // return response.send("I am clicked.");
    // const coupon = await Coupon.findBy("id", params.id);
    const coupon = await Coupon.findBy("id", params.id);
    // return coupon;
    if (coupon) {
    }

    try {
      // looking for user in DB
      const coupon = await Coupon.findBy("id", params.id);

      if (coupon && coupon.is_end === 0) {
        // updating user data
        coupon.status = 1;
        // saving updated information
        await coupon.save();
        session.flash({
          notification: {
            type: "success",
            message: `Le ticket est activé avec succes.`,
          },
        });
        return response.route("staff-home");
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, le ticket n'est pas activé.`,
        },
      });
      return response.redirect("back");
    } catch (error) {
      // console.log(error);
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, erreur de traitement de la demande.`,
        },
      });
      return response.redirect("back");
    }
  }
}

module.exports = StaffController;
