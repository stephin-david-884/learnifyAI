import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { CreatePaymentOrderUseCaseInputDTO, CreatePaymentOrderUseCaseOutputDTO } from "../../dtos/subscription/create-payment-order.usecase.dto";
import { IPaymentService } from "../../interfaces/services/subscription/IPaymentService";
import { ICreatePaymentOrderUseCase } from "../../interfaces/usecases/subscription/ICreatePaymentOrderUseCase";
import { AppError } from "../../../domain/errors/AppError";
import { subMessages } from "../../constants/messages/subMessags";
import { statusCode } from "../../constants/enums/statusCode";
import { Payment } from "../../../domain/entities/Payment.entity";

export class CreatePaymentOrderUseCase implements ICreatePaymentOrderUseCase {

    constructor(
        private readonly _paymentService: IPaymentService,
        private readonly _paymentRepository: IPaymentRepository,
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) {}

    async execute(data: CreatePaymentOrderUseCaseInputDTO): Promise<CreatePaymentOrderUseCaseOutputDTO> {
        
        //validate plan
        const plan = await this._subscriptionPlanRepository.findById(data.planId);

        if(!plan || !plan.isActive) {
            throw new AppError(subMessages.error.PLAN_NOT_FOUND, statusCode.NOT_FOUND);
        }

        //create razorpay order
        const razorpayOrder = await this._paymentService.createOrder({
            amount: plan.price,
            receipt: `receipt_${Date.now()}`
        });

        //payment snapshot
        const payment = new Payment({
            userId: data.userId,
            planId: plan.getId(),

            planSnapshot: {
                name: plan.name,
                price: plan.price,
                creditsPerMonth: plan.creditsPerMonth,
                features: plan.features,

                billingCycle: plan.billingCycle,
                durationInDays: plan.durationInDays,
                creditResetIntervalInDays: plan.creditResetIntervalInDays
            },

            razorpayOrderId: razorpayOrder.orderId,
            amount: plan.price,
            status: "CREATED"
        });

        const savedPayment = await this._paymentRepository.save(payment);

        return {
            paymentId: savedPayment.getId(),
            orderId: razorpayOrder.orderId,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID!
        };
    }
}