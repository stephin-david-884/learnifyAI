import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type GetUserFlashcardSetsResponse, type FlashcardSet, type FlashcardState, type GenerateFlashcardPayload, type GenerateFlashcardResponse } from "../../../types/flashcard";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";

const initialState: FlashcardState = {
    flashcardSets: [],
    currentFlashcardSet: null,
    loading: false,
    generating: false,
    deleting: false,
    error: null,
    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0,
};

export const generateFlashcards =
    createAsyncThunk<
        GenerateFlashcardResponse,
        GenerateFlashcardPayload,
        { rejectValue: string }
    >(
        "flashcard/generateFlashcards",

        async (data, { rejectWithValue }) => {

            try {
                const response = await api.post(API_ROUTES.AI.GENERATE_FLASHCARDS, data);

                return response.data.data;
            } catch (error) {
                const err = error as AxiosError<{
                    message: string;
                }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to generate flashcards");
            }
        }
    );

export const getUserFlashcardSets =
    createAsyncThunk<
        GetUserFlashcardSetsResponse,
        {
            page?: number;
            limit?: number;
            search?: string;
        },
        { rejectValue: string }
    >(
        "flashcard/getUserFlashcardSets",

        async (params, { rejectWithValue }) => {
            try {
                const response = await api.get(API_ROUTES.AI.GET_USER_FLASHCARDS, { params });

                return response.data.data;
            } catch (error) {
                const err = error as AxiosError<{
                    message: string;
                }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to fetch flashcard sets");
            }
        }
    );

export const getFlashcardSet =
    createAsyncThunk<
        FlashcardSet,
        string,
        { rejectValue: string }
    >(
        "flashcard/getFlashcardSet",

        async (flashcardSetId, { rejectWithValue }) => {
            try {
                const response = await api.get(API_ROUTES.AI.GET_FLASHCARD_SET(flashcardSetId));

                return response.data.data;
            } catch (error) {
                const err = error as AxiosError<{
                    message: string;
                }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to fetch flashcard set");
            }
        }
    );

export const deleteFlashcardSet =
    createAsyncThunk<
        void,
        string,
        { rejectValue: string }
    >(
        "flashcard/deleteFlashcardSet",

        async (flashcardSetId, { rejectWithValue }) => {
            try {
                await api.delete(API_ROUTES.AI.DELETE_FLASHCARD_SET(flashcardSetId));
            } catch (error) {
                const err = error as AxiosError<{
                    message: string;
                }>;

                return rejectWithValue(err.response?.data?.message ?? "Failed to delete flashcard set");
            }
        }
    )

const flashcardSlice = createSlice({
    name: "flashcard",
    initialState,
    reducers: {
        clearFlashcardError: (state) => {
            state.error = null;
        },

        clearCurrentFlashcardSet: (state) => {
            state.currentFlashcardSet = null;
        },
    },

    extraReducers: (
        builder
    ) => {
        builder

            // Generate Flashcards
            .addCase(generateFlashcards.pending, (state) => {
                state.generating = true;
                state.error = null;
            })
            .addCase(generateFlashcards.fulfilled, (state) => {
                state.generating = false;
            })
            .addCase(generateFlashcards.rejected, (state, action) => {
                state.generating = false;
                state.error = action.payload ?? "Failed to generate flashcards";
            })

            // Get User Flashcard Sets
            .addCase(getUserFlashcardSets.pending, (state) => {
                state.loading = true;
                state.currentFlashcardSet = null;
                state.error = null;
            })
            .addCase(getUserFlashcardSets.fulfilled, (state, action) => {
                state.loading = false;
                state.flashcardSets = action.payload.items;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
                state.total = action.payload.total;
            })
            .addCase(getUserFlashcardSets.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload ?? "Failed to fetch flashcard sets";
            }
            )

            // Get Flashcard Set
            .addCase(getFlashcardSet.pending, (state) => {
                state.loading = true;
                state.currentFlashcardSet = null;
                state.error = null;
            })
            .addCase(getFlashcardSet.fulfilled, (state, action) => {
                state.loading = false;
                state.currentFlashcardSet = action.payload;
            })
            .addCase(getFlashcardSet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch flashcard set";
            })

            // Delete Flashcard Set
            .addCase(deleteFlashcardSet.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteFlashcardSet.fulfilled, (state, action) => {
                state.deleting = false;
                state.flashcardSets = state.flashcardSets.filter((set) => set.id !== action.meta.arg);
                state.total = Math.max(0, state.total-1);

                if(state.currentFlashcardSet?.id === action.meta.arg) {
                    state.currentFlashcardSet = null;
                }
            })
            .addCase(deleteFlashcardSet.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload ?? "Failed to delete flashcard set";;
            })
    }
});

export const {
    clearFlashcardError,
    clearCurrentFlashcardSet,
} = flashcardSlice.actions;

export default flashcardSlice.reducer;