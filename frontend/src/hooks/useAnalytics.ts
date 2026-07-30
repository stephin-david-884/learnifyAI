import { useCallback } from "react";

import {
    clearAnalyticsError,
    clearDashboard,
    getAIAnalytics,
    getDashboardSummary,
    getDocumentAnalytics,
    getRevenueAnalytics,
    getUserAnalytics,
    setAnalyticsFilter,
} from "../redux/features/admin/analyticsSlice";
import type { AnalyticsFilter } from "../types/admin/analytics";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

const useAnalytics = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        dashboard,
        ai,
        users,
        documents,
        revenue,
        loading,
        refreshing,
        error,
        filter,
    } = useSelector((state: RootState) => state.analytics);

    const fetchDashboardSummary = useCallback(
        async (filter: AnalyticsFilter) => {

            return dispatch(
                getDashboardSummary(filter)
            ).unwrap();

        },
        [dispatch]
    );

    const fetchAIAnalytics = useCallback(
        async (filter: AnalyticsFilter) => {

            return dispatch(
                getAIAnalytics(filter)
            ).unwrap();

        },
        [dispatch]
    );

    const fetchUserAnalytics = useCallback(
        async (filter: AnalyticsFilter) => {

            return dispatch(
                getUserAnalytics(filter)
            ).unwrap();

        },
        [dispatch]
    );

    const fetchDocumentAnalytics = useCallback(
        async (filter: AnalyticsFilter) => {

            return dispatch(
                getDocumentAnalytics(filter)
            ).unwrap();

        },
        [dispatch]
    );

    const fetchRevenueAnalytics = useCallback(
        async (filter: AnalyticsFilter) => {

            return dispatch(
                getRevenueAnalytics(filter)
            ).unwrap();

        },
        [dispatch]
    );

    const setFilter = useCallback(
        (filter: AnalyticsFilter) => {

            dispatch(
                setAnalyticsFilter(filter)
            );

        },
        [dispatch]
    );

    const clearError = useCallback(
        () => {

            dispatch(
                clearAnalyticsError()
            );

        },
        [dispatch]
    );

    const resetDashboard = useCallback(
        () => {

            dispatch(
                clearDashboard()
            );

        },
        [dispatch]
    );

    return {

        dashboard,
        ai,
        users,
        documents,
        revenue,

        loading,
        refreshing,
        error,

        filter,

        fetchDashboardSummary,
        fetchAIAnalytics,
        fetchUserAnalytics,
        fetchDocumentAnalytics,
        fetchRevenueAnalytics,

        setFilter,
        clearError,
        resetDashboard,

    };

};

export default useAnalytics;