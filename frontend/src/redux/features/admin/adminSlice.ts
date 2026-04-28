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
}

const initialState: AdminState = {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
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

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },
        adminLogout: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
        }
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
            });
    },
});

export const { clearAdminError, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;