import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, ResetPasswordPayload, User, VerifyForgotPasswordPayload, VerifyForgotPasswordResponse, VerifyOtpPayload, VerifyOtpResponse } from "../../../types/user";
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
    isBlocked: false
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
                user: response.data.data.user,
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
            return response.data.data?.user ?? null;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 401) {
                return null;
            }

            if (err.response?.status === 403) {
                return rejectWithValue("BLOCKED");
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
);

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: string }
>(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(API_ROUTES.AUTH.LOGIN, data);

            return {
                user: response.data.data.user,
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
)

export const forgotPassword = createAsyncThunk<
    { message: string },
    { email: string },
    { rejectValue: string }
>(
    "auth/forgotPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(
                API_ROUTES.AUTH.FORGOT_PASSWORD,
                data
            );

            return { message: response.data.message };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Failed to send OTP"
            );
        }
    }
)

export const verifyForgotPasswordOtp = createAsyncThunk<
    VerifyForgotPasswordResponse,
    VerifyForgotPasswordPayload,
    { rejectValue: string }
>(
    "auth/verifyForgotPasswordOtp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(
                API_ROUTES.AUTH.VERIFY_FORGOT_PASSWORD,
                data
            );

            return {
                email: response.data.data.email,
                resetToken: response.data.data.resetToken,
                message: response.data.message
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

export const resetPassword = createAsyncThunk<
    { message: string },
    ResetPasswordPayload,
    { rejectValue: string }
>(
    "auth/resetPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(
                API_ROUTES.AUTH.RESET_PASSWORD,
                data
            );

            return {
                message: response.data.message
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Password reset failed"
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
        },
        setBlocked: (state, action) => {
            state.isBlocked = action.payload;
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

            .addCase(getCurrentUser.rejected, (state, action) => {
                state.initialized = true;
                state.loading = false;

                if (action.payload === "BLOCKED") {
                    state.isBlocked = true;
                    state.isAuthenticated = true;
                    // state.user = null;
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                }
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

        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.initialized = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Login failed";
        })
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to send OTP";
        })
        .addCase(verifyForgotPasswordOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyForgotPasswordOtp.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "OTP verification failed";
        })
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Password reset failed";
        })

}
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;