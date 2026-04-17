import express from 'express';
import { authController } from '../../infrastructure/di/container';
import { ROUTES } from '../../shared/constants/routes';

const router = express.Router();

router.post(ROUTES.AUTH.REGISTER, authController.register);
router.post(ROUTES.AUTH.VERIFY_OTP, authController.VerifyOtp);
router.post(ROUTES.AUTH.RESEND_OTP, authController.resendOtp);
router.post(ROUTES.AUTH.REFRESH_TOKEN, authController.refreshToken);
router.get(ROUTES.AUTH.GET_ME, authController.getCurrentUser);

export default router;