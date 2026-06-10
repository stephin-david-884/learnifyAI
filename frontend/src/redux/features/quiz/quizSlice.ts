import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    GenerateQuizPayload,
    GenerateQuizResponse,
    GetUserQuizzesResponse,
    Quiz,
    QuizState,
    SubmitQuizPayload,
    SubmitQuizResponse,
} from "../../../types/quiz";

import api from "../../../lib/axios";

import { API_ROUTES } from "../../../constants/api.routes";

import type { AxiosError } from "axios";

const initialState: QuizState = {
    quizzes: [],

    currentQuiz: null,

    quizResult: null,

    loading: false,

    generating: false,

    submitting: false,

    error: null,

    page: 1,

    limit: 10,

    totalPages: 1,

    total: 0,
};

export const generateQuiz =
    createAsyncThunk<
        GenerateQuizResponse,
        GenerateQuizPayload,
        { rejectValue: string }
    >(
        "quiz/generateQuiz",

        async (
            data,
            { rejectWithValue }
        ) => {
            try {

                const response =
                    await api.post(
                        API_ROUTES.AI.GENERATE_QUIZ,
                        data
                    );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to generate quiz"
                );
            }
        }
    );

export const getQuiz =
    createAsyncThunk<
        Quiz,
        string,
        { rejectValue: string }
    >(
        "quiz/getQuiz",

        async (
            quizId,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await api.get(
                        API_ROUTES.AI.GET_QUIZ(
                            quizId
                        )
                    );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch quiz"
                );
            }
        }
    );

export const getUserQuizzes =
    createAsyncThunk<
        GetUserQuizzesResponse,
        {
            page?: number;
            limit?: number;
        },
        { rejectValue: string }
    >(
        "quiz/getUserQuizzes",

        async (
            params,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await api.get(
                        API_ROUTES.AI.GET_USER_QUIZZES,
                        {
                            params,
                        }
                    );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to fetch quizzes"
                );
            }
        }
    );

export const submitQuiz =
    createAsyncThunk<
        SubmitQuizResponse,
        SubmitQuizPayload,
        { rejectValue: string }
    >(
        "quiz/submitQuiz",

        async (
            data,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await api.post(
                        API_ROUTES.AI.SUBMIT_QUIZ(
                            data.quizId
                        ),
                        {
                            answers:
                                data.answers,
                        }
                    );

                return response.data.data;

            } catch (error) {

                const err =
                    error as AxiosError<{
                        message: string;
                    }>;

                return rejectWithValue(
                    err.response?.data?.message ??
                    "Failed to submit quiz"
                );
            }
        }
    );

const quizSlice = createSlice({
    name: "quiz",

    initialState,

    reducers: {

        clearQuizError: (
            state
        ) => {
            state.error = null;
        },

        clearQuizResult: (
            state
        ) => {
            state.quizResult = null;
        },

        clearCurrentQuiz: (
            state
        ) => {
            state.currentQuiz = null;
        },
    },

    extraReducers: (
        builder
    ) => {

        builder

            .addCase(
                generateQuiz.pending,
                (state) => {

                    state.generating = true;

                    state.error = null;
                }
            )

            .addCase(
                generateQuiz.fulfilled,
                (state) => {

                    state.generating = false;
                }
            )

            .addCase(
                generateQuiz.rejected,
                (
                    state,
                    action
                ) => {

                    state.generating = false;

                    state.error =
                        action.payload ??
                        "Failed to generate quiz";
                }
            )

            .addCase(
                getQuiz.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                getQuiz.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.currentQuiz =
                        action.payload;
                }
            )

            .addCase(
                getQuiz.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch quiz";
                }
            )

            .addCase(
                getUserQuizzes.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                getUserQuizzes.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.quizzes =
                        action.payload.items;

                    state.page =
                        action.payload.page;

                    state.limit =
                        action.payload.limit;

                    state.totalPages =
                        action.payload.totalPages;

                    state.total =
                        action.payload.total;
                }
            )

            .addCase(
                getUserQuizzes.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Failed to fetch quizzes";
                }
            )

            .addCase(
                submitQuiz.pending,
                (state) => {

                    state.submitting = true;

                    state.error = null;
                }
            )

            .addCase(
                submitQuiz.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.submitting = false;

                    state.quizResult =
                        action.payload;

                    if (
                        state.currentQuiz
                    ) {
                        state.currentQuiz.status =
                            "COMPLETED";

                        state.currentQuiz.score =
                            action.payload.score;
                    }
                }
            )

            .addCase(
                submitQuiz.rejected,
                (
                    state,
                    action
                ) => {

                    state.submitting = false;

                    state.error =
                        action.payload ??
                        "Failed to submit quiz";
                }
            );
    },
});

export const {
    clearQuizError,
    clearQuizResult,
    clearCurrentQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;