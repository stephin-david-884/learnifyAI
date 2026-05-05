export type PaymentStatus = "CREATED" | "SUCCESS" | "FAILED";

type PaymentProps = {
  id?: string;
  userId: string;
  planId: string;

  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  amount: number;

  status?: PaymentStatus;

  createdAt?: Date;
  updatedAt?: Date;
};

export class Payment {
  public readonly id?: string;

  public userId: string;
  public planId: string;

  public razorpayOrderId: string;
  public razorpayPaymentId?: string;
  public razorpaySignature?: string;

  public amount: number;

  public status: PaymentStatus;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: PaymentProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.planId = props.planId;

    this.razorpayOrderId = props.razorpayOrderId;
    this.razorpayPaymentId = props.razorpayPaymentId;
    this.razorpaySignature = props.razorpaySignature;

    this.amount = props.amount;

    this.status = props.status ?? "CREATED";

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.validate();
  }

  private validate() {
    if (this.amount < 0) {
      throw new Error("Amount cannot be negative");
    }
  }

  markSuccess(paymentId: string, signature: string) {
    this.status = "SUCCESS";
    this.razorpayPaymentId = paymentId;
    this.razorpaySignature = signature;
  }

  markFailed() {
    this.status = "FAILED";
  }

  getId(): string {
    if (!this.id) {
      throw new Error("Payment ID is not set");
    }
    return this.id;
  }
}