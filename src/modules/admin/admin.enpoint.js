import { roles } from "../../db/models/user.model.js";

export const endpoints = {
    adminDashBoard: [roles.ADMIN, roles.SUPER_ADMIN, roles.OWNER]
}