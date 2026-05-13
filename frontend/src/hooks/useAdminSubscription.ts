import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { clearAdminSubscriptionError, clearAdminSubscriptionSuccess, createPlan, deactivatePlan, getAllPlans, updatePlan } from "../redux/features/adminSubscription/adminSubscriptionSlice";
import type { CreateSubscriptionPlanPayload, UpdateSubscriptionPlanPayload } from "../types/subscription";

export const useAdminSubscription = () => {

    const dispatch =
        useDispatch<AppDispatch>();

    const {
        plans,
        loading,
        error,
        successMessage,
    } = useSelector((state: RootState) => state.adminSubscription);

    const fetchPlans = async () => {
        return dispatch(getAllPlans()).unwrap();
    };

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

    const clearError = () => {
        dispatch(clearAdminSubscriptionError()
        );
    };

    const clearSuccess = () => {
        dispatch(clearAdminSubscriptionSuccess()
        );
    };

    return {
        plans,
        loading,
        error,
        successMessage,
        fetchPlans,
        createSubscriptionPlan,
        updateSubscriptionPlan,
        deactivateSubscriptionPlan,
        clearError,
        clearSuccess,
    };
};