import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { clearDocumentError, clearSelectedDocument, deleteDocument, getDocumentById, getUserDocuments, uploadDocument } from "../redux/features/document/documentSlice";
import type { GetUserDocumentsQuery, UploadDocumentPayload } from "../types/document";

export const useDocument = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        documents,
        selectedDocument,
        total,
        page,
        limit,
        totalPages,
        loading,
        uploadLoading,
        deleting,
        error,
    } = useSelector((state: RootState) => state.document);

    const clearError = () => {
        dispatch(clearDocumentError());
    }

    const clearDocument = () => {
        dispatch(clearSelectedDocument());
    };

    const uploadUserDocument = async(data: UploadDocumentPayload) => {
        return dispatch(uploadDocument(data)).unwrap();
    };

    const fetchUserDocuments = async ( params?: GetUserDocumentsQuery) => {
        return dispatch(getUserDocuments(params)).unwrap();
    };

    const fetchDocumentById = async (documentId: string) => {
        return dispatch(getDocumentById (documentId)).unwrap();
    };

    const removeDocument = async (documentId: string) => {
        return dispatch(deleteDocument(documentId)).unwrap();
    };

    return {
        documents,
        selectedDocument,
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

        uploadUserDocument,
        fetchUserDocuments,
        fetchDocumentById,
        removeDocument,
    };

}