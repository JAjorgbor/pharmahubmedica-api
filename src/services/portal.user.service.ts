import PortalUser, {
  type PortalUserDoc,
  type PortalUserType,
} from "@/models/portal.user.model.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";

const getPortalUser = async (
  filterParams: Partial<PortalUserType & { _id: string }>
) => {
  return await PortalUser.findOne(filterParams);
};

const createPortalUser = async (userBody: any) => {
  if (await (PortalUser as any).isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  // create security object
  const security = {
    password: userBody.password,
  };
  userBody.security = security;

  return await PortalUser.create(userBody);
};

const updatePortalUser = async (userId: any, updateBody: any) => {
  const user = await getPortalUser({ _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Portal user not found");
  }
  if (
    updateBody.email &&
    (await (PortalUser as any).isEmailTaken(updateBody.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

export default {
  createPortalUser,
  updatePortalUser,
  getPortalUser,
};
