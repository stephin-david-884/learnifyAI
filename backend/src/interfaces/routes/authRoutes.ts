import express from 'express';
import { authController, tokenService } from '../../infrastructure/di/container';
import { ROUTES } from '../../shared/constants/routes';
import { validate } from '../middlewares/validate';
import { otpSchema, registerSchema, resendOtpSchema } from '../validators/auth/registerValidator';
import { forgotPasswordSchema, googleLoginSchema, loginSchema, resetPasswordSchema } from '../validators/auth/loginValidator';
import { authMiddleware } from '../middlewares/authMiddleware';
import { verifyCsrf } from '../middlewares/csrfVerify';


const router = express.Router();

router.post(ROUTES.AUTH.REGISTER, validate(registerSchema, 'body'), authController.register);
router.post(ROUTES.AUTH.VERIFY_OTP, validate(otpSchema, 'body'), authController.verifyOtp);
router.post(ROUTES.AUTH.RESEND_OTP, validate(resendOtpSchema, 'body'), authController.resendOtp);
router.post(ROUTES.AUTH.REFRESH_TOKEN, authController.refreshToken);
router.get(ROUTES.AUTH.GET_ME, authController.getCurrentUser);
router.get(ROUTES.AUTH.GET_ME, authMiddleware(tokenService), authController.getCurrentUser);
router.post(ROUTES.AUTH.LOG_OUT, verifyCsrf ,authController.logout);
router.post(ROUTES.AUTH.GOOGLE_LOGIN, validate(googleLoginSchema, 'body'), authController.googleLogin);
router.post(ROUTES.AUTH.LOGIN, validate(loginSchema, 'body'), authController.login);
router.post(ROUTES.AUTH.FORGOT_PASSWORD, validate(forgotPasswordSchema, 'body'), authController.forgotPassword);
router.post(ROUTES.AUTH.VERIFY_OTP_RESET, validate(otpSchema, 'body'), authController.verifyForgotPasswordOtp);
router.post(ROUTES.AUTH.RESET_PASSWORD, validate(resetPasswordSchema, 'body'), authController.resetPassword);

export default router;