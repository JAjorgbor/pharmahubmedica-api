import adminUserService from "@/services/admin.user.service.js";
import httpStatus from "http-status";
import ApiError from "@/utils/api-error.js";
import catchAsync from "@/utils/catch-async.js";
import type { Request, Response } from "express";

const getAdminUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminUser = await adminUserService.getAdminUser({ _id: id! });

  if (!adminUser)
    throw new ApiError(httpStatus.NOT_FOUND, "Admin user not found");
  res.status(200).json(adminUser);
});

const updateAdminUserPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const passwordUpdate = await adminUserService.updateAdminUserPassword(
      id,
      oldPassword,
      newPassword,
    );
    res.status(200).json(passwordUpdate);
  },
);

export default { getAdminUser, updateAdminUserPassword };
