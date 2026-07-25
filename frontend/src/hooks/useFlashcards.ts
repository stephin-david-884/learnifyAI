import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { clearCurrentFlashcardSet, clearFlashcardError, deleteFlashcardSet, generateFlashcards, getFlashcardSet, getUserFlashcardSets } from "../redux/features/flashcard/flashcardSlice";
import { useCallback } from "react";

export const useFlashcards = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: RootState) => state.flashcard);

    const clearError = () => dispatch(clearFlashcardError());

    const clearCurrentSet = () => dispatch(clearCurrentFlashcardSet());

    const createFlashcards = (
        payload: Parameters<typeof generateFlashcards>[0]
    ) => dispatch(generateFlashcards(payload)).unwrap();

    const fetchUserFlashcardSets = useCallback((page = 1, limit = 10, search?: string) =>
        dispatch(
            getUserFlashcardSets({ page, limit, search })).unwrap(),
        [dispatch]);

    const fetchFlashcardSet = useCallback((flashcardSetId: string) =>
        dispatch(getFlashcardSet(flashcardSetId)).unwrap(),
        [dispatch]);

    const deleteSet = useCallback((flashcardSetId: string) =>
        dispatch(deleteFlashcardSet(flashcardSetId)).unwrap(),
        [dispatch]);

    return {
        ...state,
        clearError,
        clearCurrentSet,
        createFlashcards,
        fetchUserFlashcardSets,
        fetchFlashcardSet,
        deleteSet
    };    
};