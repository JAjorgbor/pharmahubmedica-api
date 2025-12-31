import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "@/config/config.js";
import tokenTypes from "@/config/tokens.js";
import AdminUser from "@/models/admin.user.model.js";
import type { JwtPayload } from "jsonwebtoken";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: JwtPayload, done: any) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const adminUser = await AdminUser.findById(payload.sub);
    if (adminUser) {
      return done(null, adminUser);
    }

    done(null, false);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
