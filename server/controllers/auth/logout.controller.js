import redis from "../../config/redis.js";

const logoutController = {
  async logout(req, res, next) {
    try {
      const { access_token, refresh_token } = req.cookies;
      await redis.rpush("blacklist", access_token);
      if (refresh_token) {
        await redis.rpush("blacklist", refresh_token);
      }

      // res.status(200).clearCookie('token', token, {
      //   expires: new Date(Date.now() + 604800000),
      //   secure: env.ENVIRONMENT === 'LIVE',
      //   sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
      //   httpOnly: true
      // }).send(user)
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.json({ sucess: true, message: "Logged Out" });
    } catch (err) {
      return next(err);
    }
  },
};

export default logoutController;
