import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type DocumentItem, type DocumentState, type GetUserDocumentsQuery, type PaginatedDocumentsResponse, type UploadDocumentPayload } from "../../../types/document";
import { API_ROUTES } from "../../../constants/api.routes";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";

const initialState: DocumentState = {
    documents: [],
    selectedDocument: null,
    viewerUrl: null,
    viewerLoading: false,
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    loading: false,
    uploadLoading: false,
    deleting: false,
    error: null
};

export const uploadDocument = createAsyncThunk<
    DocumentItem,
    UploadDocumentPayload,
    { rejectValue: string }
>(
    "document/uploadDocument",

    async (data, { rejectWithValue }) => {
        try {

            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("file", data.file);

            const response = await api.post(API_ROUTES.DOCUMENT.UPLOAD_DOCUMENT,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                },
            );

            return response.data.data;

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(err.response?.data?.message || "Failed to upload document")
        }
    }
);

export const getUserDocuments = createAsyncThunk<
    PaginatedDocumentsResponse,
    GetUserDocumentsQuery | undefined,
    { rejectValue: string }
>(
    "document/getUserDocuments",

    async (params, { rejectWithValue }) => {
        try {

            const response = await api.get(API_ROUTES.DOCUMENT.GET_USER_DOCUMENTS, { params });

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(err.response?.data?.message || "Failed to fetch documents");
        }
    }
);

export const getDocumentById = createAsyncThunk<
    DocumentItem,
    string,
    { rejectValue: string }
>(
    "document/getDocumentById",

    async (documentId, { rejectWithValue }) => {
        try {
            const response = await api.get(API_ROUTES.DOCUMENT.GET_DOCUMENT_BY_ID(documentId));

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(err.response?.data?.message || "Failed to fetch document")
        }
    }
);

export const getDocumentViewerUrl = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "document/getDocumentViewerUrl",

    async (documentId, { rejectWithValue }) => {

        try {

            const response =
                await api.get(
                    API_ROUTES.DOCUMENT.GET_DOCUMENT_VIEWER_URL(
                        documentId
                    )
                );

            return response.data.data.url;

        } catch (error) {

            const err =
                error as AxiosError<{
                    message: string;
                }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch document viewer url"
            );
        }
    }
);

export const deleteDocument = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "document/deleteDocument",

    async (documentId, { rejectWithValue }) => {
        try {

            await api.delete(API_ROUTES.DOCUMENT.DELETE_DOCUMENT(documentId));

            return documentId;

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(err.response?.data?.message || "Failed to delete document")
        }
    }
)

const documentSlice = createSlice({
    name: "document",

    initialState,

    reducers: {
        clearDocumentError: (state) => {
            state.error = null;
        },

        clearSelectedDocument: (state) => {
            state.selectedDocument = null;
        },

        clearViewerUrl: (state) => {
            state.viewerUrl = null;
        },
    },

    extraReducers: (builder) => {

        builder
            .addCase(uploadDocument.pending, (state) => {
                state.uploadLoading = true;
                state.error = null;
            })

            .addCase(uploadDocument.fulfilled, (state, action) => {
                state.uploadLoading = false;
                state.documents.unshift(action.payload);
            })

            .addCase(uploadDocument.rejected, (state, action) => {
                state.uploadLoading = false;

                state.error = action.payload || "Failed to upload document";
            })

            .addCase(getUserDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUserDocuments.fulfilled, (state, action) => {
                state.loading = false;
                state.documents = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
            })

            .addCase(getUserDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch documents";
            })

            .addCase(getDocumentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getDocumentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDocument = action.payload;
            })

            .addCase(getDocumentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch document";
            })

            .addCase(deleteDocument.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })

            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.deleting = false;
                state.documents = state.documents.filter((doc) => doc.id !== action.payload);
            })

            .addCase(deleteDocument.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Failed to delete document";
            })

            .addCase(getDocumentViewerUrl.pending, (state) => {

                state.viewerLoading = true;
                state.error = null;
            }
            )

            .addCase(getDocumentViewerUrl.fulfilled, (state, action) => {

                state.viewerLoading = false;
                state.viewerUrl = action.payload;
            }
            )

            .addCase(getDocumentViewerUrl.rejected, (state, action) => {

                state.viewerLoading = false;
                state.error = action.payload || "Failed to fetch viewer url";
            }
            )
    }
});

export const { clearDocumentError, clearSelectedDocument, clearViewerUrl, } = documentSlice.actions;

export default documentSlice.reducer;