import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../../constants/api.routes";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";

interface Admin {
    id: string;
    name: string;
    email: string;
}

interface AdminState {
    admin: Admin | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: AdminState = {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
};

export const adminLogin = createAsyncThunk<
    { admin: Admin },
    { email: string; password: string },
    { rejectValue: string }
>(
    "admin/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post(API_ROUTES.ADMIN.LOGIN, data);

            return {
                admin: res.data.admin
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Admin login failed"
            );
        }
    }
);

export const getCurrentAdmin = createAsyncThunk<
    Admin | null,
    void,
    { rejectValue: string }
>(
    "admin/getCurrentAdmin",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(API_ROUTES.ADMIN.GET_ME);
            return res.data.data?.admin ?? null;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            if (err.response?.status === 401 || err.response?.status === 403) {
                return rejectWithValue("NOT_AUTHENTICATED");
            }

            return rejectWithValue("Something went wrong");
        }
    }
)

export const adminLogout = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "admin/logout",
    async (_, { rejectWithValue }) => {
        try {
            await api.post(API_ROUTES.ADMIN.LOG_OUT);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Logout failed"
            );
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
                state.isAuthenticated = true;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            .addCase(getCurrentAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.initialized = true;
                if (action.payload) {
                    state.admin = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.admin = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(getCurrentAdmin.rejected, (state) => {
                state.loading = false;
                state.admin = null;
                state.isAuthenticated = false;
                state.initialized = true;
            })
            .addCase(adminLogout.pending, (state) => {
                state.loading = true;
            })

            .addCase(adminLogout.fulfilled, (state) => {
                state.loading = false;
                state.admin = null;
                state.isAuthenticated = false;
                state.initialized = true;
            })

            .addCase(adminLogout.rejected, (state, action) => {
                state.loading = false;
                state.admin = null;
                state.isAuthenticated = false;

                state.error = action.payload || "Logout failed";
            })
    },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;