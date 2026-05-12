import express from 'express';
import { ROUTES } from '../../shared/constants/routes';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validators/auth/loginValidator';
import { adminController, tokenService, userManagementController } from '../../infrastructure/di/container';
import { verifyCsrf } from '../middlewares/csrfVerify';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { adminSubscriptionController } from '../../infrastructure/di/subscription.container';
import { createSubscriptionPlanSchema, deactivateSubscriptionPlanSchema, updateSubscriptionPlanSchema } from '../validators/admin/admin.subscription.validator';

const router = express.Router();

//Auth Routes
router.post(ROUTES.ADMIN.LOGIN, validate(loginSchema, 'body'), adminController.login);
router.post(ROUTES.ADMIN.REFRESH_TOKEN, adminController.refreshToken);
router.get(ROUTES.ADMIN.GET_ME, adminController.getCurrentAdmin);
router.post(ROUTES.ADMIN.LOG_OUT, verifyCsrf, adminController.logout);

//Usermanagement Routes
router.get(ROUTES.ADMIN.GET_USERS, verifyCsrf, userManagementController.getAllUsers);
router.patch(ROUTES.ADMIN.BLOCK_USER, verifyCsrf, userManagementController.blockUser);

//subscriptin routes
router.post(ROUTES.ADMIN_SUBSCRIPTION.CREATE_PLAN,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(createSubscriptionPlanSchema, "body"),
    adminSubscriptionController.createSubscriptionPlan
);
router.put(ROUTES.ADMIN_SUBSCRIPTION.UPDATE_PLAN,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(updateSubscriptionPlanSchema, "body"),
    adminSubscriptionController.updateSubscriptionPlan
);
router.patch(ROUTES.ADMIN_SUBSCRIPTION.DEACTIVATE_PLAN,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(deactivateSubscriptionPlanSchema, "params"),
    adminSubscriptionController.deactivateSubscriptionPlan
);

export default router;