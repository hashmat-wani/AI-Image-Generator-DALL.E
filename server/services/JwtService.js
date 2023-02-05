import { JWT_ACCESS_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(payload, expiry = "6h", secret = JWT_ACCESS_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_ACCESS_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
