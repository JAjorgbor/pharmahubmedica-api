const userRoles = {
  manager: [],
  collaborator: [],
};

const adminUserRoles = {
  devOps: [
    "getUsers",
    "getAdminUsers",
    "getInventory",
    "updateInventory",
    "updateAdminUser",
    "updateAdminUserRole",
    "removeAdminUser",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  administrator: [
    "getUsers",
    "getInventory",
    "updateInventory",
    "getAdminUsers",
    "updateAdminUser",
    "updateAdminUserRole",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  operations: [
    "getUsers",
    "getAdminUsers",
    "getInventory",
    "updateInventory",
    "updateAdminUser",
    "updateAdminUserRole",
    "AdminUserInvite",
    "updateAdminSettings",
    "adminUpdateStatus",
  ],
  storeManager: [
    "getUsers",
    "getAdminUsers",
    "getInventory",
    "updateInventory",
  ],
  marketingAndSales: [
    "getUsers",
    "getAdminUsers",
    "getInventory",
    "updateInventory",
  ],
  accountant: ["getUsers", "getAdminUsers", "getInventory"],
  driver: ["getUsers", "getAdminUsers", "getInventory"],
} as const;

const allRoles = {
  ...userRoles,
  ...adminUserRoles,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const userRoleOptions = Object.keys(userRoles);
const adminUserRoleOptions = Object.keys(adminUserRoles);

const userPermissions = [...new Set(Object.values(userRoles).flat())];

export type AdminUserPermissions =
  (typeof adminUserRoles)[keyof typeof adminUserRoles][number];
export type UserPermissions =
  (typeof userRoles)[keyof typeof userRoles][number];

export default {
  userRoles,
  adminUserRoles,
  roles,
  roleRights,
  userRoleOptions,
  adminUserRoleOptions,
};
