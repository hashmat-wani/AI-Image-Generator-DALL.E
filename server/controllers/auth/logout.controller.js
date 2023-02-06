import redis from "../../config/redis.js";

const logoutController = {
  async logout(req, res, next) {
    try {
      await redis.rpush("blacklist", req.user.access_token);
      const refresh_token = req?.cookies?.refresh_token?.split(" ")[1];
      if (refresh_token) {
        await redis.rpush("blacklist", refresh_token);
      }

      return res
        .status(200)
        .clearCookie("access_token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({ sucess: true, message: "Logged Out" });
    } catch (err) {
      return next(err);
    }
  },
};

export default logoutController;
