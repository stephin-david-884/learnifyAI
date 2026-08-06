import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { clearAdminSubscriptionError, clearAdminSubscriptionSuccess, createPlan, deactivatePlan, getAdminPayments, getAllPlans, updatePlan } from "../redux/features/adminSubscription/adminSubscriptionSlice";
import type { CreateSubscriptionPlanPayload, GetSubscriptionPlansQuery, UpdateSubscriptionPlanPayload } from "../types/subscription";
import type { GetAdminPaymentsQuery } from "../types/admin/payment";
import { useCallback } from "react";

export const useAdminSubscription = () => {

    const dispatch =
        useDispatch<AppDispatch>();

    const {
        plans, payments, total, page, limit, totalPages, loading, error, successMessage } = useSelector((state: RootState) => state.adminSubscription);

    const fetchPlans = useCallback(
        async (params?: GetSubscriptionPlansQuery) => {
            return dispatch(
                getAllPlans(params)
            ).unwrap();
        },
        [dispatch]
    );

    const fetchPayments = useCallback(
        async (params?: GetAdminPaymentsQuery) => {
            return dispatch(
                getAdminPayments(params)
            ).unwrap();
        },
        [dispatch]
    );

    const createSubscriptionPlan =
        async (
            data:
                CreateSubscriptionPlanPayload
        ) => {
            return dispatch(createPlan(data)).unwrap();
        };

    const updateSubscriptionPlan =
        async (
            data:
                UpdateSubscriptionPlanPayload
        ) => {
            return dispatch(updatePlan(data)).unwrap();
        };

    const deactivateSubscriptionPlan =
        async (planId: string) => {
            return dispatch(deactivatePlan(planId)).unwrap();
        };

    const clearError = useCallback(
        () => {
            dispatch(
                clearAdminSubscriptionError()
            );
        },
        [dispatch]
    );

    const clearSuccess = useCallback(
        () => {
            dispatch(
                clearAdminSubscriptionSuccess()
            );
        },
        [dispatch]
    );

    return {
        plans,
        payments,

        loading,
        error,
        successMessage,

        total,
        page,
        limit,
        totalPages,

        fetchPlans,
        fetchPayments,

        createSubscriptionPlan,
        updateSubscriptionPlan,
        deactivateSubscriptionPlan,

        clearError,
        clearSuccess,
    };
};