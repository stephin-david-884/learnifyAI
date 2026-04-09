import express from 'express';
import { authController } from '../../infrastructure/di/container';
import { ROUTES } from '../../shared/constants/routes';

const router = express.Router();

router.post(ROUTES.AUTH.REGISTER, authController.register);
router.post(ROUTES.AUTH.VERIFY_OTP, authController);

export default router;