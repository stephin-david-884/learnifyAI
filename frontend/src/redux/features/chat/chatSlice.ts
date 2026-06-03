import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatHistoryResponse, ChatState, GenerateAnswerPayload, GenerateAnswerResponse } from "../../../types/chat";
import api from "../../../lib/axios";
import { API_ROUTES } from "../../../constants/api.routes";
import type { AxiosError } from "axios";

const initialState: ChatState = {

    messages: [],

    loading: false,
    sending: false,

    page: 1,
    limit: 20,

    hasMore: false,

    error: null,
};

export const getChatHistory = createAsyncThunk<
    ChatHistoryResponse,
    {
        documentId: string;
        page?: number;
        limit?: number;
    },
    { rejectValue: string }
>(
    "chat/getChatHistory",

    async (data, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.AI.GET_CHAT_HISTORY(data.documentId),
                {
                    params: {
                        page: data.page,
                        limit: data.limit
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(err.response?.data?.message || "Failed to fetch chat history");
        }
    }
);

export const generateAnswer = createAsyncThunk<
    GenerateAnswerResponse,
    GenerateAnswerPayload,
    { rejectValue: string }
>(
    "chat/generateAnswer",

    async (data, { rejectWithValue }) => {

        try {

            const response = await api.post(API_ROUTES.AI.GENERATE_ANSWER, data);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{
                message: string;
            }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to generate answer"
            );
        }
    }
)

const chatSlice = createSlice({
    name: "chat",

    initialState,

    reducers: {
        clearChatError: (state) => {
            state.error = null;
        },

        clearChat: (state) => {
            state.messages = [];
            state.page = 1;
            state.hasMore = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getChatHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getChatHistory.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.page === 1) {
                    state.messages = action.payload.messages;
                } else {
                    state.messages = [
                        ...action.payload.messages,
                        ...state.messages,
                    ];
                }

                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.hasMore = action.payload.hasMore;
            })

            .addCase(getChatHistory.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload || "Failed to fetch chat history";
            })

            .addCase(generateAnswer.pending, (state) => {
                state.sending = true;
                state.error = null;
            })

            .addCase(generateAnswer.fulfilled, (state) => {
                state.sending = false;
            })

            .addCase(generateAnswer.rejected, (state, action) => {
                state.sending = false;
                state.error = action.payload ||"Failed to generate answer";
            })
    },

});

export const {clearChat, clearChatError,} = chatSlice.actions;

export default chatSlice.reducer;