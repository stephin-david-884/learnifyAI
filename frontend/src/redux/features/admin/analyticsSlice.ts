import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AIAnalytics, AnalyticsFilter, AnalyticsState, DashboardSummary, DocumentAnalytics, RevenueAnalytics, UserAnalytics } from "../../../types/admin/analytics";
import type { AxiosError } from "axios";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";

const initialState: AnalyticsState = {

    dashboard: null,

    ai: null,

    users: null,

    documents: null,

    revenue: null,

    loading: false,

    refreshing: false,

    error: null,

    filter: {

        period: "LAST_7_DAYS",

    },

};

export const getDashboardSummary =
    createAsyncThunk<
        DashboardSummary,
        AnalyticsFilter,
        { rejectValue: string }
    >(
        "analytics/getDashboardSummary",

        async (
            filter,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(
                    API_ROUTES.ADMIN_ANALYTICS.GET_DASHBOARD_SUMMARY,
                    {
                        params: filter,
                    }
                );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch dashboard summary"
                );

            }

        }
    );

export const getAIAnalytics =
    createAsyncThunk<
        AIAnalytics,
        AnalyticsFilter,
        { rejectValue: string }
    >(
        "analytics/getAIAnalytics",

        async (
            filter,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(
                    API_ROUTES.ADMIN_ANALYTICS.GET_AI_ANALYTICS,
                    {
                        params: filter,
                    }
                );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch AI analytics"
                );

            }

        }
    );

export const getUserAnalytics =
    createAsyncThunk<
        UserAnalytics,
        AnalyticsFilter,
        { rejectValue: string }
    >(
        "analytics/getUserAnalytics",

        async (
            filter,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(
                    API_ROUTES.ADMIN_ANALYTICS.GET_USER_ANALYTICS,
                    {
                        params: filter,
                    }
                );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch user analytics"
                );

            }

        }
    );

export const getDocumentAnalytics =
    createAsyncThunk<
        DocumentAnalytics,
        AnalyticsFilter,
        { rejectValue: string }
    >(
        "analytics/getDocumentAnalytics",

        async (
            filter,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(
                    API_ROUTES.ADMIN_ANALYTICS.GET_DOCUMENT_ANALYTICS,
                    {
                        params: filter,
                    }
                );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch document analytics"
                );

            }

        }
    );

export const getRevenueAnalytics =
    createAsyncThunk<
        RevenueAnalytics,
        AnalyticsFilter,
        { rejectValue: string }
    >(
        "analytics/getRevenueAnalytics",

        async (
            filter,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(
                    API_ROUTES.ADMIN_ANALYTICS.GET_REVENUE_ANALYTICS,
                    {
                        params: filter,
                    }
                );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch revenue analytics"
                );

            }

        }
    );

const analyticsSlice = createSlice({
    name: "analytics",

    initialState,

    reducers: {

        clearAnalyticsError(state) {

            state.error = null;

        },

        setAnalyticsFilter(state, action) {

            state.filter = action.payload;

        },

        clearDashboard(state) {

            state.dashboard = null;

            state.ai = null;

            state.users = null;

            state.documents = null;

            state.revenue = null;

            state.loading = false;

            state.refreshing = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {
        builder

            /* Dashboard summary */

            .addCase(
                getDashboardSummary.pending,
                (state) => {

                    if (state.dashboard) {

                        state.refreshing = true;

                    } else {

                        state.loading = true;

                    }

                    state.error = null;

                }
            )
            .addCase(
                getDashboardSummary.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.refreshing = false;

                    state.dashboard = action.payload;

                    state.ai = action.payload.ai;

                    state.users = action.payload.users;

                    state.documents = action.payload.documents;

                    state.revenue = action.payload.revenue;

                }
            )
            .addCase(
                getDashboardSummary.rejected,
                (state, action) => {

                    state.loading = false;

                    state.refreshing = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch dashboard summary";

                }
            )

            /* AI Analytics */

            .addCase(
                getAIAnalytics.pending,
                (state) => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                getAIAnalytics.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    state.ai = action.payload;

                    if (state.dashboard) {

                        state.dashboard.ai = action.payload;

                    }

                }
            )

            .addCase(
                getAIAnalytics.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch AI analytics";

                }
            )

            /* User analytics */

            .addCase(
                getUserAnalytics.pending,
                (state) => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                getUserAnalytics.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    state.users = action.payload;

                    if (state.dashboard) {

                        state.dashboard.users = action.payload;

                    }

                }
            )

            .addCase(
                getUserAnalytics.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch user analytics";

                }
            )

            /* Document Analytics */

            .addCase(
                getDocumentAnalytics.pending,
                (state) => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                getDocumentAnalytics.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    state.documents = action.payload;

                    if (state.dashboard) {

                        state.dashboard.documents = action.payload;

                    }

                }
            )

            .addCase(
                getDocumentAnalytics.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch document analytics";

                }
            )

            /* Revenue Analytics */

            .addCase(
                getRevenueAnalytics.pending,
                (state) => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                getRevenueAnalytics.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    state.revenue = action.payload;

                    if (state.dashboard) {

                        state.dashboard.revenue = action.payload;

                    }

                }
            )

            .addCase(
                getRevenueAnalytics.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch revenue analytics";

                }
            )
    }
});

export const {
    clearAnalyticsError,
    clearDashboard,
    setAnalyticsFilter,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;