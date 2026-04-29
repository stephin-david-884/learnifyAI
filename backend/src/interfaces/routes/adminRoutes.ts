import express from 'express';
import { ROUTES } from '../../shared/constants/routes';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validators/auth/loginValidator';
import { adminController } from '../../infrastructure/di/container';
import { verifyCsrf } from '../middlewares/csrfVerify';

const router = express.Router();

router.post(ROUTES.ADMIN.LOGIN, validate(loginSchema, 'body'), adminController.login);
router.post(ROUTES.ADMIN.REFRESH_TOKEN, adminController.refreshToken);
router.get(ROUTES.ADMIN.GET_ME, adminController.getCurrentAdmin);
router.post(ROUTES.ADMIN.LOG_OUT, verifyCsrf, adminController.logout)

export default router;