import express from 'express';
import { ROUTES } from '../../shared/constants/routes';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validators/auth/loginValidator';
import { adminController, tokenService, userManagementController } from '../../infrastructure/di/container';
import { verifyCsrf } from '../middlewares/csrfVerify';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { adminSubscriptionController } from '../../infrastructure/di/subscription.container';
import { createSubscriptionPlanSchema, deactivateSubscriptionPlanSchema, updateSubscriptionPlanSchema } from '../validators/admin/admin.subscription.validator';
import { analyticsController } from '../../infrastructure/di/analytics.container';
import { analyticsFilterSchema } from '../validators/admin/analytics.validator';

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

router.get(ROUTES.ADMIN_SUBSCRIPTION.GET_ALL_PLANS,
    adminMiddleware(tokenService),
    verifyCsrf,
    adminSubscriptionController.getAllSubscriptionPlans
)

router.get(ROUTES.ADMIN_SUBSCRIPTION.GET_PAYMENTS,
    adminMiddleware(tokenService),
    verifyCsrf,
    adminSubscriptionController.getPayments
)

router.get(
    ROUTES.ADMIN_ANALYTICS.DASHBOARD,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(analyticsFilterSchema, "query"),
    analyticsController.getDashboardSummary
);

router.get(
    ROUTES.ADMIN_ANALYTICS.AI,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(analyticsFilterSchema, "query"),
    analyticsController.getAIAnalytics
);

router.get(
    ROUTES.ADMIN_ANALYTICS.USERS,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(analyticsFilterSchema, "query"),
    analyticsController.getUserAnalytics
);

router.get(
    ROUTES.ADMIN_ANALYTICS.DOCUMENTS,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(analyticsFilterSchema, "query"),
    analyticsController.getDocumentAnalytics
);

router.get(
    ROUTES.ADMIN_ANALYTICS.REVENUE,
    adminMiddleware(tokenService),
    verifyCsrf,
    validate(analyticsFilterSchema, "query"),
    analyticsController.getRevenueAnalytics
);

export default router;