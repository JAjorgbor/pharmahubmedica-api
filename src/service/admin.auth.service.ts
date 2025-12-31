import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";
import AdminUserService from "./admin.user.service.js";
import type { AdminUserDoc } from "@/models/admin.user.model.js";
import tokenTypes from "@/config/tokens.js";
import tokenService from "@/service/token.service.js";

const loginWithCredentials = async (email: string, password: string) => {
  const user = await AdminUserService.getAdminUser({ email });
  if (!user || !(await (user as any).isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH,
      "Admin_User"
    );
    const user = await AdminUserService.getAdminUser(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    // await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user, "Admin_User");
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  loginWithCredentials,
  refreshAuth,
};
