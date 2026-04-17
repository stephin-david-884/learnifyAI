import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, RegisterPayload, RegisterResponse, VerifyOtpPayload, VerifyOtpResponse } from "../../../types/user";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";


const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    registerEmail: null,
    initialized: false,
}

export const registerUser = createAsyncThunk<
    RegisterResponse,
    RegisterPayload,
    { rejectValue: string }
>(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(API_ROUTES.AUTH.REGISTER, data);

            if (!response.data.success) {
                return rejectWithValue('Registration failed')
            }

            return {
                email: data.email,
                message: response.data.message
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(
                err.response?.data?.message || "Failed to register"
            )
        }
    }
);

export const verifyOtp = createAsyncThunk<
    VerifyOtpResponse,
    VerifyOtpPayload,
    { rejectValue: string }
>(
    "auth/verifyOtp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(API_ROUTES.AUTH.VERIFY_OTP, data);

            return {
                user: response.data.user,
                message: response.data.message,
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(
                err.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registerEmail = action.payload.email;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed"
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.initialized = true;
                state.registerEmail = null; // cleanup
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "OTP verification failed";
            });

    }
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer