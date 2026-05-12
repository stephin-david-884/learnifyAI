import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { clearPaymentOrder, clearSubscriptionError, createPaymentOrder, getActiveSubscription, getAvailablePlans, getCreditStatus, getUserPayments, verifyPayment } from "../redux/features/subscription/subscriptionSlice";

export const useSubscription = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        plans,
        activeSubscription,
        payments,
        creditStatus,
        paymentOrder,
        loading,
        error,
    } = useSelector(
        (state: RootState) => state.subscription
    );

    const clearError = () => {
        dispatch(clearSubscriptionError());
    }

    const clearOrder = () => {
        dispatch(clearPaymentOrder());
    };

    const fetchAvailablePlans = async () => {
        return dispatch(getAvailablePlans()).unwrap();
    };

    const fetchActiveSubscription = async () => {
        return dispatch(getActiveSubscription()).unwrap();
    };

    const fetchUserPayments = async () => {
        return dispatch(getUserPayments()).unwrap();
    };

    const fetchCreditStatus = async () => {
        return dispatch(getCreditStatus()).unwrap();
    };

    const createOrder = async (planId: string) => {
        return dispatch(
            createPaymentOrder({ planId })
        ).unwrap();
    };

    const verifySubscriptionPayment = async (
        data: {
            razorpayOrderId: string;
            razorpayPaymentId: string;
            razorpaySignature: string;
        }
    ) => {
        return dispatch( verifyPayment(data)).unwrap();
    };

    return {
        plans,
        activeSubscription,
        payments,
        creditStatus,
        paymentOrder,
        loading,
        error,
        clearError,
        clearOrder,
        fetchAvailablePlans,
        fetchActiveSubscription,
        fetchUserPayments,
        fetchCreditStatus,
        createOrder,
        verifySubscriptionPayment
    };
}