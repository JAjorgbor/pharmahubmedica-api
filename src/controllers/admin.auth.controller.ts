import config from "@/config/config.js";
import adminAuthService from "@/service/admin.auth.service.js";
import adminUserService from "@/service/admin.user.service.js";
import tokenService from "@/service/token.service.js";
import catchAsync from "@/validation/catch-async.js";
import type { Request, Response } from "express";
import httpStatus from "http-status";

const createAccountWithCredentials = catchAsync(
  async (req: Request, res: Response) => {
    const user = await adminUserService.createAdminUser(req.body);

    const tokens = await tokenService.generateAuthTokens(
      user,
      "Admin_User",
      true
    );
    res.cookie("refreshToken", tokens.refresh?.token!, {
      httpOnly: true,
      secure: config.env === "production", // only in production
      sameSite: "strict",
    });

    res.status(httpStatus.CREATED).json({
      user,
      accessToken: tokens.access.token,
    });
  }
);
const loginWithCredentials = catchAsync(async (req: Request, res: Response) => {
  const user = await adminAuthService.loginWithCredentials(
    req.body.email,
    req.body.password
  );

  const tokens = await tokenService.generateAuthTokens(
    user,
    "Admin_User",
    true
  );
  res.cookie("refreshToken", tokens.refresh?.token!, {
    httpOnly: true,
    secure: config.env === "production", // only in production
    sameSite: "strict",
  });

  res.status(httpStatus.CREATED).json({
    user,
    accessToken: tokens.access.token,
  });
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await adminAuthService.refreshAuth(req.cookies.refreshToken);
  res.send({ accessToken: tokens.access.token });
});

export default {
  createAccountWithCredentials,
  refreshTokens,
  loginWithCredentials,
};
