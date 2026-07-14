import { useCallback,} from "react";
import { useDispatch, useSelector,} from "react-redux";
import type { AppDispatch, RootState,} from "../redux/store";

import {

    clearCurrentInterview,
    clearInterviewError,
    clearInterviewResult,
    completeInterview,
    generateInterview,
    getInterview,
    getInterviewResult,
    getUserInterviews,
    submitInterview,

} from "../redux/features/interview/interviewSlice";

export const useInterview = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector(( state: RootState) => state.interview);

    const clearError = () => dispatch( clearInterviewError());

    const clearResult = () =>
        dispatch( clearInterviewResult());

    const clearInterview = () => dispatch( clearCurrentInterview());

    const createInterview = (
        payload: Parameters<
            typeof generateInterview
        >[0]
    ) =>
        dispatch(generateInterview(payload)).unwrap();

    const fetchInterview = (
        interviewId: string
    ) =>
        dispatch(getInterview( interviewId )).unwrap();

    const fetchInterviewResult = useCallback( ( interviewId: string) =>
                dispatch( getInterviewResult( interviewId ) ).unwrap(),
            [dispatch]);

    const fetchUserInterviews = ( page = 1, limit = 10 ) =>
        dispatch( getUserInterviews({ page, limit,})).unwrap();

    const submitInterviewAnswers = (
        payload: Parameters<
            typeof submitInterview
        >[0]
    ) =>
        dispatch( submitInterview( payload )).unwrap();

    const completeInterviewSession = (
        interviewId: string
    ) =>
        dispatch( completeInterview( interviewId )).unwrap();

    return {

        ...state,
        clearError,
        clearResult,
        clearInterview,
        createInterview,
        fetchInterview,
        fetchInterviewResult,
        fetchUserInterviews,
        submitInterviewAnswers,
        completeInterviewSession,
    };
};