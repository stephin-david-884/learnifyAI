import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import type { AppDispatch, RootState, } from "../redux/store";

import {
    clearCurrentQuiz,
    clearQuizError,
    clearQuizResult,
    generateQuiz,
    getQuiz,
    getQuizResult,
    getUserQuizzes,
    submitQuiz,
} from "../redux/features/quiz/quizSlice";

export const useQuiz = () => {

    const dispatch =
        useDispatch<AppDispatch>();

    const state =
        useSelector(
            (state: RootState) =>
                state.quiz
        );

    const clearError = () =>
        dispatch(
            clearQuizError()
        );

    const clearResult = () =>
        dispatch(
            clearQuizResult()
        );

    const clearQuiz = () =>
        dispatch(
            clearCurrentQuiz()
        );

    const createQuiz = (
        payload: Parameters<
            typeof generateQuiz
        >[0]
    ) =>
        dispatch(
            generateQuiz(payload)
        ).unwrap();

    const fetchQuiz = (
        quizId: string
    ) =>
        dispatch(
            getQuiz(quizId)
        ).unwrap();

    const fetchQuizResult = useCallback(
        (quizId: string) =>
            dispatch(getQuizResult(quizId)).unwrap(),
        [dispatch]
    );

    const fetchUserQuizzes = (
        page = 1,
        limit = 10
    ) =>
        dispatch(
            getUserQuizzes({
                page,
                limit,
            })
        ).unwrap();

    const submitQuizAnswers = (
        payload: Parameters<typeof submitQuiz>[0]
    ) =>
        dispatch(submitQuiz(payload)).unwrap();

    return {

        ...state,

        clearError,
        clearResult,
        clearQuiz,

        createQuiz,
        fetchQuiz,
        fetchQuizResult,
        fetchUserQuizzes,
        submitQuizAnswers,
    };
};