import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, RegisterPayload, RegisterResponse, User, VerifyOtpPayload, VerifyOtpResponse } from "../../../types/user";
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

export const getCurrentUser = createAsyncThunk<
    User | null,
    void,
    { rejectValue: string }
>(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.AUTH.GET_ME);
            return response.data.user;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 401 || err.response?.status === 403) {
                return rejectWithValue("NOT_AUTHENTICATED");
            }

            return rejectWithValue("Something went wrong");
        }
    }
);

export const resendOtp = createAsyncThunk<
    { message: string },
    { email: string },
    { rejectValue: string }
>(
    "auth/resendOtp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(API_ROUTES.AUTH.RESEND_OTP, data);

            return {
                message: response.data.message
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message || "Failed to resend OTP"
            );
        }
    }
);

export const logoutUser = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await api.post(API_ROUTES.AUTH.LOGOUT);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Logout failed"
            );
        }
    }
);

export const googleLogin = createAsyncThunk<
    { user: User },
    { idToken: string },
    { rejectValue: string }
>(
    "auth/googleLogin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(
                API_ROUTES.AUTH.GOOGLE_LOGIN,
                data
            );

            return {
                user: response.data.user
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message || "Google login failed"
            );
        }
    }
)

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
                state.registerEmail = null;
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "OTP verification failed";
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.initialized = true;
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })

            .addCase(getCurrentUser.rejected, (state) => {
                state.initialized = true;
                state.isAuthenticated = false;
                state.user = null;
            })

            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to resend OTP";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.initialized = true;
            })

            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.initialized = true;
            })

            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Google login failed";
            })

    }
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;