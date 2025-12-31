import AdminUser from "@/models/admin.user.model.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";

const getAdminUser = async (filterParams: any) => {
  return await AdminUser.findOne(filterParams);
};

const createAdminUser = async (userBody: any) => {
  if (await (AdminUser as any).isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  // create security object
  const security = {
    password: userBody.password,
  };
  userBody.security = security;

  return await AdminUser.create(userBody);
};

const updateAdminUser = async (userId: any, updateBody: any) => {
  const user = await getAdminUser({ _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "AdminUser not found");
  }
  if (
    updateBody.email &&
    (await (AdminUser as any).isEmailTaken(updateBody.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

export default {
  createAdminUser,
  updateAdminUser,
  getAdminUser,
};
