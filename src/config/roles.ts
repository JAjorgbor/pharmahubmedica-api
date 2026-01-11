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
    "getReferralPartners",
    "manageReferralPartners",
    "manageCustomers",
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
    "getReferralPartners",
    "manageReferralPartners",
    "manageCustomers",
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
    "getReferralPartners",
    "manageReferralPartners",
    "manageCustomers",
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

const referralPartnerProfessions = {
  doctor: "Dr",
  nurse: "Nurse",
  pharmacist: "Pharm",
  chemist: "Chem",
  "lab technician": "Lab Tech",
  other: "",
} as const;

const normalizedReferralPartnerProfessions = Object.keys(
  referralPartnerProfessions
);

const allRoles = {
  ...portalUserRoles,
  ...adminUserRoles,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const userRoleOptions = Object.keys(portalUserRoles);
const adminUserRoleOptions = Object.keys(adminUserRoles);

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
  referralPartnerProfessions,
  normalizedReferralPartnerProfessions,
};
