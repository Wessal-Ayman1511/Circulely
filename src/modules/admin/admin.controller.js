import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.js";
import { roles } from "../../db/models/user.model.js";
import { asyncHandler } from "../../utils/index.js";
import * as adminServices from "./admin.service.js";
import * as adminValidations from "./admin.validation.js";
import { endpoints } from "./admin.enpoint.js";
import { isValid } from "../../middlewares/validation.middleware.js";

const router = Router();
router.use(isAuthenticated, isAuthorized(...endpoints.adminDashBoard));

router.get(
  "/",
  asyncHandler(adminServices.getAllData),
);
router.patch(
    "/role",
    isValid(adminValidations.updateRole),
    asyncHandler(adminServices.updateRole)
)

export default router;
