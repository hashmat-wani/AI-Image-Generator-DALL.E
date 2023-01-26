import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(payload, expiry = "1d", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
