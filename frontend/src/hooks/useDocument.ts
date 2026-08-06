import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { clearDocumentError, clearSelectedDocument, clearViewerUrl, getDocumentViewerUrl, deleteDocument, getDocumentById, getUserDocuments, uploadDocument } from "../redux/features/document/documentSlice";
import type { GetUserDocumentsQuery, UploadDocumentPayload } from "../types/document";
import { useCallback } from "react";

export const useDocument = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        documents,
        selectedDocument,
        viewerUrl,
        viewerLoading,
        total,
        page,
        limit,
        totalPages,
        loading,
        uploadLoading,
        deleting,
        error,
    } = useSelector((state: RootState) => state.document);

    const clearError = useCallback(() => {
        dispatch(clearDocumentError());
    }, [dispatch]);

    const clearDocument = useCallback(() => {
        dispatch(clearSelectedDocument());
    }, [dispatch]);

    const clearPdfViewer = useCallback(() => {
        dispatch(clearViewerUrl());
    }, [dispatch]);

    const uploadUserDocument = useCallback(
        async (data: UploadDocumentPayload) => {
            return dispatch(uploadDocument(data)).unwrap();
        },
        [dispatch]
    );

    const fetchUserDocuments = useCallback(
        async (params?: GetUserDocumentsQuery) => {
            return dispatch(getUserDocuments(params)).unwrap();
        }, [dispatch]);

    const fetchDocumentById = useCallback(
        async (documentId: string) => {
            return dispatch(getDocumentById(documentId)).unwrap();
        },
        [dispatch]
    );

    const removeDocument = useCallback(
        async (documentId: string) => {
            return dispatch(deleteDocument(documentId)).unwrap();
        },
        [dispatch]
    );

    const fetchViewerUrl = useCallback(
        async (documentId: string) => {
            return dispatch(getDocumentViewerUrl(documentId)).unwrap();
        },
        [dispatch]
    );

    return {
        documents,
        selectedDocument,
        viewerUrl,
        viewerLoading,
        total,
        page,
        limit,
        totalPages,
        loading,
        uploadLoading,
        deleting,
        error,

        clearError,
        clearDocument,
        clearPdfViewer,

        uploadUserDocument,
        fetchUserDocuments,
        fetchDocumentById,
        removeDocument,
        fetchViewerUrl,
    };

}