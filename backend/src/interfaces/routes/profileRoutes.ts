import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { verifyCsrf } from "../middlewares/csrfVerify";
import { profileController } from "../../infrastructure/di/profile.container";

const router = express.Router();

router.get(ROUTES.PROFILE.GET_PROFILE,
    authMiddleware(tokenService),
    verifyCsrf,
    profileController.getProfile
);

export default router;