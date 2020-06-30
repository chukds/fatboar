"use strict";
const Event = use("Event");
const User = use("App/Models/User");
const Token = use("App/Models/Token");
const Encryption = use("Encryption");

class PasswordResetController {
  // Show reset password page
  showPasswordReset({ view, params }) {
    return view.render("password.reset", { token: params.token });
  }
  // Send reset password link
  async sendLinkReset({ request, session, response }) {
    const formData = request.input("email");
    // return formData;

    try {
      const user = await User.findBy("email", formData);

      if (user !== null && user.provider === null) {
        // console.log(user);
        //return user;
        const randomString = [...Array(16)]
          .map(i => (~~(Math.random() * 36)).toString(36))
          .join("");

        await Token.query()
          .where("user_id", user.id)
          .where("type", "password")
          .delete();

        const token = new Token();
        token.token = Encryption.encrypt(randomString);
        token.type = "password";

        await user.tokens().save(token);

        Event.fire("forgot::password", {
          user: user.toJSON(),
          token: token.token,
          member: user
        });

        session.flash({
          notification: {
            type: "success",
            message:
              "Vérifier votre adresse e-mail pour le lien de réinitialisation."
          }
        });

        return response.redirect("back");
      }
      session.flash({
        notification: {
          type: "danger",
          message: `Désolé, Nous ne pouvons pas vous indentifiez.`
        }
      });

      return response.redirect("back");
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: "Désolé, l'utilisateur n'existe pas."
        }
      });

      return response.redirect("back");
    }
  }

  // Reset password
  async sendPasswordConfirmation({ request, session, response }) {
    const formData = request.all();
    // return formData;

    try {
      const token = await Token.query()
        .where("token", decodeURIComponent(request.input("token")))
        .where("type", "password")
        .first();

      const user = await User.find(token.user_id);

      user.password = request.input("password");
      await user.save();

      await token.delete();

      Event.fire("password::reset", { user: user.toJSON(), member: user });

      session.flash({
        notification: {
          type: "success",
          message: "Votre mot de passe est réinitialisé !"
        }
      });

      return response.redirect("/login");
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: "Désolé, jeton de réinitialisation est invalide."
        }
      });

      return response.redirect("back");
    }
  }
}

module.exports = PasswordResetController;
