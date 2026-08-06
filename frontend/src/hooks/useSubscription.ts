import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { clearPaymentOrder, clearSubscriptionError, createPaymentOrder, getActiveSubscription, getAvailablePlans, getCreditStatus, getUserPayments, markPaymentFailed, verifyPayment } from "../redux/features/subscription/subscriptionSlice";
import type { GetAvailablePlansQuery } from "../types/subscription";
import { useCallback } from "react";

export const useSubscription = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        plans,
        activeSubscription,
        payments,
        creditStatus,
        paymentOrder,
        loading,
        total,
        page,
        limit,
        totalPages,
        error,
    } = useSelector(
        (state: RootState) => state.subscription
    );

    const clearError = useCallback(() => {
        dispatch(clearSubscriptionError());
    }, [dispatch]);

    const clearOrder = useCallback(() => {
        dispatch(clearPaymentOrder());
    }, [dispatch]);

    const fetchAvailablePlans = useCallback(
        async (params?: GetAvailablePlansQuery) => {
            return dispatch(getAvailablePlans(params)).unwrap();
        },
        [dispatch]
    );

    const fetchActiveSubscription = useCallback(async () => {
        return dispatch(getActiveSubscription()).unwrap();
    }, [dispatch]);

    const fetchUserPayments = useCallback(async () => {
        return dispatch(getUserPayments()).unwrap();
    }, [dispatch]);

    const fetchCreditStatus = useCallback(async () => {
        return dispatch(getCreditStatus()).unwrap();
    }, [dispatch]);

    const createOrder = useCallback(
        async (planId: string) => {
            return dispatch(
                createPaymentOrder({ planId })
            ).unwrap();
        },
        [dispatch]
    );

    const verifySubscriptionPayment = useCallback(
        async (data: {
            razorpayOrderId: string;
            razorpayPaymentId: string;
            razorpaySignature: string;
        }) => {
            return dispatch(
                verifyPayment(data)
            ).unwrap();
        },
        [dispatch]
    );

    const markSubscriptionPaymentFailed = useCallback(
        async (razorpayOrderId: string) => {
            return dispatch(
                markPaymentFailed({ razorpayOrderId })
            ).unwrap();
        },
        [dispatch]
    );

    return {
        plans,
        activeSubscription,
        payments,
        creditStatus,
        paymentOrder,
        total,
        page,
        limit,
        totalPages,
        loading,
        error,
        clearError,
        clearOrder,
        fetchAvailablePlans,
        fetchActiveSubscription,
        fetchUserPayments,
        fetchCreditStatus,
        createOrder,
        verifySubscriptionPayment,
        markSubscriptionPaymentFailed
    };
}