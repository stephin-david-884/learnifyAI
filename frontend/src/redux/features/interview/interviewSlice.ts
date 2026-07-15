import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CompleteInterviewResponse, GenerateInterviewPayload, GenerateInterviewResponse, GetInterviewResultResponse, GetUserInterviewsResponse, Interview, InterviewState, StartInterviewResponse, SubmitInterviewPayload, SubmitInterviewResponse } from "../../../types/interview";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";

const initialState: InterviewState = {

    interviews: [],

    currentInterview: null,

    interviewResult: null,

    loading: false,

    generating: false,

    starting: false,

    submitting: false,

    completing: false,

    error: null,

    page: 1,

    limit: 10,

    totalPages: 1,

    total: 0,
}

export const generateInterview =
    createAsyncThunk<
        GenerateInterviewResponse,
        GenerateInterviewPayload,
        { rejectValue: string }
    >(
        "interview/generateInterview",

        async (
            data,
            { rejectWithValue }
        ) => {
            try {
                const response = await api.post(API_ROUTES.AI.GENERATE_INTERVIEW, data);

                return response.data.data;
            } catch (error) {

                const err = error as AxiosError<{ message: string }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to generate interview");
            }
        }
    );

export const getInterview =
    createAsyncThunk<
        Interview,
        string,
        { rejectValue: string }
    >(
        "interview/getInterview",

        async (
            interviewId,
            { rejectWithValue }
        ) => {
            try {
                const response = await api.get(API_ROUTES.AI.GET_INTERVIEW(interviewId));

                return response.data.data;
            } catch (error) {
                const err = error as AxiosError<{
                    message: string;
                }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to fetch interview");
            }
        }
    );

export const startInterview =
    createAsyncThunk<
        StartInterviewResponse,
        string,
        { rejectValue: string }
    >(
        "interview/startInterview",

        async (
            interviewId,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.post(API_ROUTES.AI.START_INTERVIEW(interviewId));

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to start interview");
            }

        }
    );

export const getInterviewResult =
    createAsyncThunk<
        GetInterviewResultResponse,
        string,
        { rejectValue: string }
    >(
        "interview/getInterviewResult",

        async (
            interviewId,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(API_ROUTES.AI.GET_INTERVIEW_RESULT(interviewId));

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch interview result"
                );
            }
        }
    );

export const getUserInterviews =
    createAsyncThunk<
        GetUserInterviewsResponse,
        {
            page?: number;
            limit?: number;
        },
        { rejectValue: string }
    >(
        "interview/getUserInterviews",

        async (
            params,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.get(API_ROUTES.AI.GET_USER_INTERVIEWS, { params, });

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to fetch interviews");
            }
        }
    );

export const submitInterview =
    createAsyncThunk<
        SubmitInterviewResponse,
        SubmitInterviewPayload,
        { rejectValue: string }
    >(
        "interview/submitInterview",

        async (
            data,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.post(API_ROUTES.AI.SUBMIT_INTERVIEW(data.interviewId), { answers: data.answers, });

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to submit interview");
            }
        }
    );

export const completeInterview =
    createAsyncThunk<
        CompleteInterviewResponse,
        string,
        { rejectValue: string }
    >(
        "interview/completeInterview",

        async (
            interviewId,
            { rejectWithValue }
        ) => {

            try {

                const response = await api.post(API_ROUTES.AI.COMPLETE_INTERVIEW(interviewId));

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to complete interview");
            }
        }
    );

const interviewSlice = createSlice({
    name: "interview",

    initialState,

    reducers: {

        clearInterviewError: (state) => {

            state.error = null;
        },

        clearInterviewResult: (state) => {

            state.interviewResult = null;
        },

        clearCurrentInterview: (state) => {

            state.currentInterview = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(generateInterview.pending, (state) => {
                state.generating = true;
                state.error = null;
            })
            .addCase(generateInterview.fulfilled, (state) => {
                state.generating = false;
            }
            )
            .addCase(generateInterview.rejected, (state, action) => {

                state.generating = false;
                state.error = action.payload ?? "Failed to generate interview";
            }
            )

            .addCase(getInterview.pending, (state) => {

                state.loading = true;
                state.error = null;
                state.interviewResult = null;
            }
            )
            .addCase(getInterview.fulfilled, (state, action) => {

                state.loading = false;
                state.currentInterview = action.payload;
            }
            )
            .addCase(getInterview.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload ?? "Failed to fetch interview";
            }
            )

            .addCase(startInterview.pending,(state) => {

                    state.starting = true;
                    state.error = null;
                }
            )
            .addCase(startInterview.fulfilled, (state) => {

                    state.starting = false;

                    if (state.currentInterview) {

                        state.currentInterview.status = "IN_PROGRESS";
                    }

                }
            )
            .addCase(startInterview.rejected,(state, action) => {

                    state.starting = false;

                    state.error = action.payload ?? "Failed to start interview";
                }
            )

            .addCase(getInterviewResult.pending, (state) => {

                state.loading = true;
                state.error = null;
            }
            )
            .addCase(getInterviewResult.fulfilled, (state, action) => {

                state.loading = false;
                state.interviewResult = action.payload;
            }
            )
            .addCase(getInterviewResult.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload ?? "Failed to fetch interview result";
            }
            )

            .addCase(getUserInterviews.pending, (state) => {

                state.loading = true;
                state.currentInterview = null;
                state.error = null;
            }
            )
            .addCase(getUserInterviews.fulfilled, (state, action) => {

                state.loading = false;
                state.interviews = action.payload.items;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
                state.total = action.payload.total;
            }
            )
            .addCase(getUserInterviews.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload ?? "Failed to fetch interviews";
            }
            )

            .addCase(submitInterview.pending, (state) => {

                state.submitting = true;
                state.error = null;
            }
            )
            .addCase(submitInterview.fulfilled, (state) => {
                state.submitting = false;
            }
            )
            .addCase(submitInterview.rejected, (state, action) => {

                state.submitting = false;
                state.error = action.payload ?? "Failed to submit interview";
            }
            )

            .addCase(completeInterview.pending, (state) => {

                state.completing = true;
                state.error = null;
            }
            )
            .addCase(completeInterview.fulfilled, (state) => {

                state.completing = false;

                if (state.currentInterview) {
                    state.currentInterview.status = "COMPLETED";
                }
            }
            )
            .addCase(completeInterview.rejected, (state, action) => {

                state.completing = false;
                state.error = action.payload ?? "Failed to complete interview";
            }
            );

    }
});

export const {
    clearInterviewError,
    clearInterviewResult,
    clearCurrentInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;