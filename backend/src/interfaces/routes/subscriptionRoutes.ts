import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { verifyCsrf } from "../middlewares/csrfVerify";
import { creditController, paymentController, subscriptionController } from "../../infrastructure/di/subscription.container";
import { validate } from "../middlewares/validate";
import { createPaymentOrderSchema, verifyPaymentSchema } from "../validators/subscription/subscription.validator";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { getAllSubscriptionPlansSchema } from "../validators/admin/get-all-subscription-plans.schema";

const router = express.Router();

router.post(ROUTES.SUBSCRIPTION.CREATE_PAYMENT_ORDER,
            authMiddleware(tokenService),
            verifyCsrf,
            validate(createPaymentOrderSchema, "body"),
            paymentController.createPaymentOrder
        );

router.post(ROUTES.SUBSCRIPTION.VERIFY_PAYMENT,
            authMiddleware(tokenService),
            verifyCsrf,
            validate(verifyPaymentSchema, "body"),
            paymentController.verifyPaymentAndActivateSubscription
        );

router.get(ROUTES.SUBSCRIPTION.GET_AVAILABLE_PLANS,
            authMiddleware(tokenService),
            subscriptionController.getAvailablePlans
        );
        
router.get(ROUTES.SUBSCRIPTION.GET_ACTIVE_SUBSCRIPTION,
            authMiddleware(tokenService),
            verifyCsrf,
            subscriptionController.getActiveSubscription
        );
        
router.get(ROUTES.SUBSCRIPTION.GET_USER_PAYMENTS,
            authMiddleware(tokenService),
            verifyCsrf,
            subscriptionController.getUserPayments
        );
        
router.get(ROUTES.SUBSCRIPTION.GET_CREDIT_STATUS,
            authMiddleware(tokenService),
            verifyCsrf,
            creditController.getCreditStatus
);        

export default router;        