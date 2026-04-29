import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AdminUser, GetUsersResponse } from "../../../types/admin/user";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";

interface FetchUsersParams {
    page?: number;
    limit?: number;
    search?: string;
}

interface UserManagementState {
    users: AdminUser[];
    loading: boolean;
    error: string | null;

    page: number;
    limit: number;
    total: number;
}

const initialState: UserManagementState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
};


export const fetchUsers = createAsyncThunk<
    GetUsersResponse,
    FetchUsersParams | undefined,
    { rejectValue: string }
>(
    "admin/fetchUsers",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.get(API_ROUTES.ADMIN.GET_USERS, {
                params,
            });

            if (!res.data.success) {
                return rejectWithValue("Invalid response");
            }

            return res.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;

                state.users = action.payload.users;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
            });
    },
});

export const { clearError } = userManagementSlice.actions;
export default userManagementSlice.reducer;