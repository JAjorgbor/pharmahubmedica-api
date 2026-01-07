import tokenTypes from "@/config/tokens.js";
import tokenService from "@/services/token.service.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";
import PortalUserService from "./portal.user.service.js";

const loginWithCredentials = async (email: string, password: string) => {
  const user = await PortalUserService.getPortalUser({ email });
  if (!user || !(await (user as any).isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  if (user.status !== "active") {
    throw new ApiError(httpStatus.FORBIDDEN, "Your account is not active");
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
      "Portal_User"
    );
    const user = await PortalUserService.getPortalUser({
      _id: String(refreshTokenDoc.user),
    });
    if (!user) {
      throw new Error();
    }
    return tokenService.generateAuthTokens(user, "Portal_User", false);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await tokenService.verifyToken(
    refreshToken,
    tokenTypes.REFRESH,
    "Portal_User"
  );
  await refreshTokenDoc.deleteOne();
};

export default {
  loginWithCredentials,
  refreshAuth,
  logout,
};
