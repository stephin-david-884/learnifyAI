import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type UpdateProfileResponse, type ChangePasswordPayload, type ProfileState, type UpdateProfilePayload, type UserProfile } from "../../../types/profile";
import { API_ROUTES } from "../../../constants/api.routes";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";

const initialState: ProfileState = {
    profile: null,
    loading: false,
    updatingProfile: false,
    changingPassword: false,
    cancellingSubscription: false,
    error: null
};

export const getProfile = createAsyncThunk<
    UserProfile,
    void,
    { rejectValue: string }
>(
    "profile/getProfile",

    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.PROFILE.GET_PROFILE);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
        }
    }
);

export const updateProfile = createAsyncThunk<
    UpdateProfileResponse,
    UpdateProfilePayload,
    { rejectValue: string }
>(
    "profile/updateProfile",

    async (data, { rejectWithValue }) => {
        try {
            const response = await api.patch(API_ROUTES.PROFILE.UPDATE_PROFILE, data);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(err.response?.data?.message || "Failed to update profile")
        }
    }
);

export const changePassword = createAsyncThunk<
    void,
    ChangePasswordPayload,
    { rejectValue: string }
>(
    "profile/changePassword",

    async (data, { rejectWithValue }) => {
        try {
            await api.patch(API_ROUTES.PROFILE.CHANGE_PASSWORD, data);
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(err.response?.data?.message || "Failed to change password");
        }
    }
);

export const cancelSubscription = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "profile/cancelSubscription",

    async (_, { rejectWithValue }) => {
        try {
            await api.patch(API_ROUTES.PROFILE.CANCEL_SUBSCRIPTION);
        } catch (error) {
            const err =
                error as AxiosError<{
                    message: string;
                }>;

            return rejectWithValue(err.response?.data?.message || "Failed to cancel subscription");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",

    initialState,

    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            //GET PROFILE

            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })

            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch profile";
            })

            //UPDATE PROFILE

            .addCase(updateProfile.pending, (state) => {
                state.updatingProfile = true;
                state.error = null;
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updatingProfile = false;

                if (state.profile) {
                    state.profile.name = action.payload.name;
                    state.profile.email = action.payload.email;
                }
            })

            .addCase(updateProfile.rejected, (state, action) => {
                state.updatingProfile = false;
                state.error = action.payload || "Failed to update profile";
            })

            //CHANGE PASSWORD

            .addCase(changePassword.pending, (state) => {
                state.changingPassword = true;
                state.error = null;

            })

            .addCase(changePassword.fulfilled, (state) => {
                state.changingPassword = false;
            })

            .addCase(changePassword.rejected, (state, action) => {
                state.changingPassword = false;
                state.error = action.payload || "Failed to change password";
            })

            // CANCEL SUBSCRIPTION

            .addCase(cancelSubscription.pending, (state) => {
                state.cancellingSubscription = true;
                state.error = null;
            }
            )

            .addCase(cancelSubscription.fulfilled, (state) => {
                state.cancellingSubscription = false;

                if (state.profile) {
                    state.profile.subscription = null;
                }
            }
            )

            .addCase(cancelSubscription.rejected, (state, action) => {
                state.cancellingSubscription = false;

                state.error = action.payload || "Failed to cancel subscription";
            }
            );
    }
});

export const { clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;