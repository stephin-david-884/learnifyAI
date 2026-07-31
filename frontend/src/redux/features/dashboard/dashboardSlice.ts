import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";

import type {
    DashboardState,
    DashboardSummary,
} from "../../../types/dashboard";

const initialState: DashboardState = {
    summary: null,

    loading: false,

    error: null,
};

export const fetchDashboardSummary =
    createAsyncThunk<
        DashboardSummary,
        void,
        { rejectValue: string }
    >(
        "dashboard/fetchDashboardSummary",

        async (_, { rejectWithValue }) => {
            try {
                const response = await api.get(API_ROUTES.DASHBOARD.GET_DASHBOARD);

                return response.data.data;
            } catch (error) {
                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                        "Failed to fetch dashboard"
                );
            }
        }
    );

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loading = true;

                state.error = null;
            })

            .addCase(
                fetchDashboardSummary.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.summary = action.payload;
                }
            )

            .addCase(
                fetchDashboardSummary.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch dashboard";
                }
            );
    },
});

export const {
    clearDashboardError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;