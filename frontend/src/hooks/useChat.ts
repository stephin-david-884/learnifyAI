import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { clearChat, clearChatError, generateAnswer, getChatHistory } from "../redux/features/chat/chatSlice";

export const useChat = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        messages,
        loading,
        sending,
        page,
        limit,
        hasMore,
        error,
    } = useSelector((state: RootState) => state.chat);

    const clearError = () => {
        dispatch(clearChatError());
    };

    const resetChat = () => {
        dispatch(clearChat());
    };

    const fetchChatHistory = async (documentId: string, page = 1, limit = 20) => {

        return dispatch(
            getChatHistory({
                documentId,
                page,
                limit,
            })
        ).unwrap();
    };

    const askQuestion = async (documentId: string, question: string) => {

        const result =
            await dispatch(
                generateAnswer({
                    documentId,
                    question,
                })
            ).unwrap();

        await dispatch(
            getChatHistory({
                documentId,
                page: 1,
                limit,
            })
        );

        return result;
    };

    return {

        messages,

        loading,
        sending,

        page,
        limit,

        hasMore,

        error,

        clearError,
        resetChat,

        fetchChatHistory,
        askQuestion,
    };
}