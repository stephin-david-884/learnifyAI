import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CreatePaymentOrderResponse, CreditStatus, GetAvailablePlansQuery, MarkPaymentFailedPayload, PaginatedSubscriptionPlansResponse, SubscriptionState, UserSubscription } from "../../../types/subscription";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";
import type { Payment } from "../../../types/admin/payment";

const initialState: SubscriptionState = {
    plans: [],
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
    activeSubscription: null,
    payments: [],
    creditStatus: null,
    paymentOrder: null,
    loading: false,
    error: null
}

export const getAvailablePlans = createAsyncThunk<
    PaginatedSubscriptionPlansResponse,
    GetAvailablePlansQuery | undefined,
    { rejectValue: string }
>(
    "subscription/getAvailablePlans",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.SUBSCRIPTION.GET_AVAILABLE_PLANS, { params });

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(err.response?.data?.message || "Failed to fetch plans")
        }
    }
);

export const getActiveSubscription = createAsyncThunk<
    UserSubscription | null,
    void,
    { rejectValue: string }
>(
    "subscription/getActiveSubscription",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.SUBSCRIPTION.GET_ACTIVE_SUBSCRIPTION);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            if (err.response?.status === 404) {
                return null;
            }

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch subscription"
            );
        }
    }
)

export const getUserPayments = createAsyncThunk<
    Payment[],
    void,
    { rejectValue: string }
>(
    "subscription/getUserPayments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.SUBSCRIPTION.GET_USER_PAYMENTS);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch payments"
            );
        }
    }
)

export const getCreditStatus = createAsyncThunk<
    CreditStatus,
    void,
    { rejectValue: string }
>(
    "subscription/getCreditStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.SUBSCRIPTION.GET_CREDIT_STATUS);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch credit status"
            );
        }
    }
)

export const createPaymentOrder = createAsyncThunk<
    CreatePaymentOrderResponse,
    { planId: string },
    { rejectValue: string }
>(
    "subscription/createPaymentOrder",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(API_ROUTES.SUBSCRIPTION.CREATE_PAYMENT_ORDER, data);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to create payment order"
            );
        }
    }
)

export const verifyPayment = createAsyncThunk<
    UserSubscription,
    {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    },
    { rejectValue: string }
>(
    "subscription/verifyPayment",
    async (data, { rejectWithValue }) => {
        try {

            const response = await api.post(API_ROUTES.SUBSCRIPTION.VERIFY_PAYMENT, data);

            return response.data.data;
        } catch (error) {
            const err =
                error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Payment verification failed"
            );
        }
    }
)

export const markPaymentFailed = createAsyncThunk<
    void,
    MarkPaymentFailedPayload,
    { rejectValue: string }
>(
    "subscription/markPaymentFailed",

    async (data, { rejectWithValue }) => {
        try {
            await api.patch(API_ROUTES.SUBSCRIPTION.MARK_PAYMENT_FAILED, data);
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message || "Failed to mark payment as failed"
            );
        }
    }
)

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearSubscriptionError: (state) => {
            state.error = null;
        },

        clearPaymentOrder: (state) => {
            state.paymentOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAvailablePlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAvailablePlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
            })

            .addCase(getAvailablePlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch plans";
            })

            // ACTIVE SUBSCRIPTION
            .addCase(getActiveSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getActiveSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.activeSubscription = action.payload;
            })

            .addCase(getActiveSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch subscription";
            })

            //Payments
            .addCase(getUserPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUserPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })

            .addCase(getUserPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch payments";
            })

            // CREDITS
            .addCase(getCreditStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCreditStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.creditStatus = action.payload;
            })

            .addCase(getCreditStatus.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    "Failed to fetch credits";
            })

            // PAYMENT ORDER
            .addCase(createPaymentOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createPaymentOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentOrder = action.payload;
            })

            .addCase(createPaymentOrder.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    "Failed to create payment order";
            })

            // VERIFY PAYMENT
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.loading = false;

                state.activeSubscription = action.payload;

                state.paymentOrder = null;
            })

            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    "Payment verification failed";
            })

            // MARK PAYMENT FAILED
            .addCase(markPaymentFailed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(markPaymentFailed.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(markPaymentFailed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to mark payment failed"
            })
    }
});

export const {
    clearSubscriptionError,
    clearPaymentOrder,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;