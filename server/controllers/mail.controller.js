import Joi from "joi";
import { OTPVerification, User } from "../models/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import emailVerificationTemplate from "../emailTemplates/emailVerification.js";
import resetPasswordTemplate from "../emailTemplates/resetPassword.js";
import { CLIENT_DEV_API, CLIENT_PROD_API, MODE } from "../config/index.js";
import { generateRandomString } from "../utils/index.js";

export const mailController = {
  // Email verification
  async sendEmailVerificationOtp(req, res, next) {
    try {
      const { _id, email } = req.user;

      // delete all previous otps
      await OTPVerification.deleteMany({
        userId: _id,
        type: "email-verification",
      });

      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      const hashedOtp = await bcrypt.hash(otp, 10);

      await transporter.sendMail({
        from: '"hashtech #️⃣" <hashmatw555@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Email verification code: ${otp}`, // Subject line
        html: emailVerificationTemplate(email, otp),
      });

      await OTPVerification.create({
        userId: _id,
        otp: hashedOtp,
        type: "email-verification",
        expiresIn: Date.now() + 3600000, //1hr
      });

      return res.status(201).json({
        success: true,
        message: "OTP sent successfully. Please check your mail",
      });
    } catch (err) {
      return next(err);
    }
  },

  async verifyEmailVerificationOtp(req, res, next) {
    try {
      // validation
      const { _id: userId } = req?.user;
      const { otp } = req.body;
      const validationSchema = Joi.object({
        otp: Joi.string().min(4).max(4).required(),
      });

      const { error } = validationSchema.validate({ otp });
      if (error) {
        return next(error);
      }

      // check database
      const user = await User.findById(userId);
      if (user?.verified) {
        return next(CustomErrorHandler.alreadyExist("User already verified"));
      }

      const otpVerificationRecord = await OTPVerification.findOne({
        userId,
        type: "email-verification",
        expiresIn: { $gt: Date.now() },
      });
      if (!otpVerificationRecord) {
        return next(
          CustomErrorHandler.invalidCredentials(
            "Invalid OTP or OTP has expired."
          )
        );
      }
      // const { expiresAt } = otpVerificationRecord;
      const { otp: hashedOtp } = otpVerificationRecord;

      // // if expired
      // if (expiresAt < Date.now()) {
      //   await OTPVerification.deleteMany({ userId });
      //   return next(
      //     CustomErrorHandler.invalidCredentials(
      //       "Otp expired. Please request new one"
      //     )
      //   );
      // }

      const match = await bcrypt.compare(otp, hashedOtp);
      if (!match) {
        return next(
          CustomErrorHandler.invalidCredentials("Invalid OTP. Please try again")
        );
      }

      await User.findByIdAndUpdate(userId, { verified: true });

      // delete all  otps
      await OTPVerification.deleteMany({
        userId,
        type: "email-verification",
      });

      return res.status(200).json({
        Success: true,
        message: "Email verified successfully..!",
      });
    } catch (err) {
      next(err);
    }
  },

  // ResetPassword

  // async sendResetPasswordOtp(req, res, next) {
  //   const { email } = req.body;

  //   // validation
  //   const schema = Joi.object({
  //     email: Joi.string().email().required(),
  //   });

  //   const { error } = schema.validate({ email });

  //   if (error) {
  //     return next(error);
  //   }
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return next(CustomErrorHandler.invalidCredentials("Invalid Email"));
  //     }

  //     // delete all previous otps
  //     await OTPVerification.deleteMany({
  //       userId: user._id,
  //       type: "reset-password",
  //     });
  //     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  //     const hashedOtp = await bcrypt.hash(otp, 10);
  //     await OTPVerification.create({
  //       userId: user._id,
  //       otp: hashedOtp,
  //       type: "reset-password",
  //       createdAt: Date.now(),
  //       expiresAt: Date.now() + 3600000, //1hr
  //     });

  //     await transporter.sendMail({
  //       from: '"hashtech #️⃣" <hashmatw555@gmail.com>', // sender address
  //       to: email, // list of receivers
  //       subject: `Reset Password code: ${otp}`, // Subject line
  //       html: resetPasswordTemplate(email, user.firstName, otp),
  //     });

  //     return res.status(201).json({
  //       success: true,
  //       message: "Otp sent successfully. Please check your mail",
  //     });
  //   } catch (err) {
  //     return next(err);
  //   }
  // },

  // async verifyResetPasswordOtp(req, res, next) {
  //   try {
  //     // validation
  //     const { otp, email } = req.body;
  //     const validationSchema = Joi.object({
  //       email: Joi.string().required(),
  //       otp: Joi.string().min(4).max(4).required(),
  //     });

  //     const { error } = validationSchema.validate({ otp, email });
  //     if (error) {
  //       return next(error);
  //     }

  //     // check database
  //     const user = await User.findOne({ email });
  //     const { _id: userId } = user;

  //     const otpVerificationRecord = await OTPVerification.findOne({
  //       userId,
  //       type: "reset-password",
  //     });
  //     if (!otpVerificationRecord) {
  //       return next(
  //         CustomErrorHandler.invalidCredentials("Invalid otp. Please try again")
  //       );
  //     }
  //     const { expiresAt } = otpVerificationRecord;
  //     const { otp: hashedOtp } = otpVerificationRecord;

  //     // if expired
  //     if (expiresAt < Date.now()) {
  //       await OTPVerification.deleteMany({ userId });
  //       return next(
  //         CustomErrorHandler.invalidCredentials(
  //           "Otp expired. Please request new one"
  //         )
  //       );
  //     }

  //     const match = await bcrypt.compare(otp, hashedOtp);
  //     if (!match) {
  //       return next(
  //         CustomErrorHandler.invalidCredentials("Invalid otp. Please try again")
  //       );
  //     }

  //     // delete all  otps
  //     await OTPVerification.deleteMany({
  //       userId,
  //       type: "reset-password",
  //     });

  //     return res.status(200).json({
  //       Success: true,
  //       message: "Otp matched",
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  async sendResetPasswordLink(req, res, next) {
    const { email } = req.body;

    // validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate({ email });

    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(
          CustomErrorHandler.invalidCredentials("This email doesn't exist")
        );
      }
      const token = generateRandomString(16);

      const resetToken = {
        token,
        expiresIn: Date.now() + 3600000, //1hr
      };

      await transporter.sendMail({
        from: '"hashtech #️⃣" <hashmatw555@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Change password for OpenAI",
        html: resetPasswordTemplate(email, user.firstName, token),
      });

      await User.findByIdAndUpdate(user?._id, { resetToken }, { new: true });

      return res.status(201).json({
        success: true,
        message: "Please check your mail",
        // token,
      });
    } catch (err) {
      return next(err);
    }
  },

  async verifyResetPasswordLink(req, res, next) {
    try {
      // validation
      const { token } = req.params;
      res.redirect(
        `${
          MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API
        }/new-password?ticket=${token}`
      );
    } catch (err) {
      return next(err);
    }
  },

  async verifyTicket(req, res, next) {
    try {
      // validation
      const { ticket } = req.params;
      const validationSchema = Joi.object({
        ticket: Joi.string().required(),
      });

      const { error } = validationSchema.validate({ ticket });
      if (error) {
        return next(error);
      }

      // check database

      const user = await User.findOne({
        "resetToken.token": ticket,
        "resetToken.expiresIn": { $gt: Date.now() },
      });

      if (!user) {
        return next(
          CustomErrorHandler.invalidCredentials(
            "Invalid reset link or link has expired."
          )
        );
      }

      return res
        .status(200)
        .cookie("reset_token", ticket, {
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        .json({ success: true, message: "valid ticket" });
    } catch (err) {
      return next(err);
    }
  },
};
