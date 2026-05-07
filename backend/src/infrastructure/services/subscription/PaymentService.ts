import Razorpay from "razorpay";
import crypto from "crypto";
import { IPaymentService } from "../../../application/interfaces/services/subscription/IPaymentService";
import { CreatePaymentOrderInputDTO, CreatePaymentOrderOutputDTO, VerifyPaymentDTO } from "../../../application/dtos/subscription/payment.subscription.dto";
import { AppError } from "../../../domain/errors/AppError";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { subMessages } from "../../../application/constants/messages/subMessags";
import { statusCode } from "../../../application/constants/enums/statusCode";

export class PaymentService implements IPaymentService {
    private _razorpay: Razorpay;

    constructor() {
        this._razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }

    async createOrder(data: CreatePaymentOrderInputDTO): Promise<CreatePaymentOrderOutputDTO> {
        try {
            if (data.amount <= 0) {
                throw new AppError(subMessages.error.INVALID_AMOUNT, statusCode.BAD_REQUEST)
            }

            const order = await this._razorpay.orders.create({
                amount: data.amount * 100,
                currency: "INR",
                receipt: data.receipt,
            });

            return {
                orderId: order.id,
                amount: Number(order.amount),
                currency: order.currency,
            }
        } catch (error) {
            throw new AppError(subMessages.error.FAILED_RAZORPAY_ORDER, statusCode.SERVER_ERROR)
        }
    }

    async verifySignature(data: VerifyPaymentDTO): Promise<boolean> {
        const body =
            data.razorpayOrderId +
            "|" +
            data.razorpayPaymentId;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET!
            )
            .update(body.toString())
            .digest("hex");

        return expectedSignature === data.razorpaySignature;
    }
}