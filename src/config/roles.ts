const portalUserRoles = {
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
    "adminUserInvite",
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
    "adminUserInvite",
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
    "adminUserInvite",
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
  ...portalUserRoles,
  ...adminUserRoles,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const userRoleOptions = Object.keys(portalUserRoles);
const adminUserRoleOptions = Object.keys(adminUserRoles);

const userPermissions = [...new Set(Object.values(portalUserRoles).flat())];

export type AdminUserPermissions =
  (typeof adminUserRoles)[keyof typeof adminUserRoles][number];
export type UserPermissions =
  (typeof portalUserRoles)[keyof typeof portalUserRoles][number];

export default {
  userRoles: portalUserRoles,
  adminUserRoles,
  roles,
  roleRights,
  userRoleOptions,
  adminUserRoleOptions,
};
