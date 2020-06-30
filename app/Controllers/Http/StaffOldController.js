"use strict";
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");

class StaffOldController {
  //Add user coupon
  /*couponActivate({ response }) {
    return response.send("activate coupon ...");
  }*/

  //Add user coupon
  async findCoupons({ response, request, session }) {
    const formData = request.only(["coupon_name", "email", "telephone"]);
    // return formData;

    try {
      if (
        formData.coupon_name !== null ||
        formData.email !== null ||
        formData.telephone !== null
      ) {
        if (
          formData.coupon_name !== null &&
          formData.email === null &&
          formData.telephone === null
        ) {
          const coupon = await Coupon.findBy(
            "coupon_name",
            formData.coupon_name
          );
          if (
            coupon !== null &&
            coupon.status === 0 &&
            coupon.user_id !== null
          ) {
            return view.render("user.user_tickets", {
              coupons: coupons.toJSON(),
            });
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name === null &&
          formData.email !== null &&
          formData.telephone === null
        ) {
          const user = await User.findBy("email", formData.email);
          if (user !== null) {
            const coupon = await Coupon.findBy("user_id", user.id);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name !== null &&
          formData.email !== null &&
          formData.telephone !== null
        ) {
          // const user = await User.findBy("email", formData.email);

          const user = await User.query()
            .where("email", formData.email)
            .where("telephone", formData.telephone);

          if (user !== null) {
            const coupon = await Coupon.findBy("user_id", user.id);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name === null &&
          formData.email === null &&
          formData.telephone !== null
        ) {
          const user = await User.query().where(
            "telephone",
            formData.telephone
          );

          if (user !== null) {
            const coupon = await Coupon.findBy("user_id", user.id);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name !== null &&
          formData.email === null &&
          formData.telephone !== null
        ) {
          const user = await User.query().where(
            "telephone",
            formData.telephone
          );

          if (user !== null) {
            const coupon = await Coupon.findBy("user_id", user.id);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name === null &&
          formData.email !== null &&
          formData.telephone === null
        ) {
          const user = await User.findBy("email", formData.email);

          if (user !== null) {
            const coupon = await Coupon.findBy("user_id", user.id);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        if (
          formData.coupon_name !== null &&
          formData.email !== null &&
          formData.telephone === null
        ) {
          const user = await User.findBy("email", formData.email);

          if (user !== null) {
            const coupon = await User.query()
              .where("user_id", user.id)
              .where("coupon_name", formData.coupon_name);

            if (
              coupon !== null &&
              coupon.status === 0 &&
              coupon.user_id !== null
            ) {
              return coupon;
            }

            session.flash({
              notification: {
                type: "danger",
                message: `Woah, nous ne pouvons pas trouver le ticket avec vos information.`,
              },
            });
            return response.redirect("back");
          }
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'ai pas inscrit.`,
            },
          });
          return response.redirect("back");
        }
        session.flash({
          notification: {
            type: "danger",
            message: `Désolé, nous ne pouvons pas vous traiter votre demande.`,
          },
        });
        return response.redirect("back");
      }
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, erreur de traitement de la demande sur le serveur.`,
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
}

module.exports = StaffOldController;
