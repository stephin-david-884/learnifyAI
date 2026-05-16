import { ICreatePaymentOrderUseCase } from "../../application/interfaces/usecases/subscription/ICreatePaymentOrderUseCase";
import { ICreateSubscriptionPlanUseCase } from "../../application/interfaces/usecases/subscription/ICreateSubscriptionPlanUseCase";
import { IDeactivateSubscriptionPlanUseCase } from "../../application/interfaces/usecases/subscription/IDeactivateSubscriptionPlanUseCase";
import { IGetActiveSubscriptionUseCase } from "../../application/interfaces/usecases/subscription/IGetActiveSubscriptionUseCase";
import { IGetAllSubscriptionPlansUseCase } from "../../application/interfaces/usecases/subscription/IGetAllSubscriptionPlansUseCase";
import { IGetAvailablePlansUseCase } from "../../application/interfaces/usecases/subscription/IGetAvailablePlansUseCase";
import { IGetCreditStatusUseCase } from "../../application/interfaces/usecases/subscription/IGetCreditStatusUseCase";
import { IGetUserPaymentsUseCase } from "../../application/interfaces/usecases/subscription/IGetUserPaymentsUseCase";
import { IResetSubscriptionCreditsUseCase } from "../../application/interfaces/usecases/subscription/IResetSubscriptionCreditsUseCase";
import { ISyncExpiredSubscriptionsUseCase } from "../../application/interfaces/usecases/subscription/ISyncExpiredSubscriptionsUseCase";
import { IUpdateSubscriptionPlanUseCase } from "../../application/interfaces/usecases/subscription/IUpdateSubscriptionPlanUseCase";
import { IVerifyPaymentAndActivateSubscriptionUseCase } from "../../application/interfaces/usecases/subscription/IVerifyPaymentAndActivateSubscriptionUseCase";
import { CreateSubscriptionPlanUseCase } from "../../application/use-cases/subscription/admin/CreateSubscriptionPlanUseCase";
import { DeactivateSubscriptionPlanUseCase } from "../../application/use-cases/subscription/admin/DeactivateSubscriptionPlanUseCase";
import { GetAllSubscriptionPlansUseCase } from "../../application/use-cases/subscription/admin/GetAllSubscriptionPlansUseCase";
import { UpdateSubscriptionPlanUseCase } from "../../application/use-cases/subscription/admin/UpdateSubscriptionPlanUseCase";
import { CreatePaymentOrderUseCase } from "../../application/use-cases/subscription/CreatePaymentOrderUseCase";
import { GetActiveSubscriptionUseCase } from "../../application/use-cases/subscription/GetActiveSubscriptionUseCase";
import { GetAvailablePlansUseCase } from "../../application/use-cases/subscription/GetAvailablePlansUseCase";
import { GetUserPaymentsUseCase } from "../../application/use-cases/subscription/GetUserPaymentsUseCase";
import { GetCreditStatusUseCase } from "../../application/use-cases/subscription/system/GetCreditStatusUseCase";
import { ResetSubscriptionCreditsUseCase } from "../../application/use-cases/subscription/system/ResetSubscriptionCreditsUseCase";
import { SyncExpiredSubscriptionsUseCase } from "../../application/use-cases/subscription/system/SyncExpiredSubscriptionsUseCase";
import { VerifyPaymentAndActivateSubscriptionUseCase } from "../../application/use-cases/subscription/VerifyPaymentAndActivateSubscriptionUseCase";
import { AdminSubscriptionController } from "../../interfaces/controllers/admin/AdminSubscriptionController";
import { CreditController } from "../../interfaces/controllers/subscription/CreditController";
import { PaymentController } from "../../interfaces/controllers/subscription/PaymentController";
import { SubscriptionController } from "../../interfaces/controllers/subscription/SubscriptionController";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { SubscriptionPlanRepository } from "../repositories/SubscriptionPlanRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserSubscriptionRepository } from "../repositories/UserSubscriptionRepository";
import { CreditService } from "../services/subscription/CreditService";
import { PaymentService } from "../services/subscription/PaymentService";
import { SubscriptionService } from "../services/subscription/SubscriptionService";

//Instances
const subscriptionPlanRepository = new SubscriptionPlanRepository();

const userSubscriptionRepository = new UserSubscriptionRepository();

const paymentRepository = new PaymentRepository();

const userRepository = new UserRepository();

//services
const paymentService = new PaymentService();

const subscriptionService =new SubscriptionService(
        userSubscriptionRepository,
        userRepository
    );

const creditService = new CreditService(
        userSubscriptionRepository,
        subscriptionService
    );

//Use cases
const createPaymentOrderUseCase: ICreatePaymentOrderUseCase = new  CreatePaymentOrderUseCase(
    paymentService,
    paymentRepository,
    subscriptionPlanRepository
) 

const verifyPaymentAndActivateSubscription: IVerifyPaymentAndActivateSubscriptionUseCase = new VerifyPaymentAndActivateSubscriptionUseCase(
    paymentRepository,
    paymentService,
    subscriptionService,
    subscriptionPlanRepository
)

const getAvailablePlansUseCase: IGetAvailablePlansUseCase = new GetAvailablePlansUseCase(
    subscriptionPlanRepository
)

const getActiveSubscriptionUseCase: IGetActiveSubscriptionUseCase = new GetActiveSubscriptionUseCase(
    subscriptionService
)

const getUserPaymentsUseCase: IGetUserPaymentsUseCase = new GetUserPaymentsUseCase(
    paymentRepository
)

const createSubscriptionPlanUseCase: ICreateSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
    subscriptionPlanRepository
)

const updateSubscriptionPlanUseCase: IUpdateSubscriptionPlanUseCase =
        new UpdateSubscriptionPlanUseCase(
            subscriptionPlanRepository,
            userSubscriptionRepository
        );

const deactivateSubscriptionPlanUseCase: IDeactivateSubscriptionPlanUseCase =
        new DeactivateSubscriptionPlanUseCase(
            subscriptionPlanRepository
        );

const getCreditStatusUseCase: IGetCreditStatusUseCase = new GetCreditStatusUseCase(
    subscriptionService
)

const syncExpiredSubscriptionsUseCase: ISyncExpiredSubscriptionsUseCase = new SyncExpiredSubscriptionsUseCase(
    userSubscriptionRepository,
    subscriptionService
)

const resetSubscriptionCreditsUseCase: IResetSubscriptionCreditsUseCase = new ResetSubscriptionCreditsUseCase(
    userSubscriptionRepository,
    creditService
)

const getAllSubscriptionPlansUseCase: IGetAllSubscriptionPlansUseCase = new GetAllSubscriptionPlansUseCase(
    subscriptionPlanRepository
) 


//controllers
export const paymentController = new PaymentController(
    createPaymentOrderUseCase,
    verifyPaymentAndActivateSubscription
)

export const subscriptionController = new SubscriptionController(
    getAvailablePlansUseCase,
    getActiveSubscriptionUseCase,
    getUserPaymentsUseCase
)

export const adminSubscriptionController = new AdminSubscriptionController(
        createSubscriptionPlanUseCase,
        updateSubscriptionPlanUseCase,
        deactivateSubscriptionPlanUseCase,
        getAllSubscriptionPlansUseCase
);

export const creditController = new CreditController(
    getCreditStatusUseCase
)

export {
    syncExpiredSubscriptionsUseCase,
    resetSubscriptionCreditsUseCase,
};