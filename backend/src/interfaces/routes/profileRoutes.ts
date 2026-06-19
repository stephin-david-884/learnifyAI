import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { verifyCsrf } from "../middlewares/csrfVerify";
import { profileController } from "../../infrastructure/di/profile.container";
import { validate } from "../middlewares/validate";
import { updateProfileSchema } from "../validators/profile/profile.validator";
import { changePasswordSchema } from "../validators/profile/password.validator";

const router = express.Router();

router.get(ROUTES.PROFILE.GET_PROFILE,
    authMiddleware(tokenService),
    verifyCsrf,
    profileController.getProfile
);

router.patch(ROUTES.PROFILE.UPDATE_PROFILE,
    authMiddleware(tokenService),
    verifyCsrf,
    validate(updateProfileSchema, "body"),
    profileController.updateProfile
);

router.patch(ROUTES.PROFILE.CHANGE_PASSWORD,
    authMiddleware(tokenService),
    verifyCsrf,
    validate(changePasswordSchema, "body"),
    profileController.changePassword
);

export default router;