import { CancelSubscriptionDTO } from "../../dtos/profile/CancelSubscriptionDTO";

export const mapCancelSubscriptionRequest = (userId: string): CancelSubscriptionDTO => ({
    userId
})