import redis from "../../config/redis.js";

const logoutController = {
  async logout(req, res, next) {
    try {
      const { access_token, refresh_token } = req.cookies;
      await redis.rpush("blacklist", access_token);
      if (refresh_token) {
        await redis.rpush("blacklist", refresh_token);
      }
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.json({ sucess: true, message: "Logged Out" });
    } catch (err) {
      return next(err);
    }
  },
};

export default logoutController;
