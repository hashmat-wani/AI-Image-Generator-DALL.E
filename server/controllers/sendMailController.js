import nodemailer from "nodemailer";

export const sendMailController = {
  async sendMail(req, res) {
    console.log("coming");
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        // port: 587,
        port: 465,
        // secure: 465, // true for 465, false for other ports
        auth: {
          user: "hashmatw555@gmail.com",
          pass: "ostvwdckyoxwjqzm",
        },
      });

      let info = await transporter.sendMail({
        from: '"hashtech #️⃣" <hashmatw555@gmail.com>', // sender address
        to: "hashmatwani@icloud.com", // list of receivers
        subject: "Email verification code: 783219", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);

      return res.send(info);
    } catch (err) {
      console.log(err);
    }
  },
};

// ("use strict");
// const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// export async function sendMailController(req, res) {
//   console.log("coming");
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "itzel.harris72@ethereal.email",
//       pass: "FcMPrX33MjVZaBuCYb",
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   return res.send(info);
//   // Preview only available when sending through an Ethereal account
//   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// sendMailController().catch(console.error);
