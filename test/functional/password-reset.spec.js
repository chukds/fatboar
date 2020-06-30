"use strict";
const Mail = use("Mail");
const Factory = use("Factory");
const Token = use("App/Models/Token");
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

test("resets password with correct token", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();
  const token = await new Token();

  const response = await client
    .post("password/reset")
    .send({ email: user.email, token, password: "new password" })
    .end();
  await user.reload();

  // console.log(response);
  response.assertStatus(200);
  // todo confirm password is equal to input
  // response.assertJSON({ message: "Password reset successful." });
  // assert.isTrue(await user.verify("new password"));
});
