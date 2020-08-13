"use strict";
const Env = use("Env");
const User = use("App/Models/User");
const Coupon = use("App/Models/Coupon");
const { Parser } = require("json2csv");

class AdminController {
  // Show admin home
  async showAdminHome({ view }) {
    // return totalUsers;
    const totalUsers = await User.query().where("role", "member").getCount();
    // return totalUsers;

    const totalParticipants = await Coupon.query()
      .whereNotNull("user_id")
      .getCount();
    // return totalParticipants;

    const totalPrizes = await Coupon.query().where("status", 1).getCount();
    // return totalPrizes;

    return view.render("admin.admin_home", {
      totalUsers: totalUsers,
      totalPrizes: totalPrizes,
      totalParticipants: totalParticipants,
    });
  }
  // Show admin stats
  async showAdminStats({ response, request, session, view }) {
    // return totalUsers;
    const totalUsers = await User.query().where("role", "member").getCount();

    const totalParticipants = await Coupon.query()
      .whereNotNull("user_id")
      .getCount();

    // const prizes = await Coupon.query().where("status", 1).getCount();
    const totalPrizes = await Coupon.query().where("status", 1).getCount();
    // const totalPrizes = (prizes===0)?0:prizes;
    // console.log(typeof prizes);
    // return prizes;
    // return totalPrizes;
    const totalStarter = await Coupon.query().where("prize_id", 1).getCount();
    const totalBurger = await Coupon.query().where("prize_id", 2).getCount();
    const totalMenu = await Coupon.query().where("prize_id", 3).getCount();
    const totalChoice = await Coupon.query().where("prize_id", 4).getCount();
    const totalDiscount = await Coupon.query().where("prize_id", 5).getCount();

    return view.render("admin.admin_stats", {
      totalUsers: totalUsers,
      totalPrizes: totalPrizes,
      totalMenu: totalMenu,
      totalBurger: totalBurger,
      totalChoice: totalChoice,
      totalStarter: totalStarter,
      totalDiscount: totalDiscount,
      totalParticipants: totalParticipants,
    });
  }

  // Download user information
  async exportUsers({ response, session }) {
    var fields = [
      "firstname",
      "lastname",
      "username",
      "email",
      "telephone",
      "is_adult",
      "is_cgu",
      "is_news",
    ];
    var opts = { fields };
    try {
      const users = await User.query()
        .select("firstname", "lastname", "username", "email", "telephone")
        .where("role", "member")
        .fetch();

      if (users) {
        const json2csvParser = new Parser(opts);
        const csvString = json2csvParser.parse(users.toJSON());
        response.header("Content-type", "text/csv");
        response.header(
          "Content-Disposition",
          'attachment; filename="users.csv"'
        );
        return response.send(csvString);
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, il n'y a pas des utilisateurs.`,
        },
      });
    } catch (e) {
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, nous ne pouvons pas traiter votre demande.`,
        },
      });
    }
  }
  // Find user participation
  async userParticipation({ response, request, session, view }) {
    const formData = request.only(["coupon_name", "email", "telephone"]);
    // return formData;
    if (formData.coupon_name || formData.email) {
      if (formData.coupon_name && formData.email === null) {
        try {
          const coupon = await Coupon.query()
            .where("coupon_name", formData.coupon_name)
            .fetch();
          const daCoupon = coupon.toJSON();

          const user = await User.findBy("id", daCoupon[0].user_id);
          if (user && daCoupon) {
            return view.render("admin.admin_tickets", {
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
          // console.log(e);
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'as pas ajouter le ticket.`,
            },
          });

          return response.redirect("back");
        }
      }
      if (formData.coupon_name === null && formData.email) {
        try {
          const user = await User.findBy("email", formData.email);
          const coupon = await Coupon.query().where("user_id", user.id).fetch();
          const daCoupon = coupon.toJSON();

          if (user && daCoupon) {
            return view.render("admin.admin_tickets", {
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
              message: `Woah, l'utilisateur n'as pas ajouter le ticket.`,
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

            .fetch();
          const daCoupon = coupon.toJSON();

          if (user && daCoupon) {
            return view.render("admin.admin_tickets", {
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
          // console.log(e);
          session.flash({
            notification: {
              type: "danger",
              message: `Woah, l'utilisateur n'as pas ajouter le ticket.`,
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

  // Find champion
  async findChamp({ response, session, view }) {
    // return response.send("You are in.");
    const dbCon = Env.get("DB_CONNECTION");
    let { champ, findCoupon } = "";
    try {
      findCoupon = await Coupon.findBy("is_car", 1);
      if (dbCon === "sqlite" && findCoupon /*!== null*/) {
        champ = await User.findBy("id", findCoupon.user_id);

        if (champ) {
          return view.render("admin.admin_champ", {
            champ: champ,
            coupon: findCoupon,
          });
        }
        session.flash({
          notification: {
            type: "danger",
            message: `Woah, nous ne pouvons pas trouver le gagnant.`,
          },
        });

        return response.redirect("back");
      } else if (findCoupon) {
        champ = await User.findBy("id", findCoupon.user_id);

        if (champ) {
          return view.render("admin.admin_champ", {
            champ: champ,
            coupon: findCoupon,
          });
        }
        session.flash({
          notification: {
            type: "danger",
            message: `Woah, nous ne pouvons pas trouver le gagnant.`,
          },
        });

        return response.redirect("back");
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, la compétition est toujours en cours.`,
        },
      });
      return response.redirect("back");
    } catch (e) {
      console.log(e);
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, nous ne pouvons pas traiter votre demande.`,
        },
      });

      return response.redirect("back");
    }
  }
  // Generate champion
  async makeChamp({ response, session, view }) {
    // return response.send("You are in.");
    const dbCon = Env.get("DB_CONNECTION");
    let { champ, daCoupon, endGame, findCoupon, isEnd, updateCoupon } = "";
    try {
      isEnd = await Coupon.query()
        .where("status", 0)
        .where("is_end", 0)
        .fetch();
      if (dbCon === "sqlite" && isEnd) {
        // return isEnd;
        findCoupon = await Coupon.query()
          .where("status", 0)
          .whereNotNull("user_id")
          .orderByRaw("RANDOM()")
          .limit(1)
          .fetch();
        daCoupon = findCoupon.toJSON();
        updateCoupon = await Coupon.findBy(
          "coupon_name",
          daCoupon[0].coupon_name
        );

        updateCoupon.is_car = 1;
        await updateCoupon.save();
        // return updateCoupon;

        champ = await User.findBy("id", daCoupon[0].user_id);
        endGame = await Coupon.query()
          .where("is_end", 0)
          .update({ is_end: "1" });

        if (champ && endGame) {
          return view.render("admin.admin_champ", {
            champ: champ,
            coupon: daCoupon[0],
          });
        }
        session.flash({
          notification: {
            type: "danger",
            message: `Woah, la compétition est clos.`,
          },
        });

        return response.redirect("back");
      } else if (isEnd) {
        findCoupon = await Coupon.query()
          .where("status", 0)
          .whereNotNull("user_id")
          .orderByRaw("RAND()")
          .limit(1)
          .fetch();
        daCoupon = findCoupon.toJSON();
        updateCoupon = await Coupon.findBy(
          "coupon_name",
          daCoupon[0].coupon_name
        );

        updateCoupon.is_car = 1;
        await updateCoupon.save();
        // return updateCoupon;

        champ = await User.findBy("id", daCoupon[0].user_id);
        endGame = await Coupon.query()
          .where("is_end", 0)
          .update({ is_end: "1" });

        if (champ && endGame) {
          return view.render("admin.admin_champ", {
            champ: champ,
            coupon: daCoupon[0],
          });
        }
        session.flash({
          notification: {
            type: "danger",
            message: `Woah, la compétition est clos.`,
          },
        });

        return response.redirect("back");
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, nous ne pouvons pas trouver le gagnant.`,
        },
      });
      return response.redirect("back");
    } catch (e) {
      console.log(e);
      session.flash({
        notification: {
          type: "danger",
          message: `Woah, nous ne pouvons pas traiter votre demande.`,
        },
      });

      return response.redirect("back");
    }
  }
}

module.exports = AdminController;
