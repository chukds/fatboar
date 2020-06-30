"use strict";
const Mail = use("Mail");
const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("PasswordResetController");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("send password reset link", async ({ assert, client }) => {
  Mail.fake();
  const user = await Factory.model("App/Models/User").create();

  await client.post("password/email").send({ email: user.email }).end();
  const mail = Mail.pullRecent();

  // console.log(mail);
  assert.equal(mail.message.to[0].address, user.email);
  assert.equal(mail.message.subject, "Réinitialisation de mot de passe");

  Mail.restore();
});
