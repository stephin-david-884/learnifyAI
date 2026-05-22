import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AdminSubscriptionState, CreateSubscriptionPlanPayload, GetSubscriptionPlansQuery, PaginatedSubscriptionPlansResponse, SubscriptionPlan, UpdateSubscriptionPlanPayload } from "../../../types/subscription";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";
import type { GetAdminPaymentsQuery, PaginatedPaymentsResponse } from "../../../types/admin/payment";

const initialState: AdminSubscriptionState = {
    plans: [],
    payments: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    loading: false,
    error: null,
    successMessage: null,
};

export const getAllPlans = createAsyncThunk<
    PaginatedSubscriptionPlansResponse,
    GetSubscriptionPlansQuery | undefined,
    { rejectValue: string }
>(
    "adminSubscription/getAllPlans",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get(
                API_ROUTES.ADMIN_SUBSCRIPTION.GET_ALL_PLANS, { params }
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch plans"
            );
        }
    }
);

export const getAdminPayments = createAsyncThunk<
    PaginatedPaymentsResponse,
    GetAdminPaymentsQuery | undefined,
    { rejectValue: string }
>(
    "adminSubscription/getAdminPayments",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.ADMIN_SUBSCRIPTION.GET_PAYMENTS, { params });

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message || 
                "Failed to fetch payments"
            );
        }
    }
)

export const createPlan = createAsyncThunk<
    SubscriptionPlan,
    CreateSubscriptionPlanPayload,
    { rejectValue: string }
>(
    "adminSubscription/createPlan",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(
                API_ROUTES.ADMIN_SUBSCRIPTION.CREATE_PLAN,
                data
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to create plan"
            );
        }
    }
);

export const updatePlan = createAsyncThunk<
    SubscriptionPlan,
    UpdateSubscriptionPlanPayload,
    { rejectValue: string }
>(
    "adminSubscription/updatePlan",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.put(
                API_ROUTES.ADMIN_SUBSCRIPTION.UPDATE_PLAN,
                data
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to update plan"
            );
        }
    }
);

export const deactivatePlan = createAsyncThunk<
    SubscriptionPlan,
    string,
    { rejectValue: string }
>(
    "adminSubscription/deactivatePlan",
    async (planId, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                API_ROUTES.ADMIN_SUBSCRIPTION.DEACTIVATE_PLAN(
                    planId
                )
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to deactivate plan"
            );
        }
    }
);

const adminSubscriptionSlice = createSlice({
    name: "adminSubscription",

    initialState,

    reducers: {
        clearAdminSubscriptionError: (
            state
        ) => {
            state.error = null;
        },

        clearAdminSubscriptionSuccess: (
            state
        ) => {
            state.successMessage = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // GET ALL
            .addCase(getAllPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )

            .addCase(getAllPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
            }
            )

            .addCase(getAllPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch plans";
            }
            )

            //PAYMENTS
            .addCase(getAdminPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAdminPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
            })

            .addCase(getAdminPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch payments"
            })

            // CREATE
            .addCase(createPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )

            .addCase(createPlan.fulfilled, (state, action) => {
                state.loading = false;

                state.plans.unshift(
                    action.payload
                );

                state.successMessage =
                    "Plan created successfully";
            }
            )

            .addCase(createPlan.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    "Failed to create plan";
            }
            )

            // UPDATE
            .addCase(updatePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )

            .addCase(updatePlan.fulfilled, (state, action) => {
                state.loading = false;

                const updatedPlan = action.payload;

                const existingIndex = state.plans.findIndex(
                    (plan) => plan.id === updatedPlan.id
                );

                if (existingIndex !== -1) {

                    // SAME PLAN UPDATED
                    state.plans[existingIndex] =
                        updatedPlan;

                } else {

                    // NEW VERSION CREATED
                    state.plans.unshift(updatedPlan);
                }

                state.successMessage =
                    "Plan updated successfully";
            }
            )

            .addCase(updatePlan.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    "Failed to update plan";
            }
            )

            // DEACTIVATE
            .addCase(deactivatePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )

            .addCase(deactivatePlan.fulfilled, (state, action) => {
                state.loading = false;

                state.plans = state.plans.map(
                    (plan) =>
                        plan.id ===
                            action.payload.id
                            ? action.payload
                            : plan
                );

                state.successMessage = "Plan deactivated";
            }
            )

            .addCase(deactivatePlan.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    "Failed to deactivate";
            }
            );
    },
})

export const {
    clearAdminSubscriptionError,
    clearAdminSubscriptionSuccess,
} = adminSubscriptionSlice.actions;

export default adminSubscriptionSlice.reducer;