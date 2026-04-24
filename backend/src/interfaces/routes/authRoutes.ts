import express from 'express';
import { authController } from '../../infrastructure/di/container';
import { ROUTES } from '../../shared/constants/routes';
import { validate } from '../middlewares/validate';
import { otpSchema, registerSchema, resendOtpSchema } from '../validators/auth/registerValidator';


const router = express.Router();

router.post(ROUTES.AUTH.REGISTER, validate(registerSchema, 'body'), authController.register);
router.post(ROUTES.AUTH.VERIFY_OTP, validate(otpSchema, 'body'), authController.verifyOtp);
router.post(ROUTES.AUTH.RESEND_OTP, validate(resendOtpSchema, 'body'), authController.resendOtp);
router.post(ROUTES.AUTH.REFRESH_TOKEN, authController.refreshToken);
router.get(ROUTES.AUTH.GET_ME, authController.getCurrentUser);
router.post(ROUTES.AUTH.LOG_OUT, authController.logout);  

export default router;