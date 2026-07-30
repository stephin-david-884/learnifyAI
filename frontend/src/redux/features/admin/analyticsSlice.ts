import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AnalyticsFilter, AnalyticsState, DashboardSummary } from "../../../types/admin/analytics";
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

        },

    },

    extraReducers: (builder) => {
        builder

        /* Dashboard summary */

            .addCase(
                getDashboardSummary.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )
            .addCase(
                getDashboardSummary.fulfilled,
                (state, action) => {

                    state.loading = false;

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

                    state.error =
                        action.payload ??
                        "Failed to fetch dashboard summary";

                }
            )

            
    }
})