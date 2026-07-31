import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

import { clearDashboardError, fetchDashboardSummary } from "../redux/features/dashboard/dashboardSlice";

export const useDashboard = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector(
        (state: RootState) => state.dashboard
    );

    const getDashboardSummary = () =>
        dispatch(fetchDashboardSummary()).unwrap();

    const clearError = () =>
        dispatch(clearDashboardError());

    return {
        ...state,

        getDashboardSummary,

        clearError,
    };
};