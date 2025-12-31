const userRoles = {
  manager: [],
  collaborator: [],
};

const adminUserRoles = {
  devOps: [
    "getUsers",
    "getProfiles",
    "getAdminUsers",
    "updateAdminUser",
    "updateAdminUserRole",
    "removeAdminUser",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  administrator: [
    "getUsers",
    "getProfiles",
    "getAdminUsers",
    "updateAdminUser",
    "updateAdminUserRole",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  operations: [
    "getUsers",
    "getProfiles",
    "getAdminUsers",
    "updateAdminUser",
    "updateAdminUserRole",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  storeManager: ["getUsers", "getAdminUsers"],
  marketingAndSales: ["getUsers", "getAdminUsers"],
  accountant: ["getUsers", "getAdminUsers"],
  driver: ["getUsers", "getAdminUsers"],
};

const allRoles = {
  ...userRoles,
  ...adminUserRoles,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const userRoleOptions = Object.keys(userRoles);
const adminUserRoleOptions = Object.keys(adminUserRoles);

export default {
  userRoles,
  adminUserRoles,
  roles,
  roleRights,
  userRoleOptions,
  adminUserRoleOptions,
};
