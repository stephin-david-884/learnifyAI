import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";
import { AppError } from "../../../../domain/errors/AppError";
import { IPaymentRepository } from "../../../../domain/repositories/IPaymentRepository";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { VerifyPaymentDTO } from "../../../dtos/subscription/payment.subscription.dto";
import { IPaymentService } from "../../../interfaces/services/subscription/IPaymentService";
import { ISubscriptionService } from "../../../interfaces/services/subscription/ISubscriptionService";
import { IVerifyPaymentAndActivateSubscriptionUseCase } from "../../../interfaces/usecases/subscription/IVerifyPaymentAndActivateSubscriptionUseCase";

export class VerifyPaymentAndActivateSubscriptionUseCase implements IVerifyPaymentAndActivateSubscriptionUseCase {

    constructor(
        private readonly _paymentRepository: IPaymentRepository,
        private readonly _paymentService: IPaymentService,
        private readonly _subscriptionService: ISubscriptionService,
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) {}

    async execute(data: VerifyPaymentDTO): Promise<UserSubscription> {
        
        const existingSuccessfulPayment = await this._paymentRepository
            .findSuccessfulPaymentByPaymentId(data.razorpayPaymentId);
        
        if(existingSuccessfulPayment) {
            throw new AppError(subMessages.error.PAYMENT_ALREADY_PROCESSED, statusCode.BAD_REQUEST);
        }
        
        //Find payment
        const payment = await this._paymentRepository.findByOrderId(data.razorpayOrderId);

        if(!payment) {
            throw new AppError(subMessages.error.PAYMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        //prevent duplicate activation
        if(payment.status === "SUCCESS") {
            throw new AppError(subMessages.error.PAYMENT_ALREADY_PROCESSED, statusCode.BAD_REQUEST);
        }

        //Verify Razorpay signature
        const isValid = await this._paymentService.verifySignature({
            razorpayOrderId: data.razorpayOrderId,
            razorpayPaymentId: data.razorpayPaymentId,
            razorpaySignature: data.razorpaySignature
        });

        if(!isValid) {
            payment.markFailed();

            await this._paymentRepository.save(payment);

            throw new AppError(subMessages.error.INVALID_PAYMENT_SIGNATURE, statusCode.BAD_REQUEST);
        }

        payment.markSuccess(data.razorpayPaymentId, data.razorpaySignature);

        await this._paymentRepository.save(payment);

        const plan = await this._subscriptionPlanRepository.findById(payment.planId);

        if(!plan) {
            throw new AppError(subMessages.error.PLAN_NOT_FOUND, statusCode.NOT_FOUND);
        }

        return await this._subscriptionService
            .createSubscription({
                userId: payment.userId,

                plan,

                paymentId: payment.getId()
            })
    }
}