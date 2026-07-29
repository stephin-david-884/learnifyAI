import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import { useInterview } from "../../../hooks/useInterview";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";

import type {
    InterviewAnswerPayload,
} from "../../../types/interview";

import InterviewProgress from "../../components/interview/InterviewProgress";
import TranscriptCard from "../../components/interview/TranscriptCard";
import RecordingControls from "../../components/interview/RecordingControls";
import InterviewTimer from "../../components/interview/InterviewTimer";
import InterviewPresenter from "../../components/interview/InterviewPresenter";

const FIVE_QUESTION_DURATION = 10 * 60;

const TEN_QUESTION_DURATION = 20 * 60;

const InterviewSessionPage: React.FC = () => {

    const { interviewId } = useParams();

    const navigate = useNavigate();

    const {

        loading,

        submitting,

        completing,

        currentInterview,

        fetchInterview,

        submitInterviewAnswers,

        completeInterviewSession,

    } = useInterview();

    const {

        transcript,

        isRecording,

        browserSupported,

        error,

        startRecording,

        stopRecording,

        retryRecording,

        resetTranscript,

        loadTranscript,

    } = useSpeechRecognition();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState<Record<number, string>>({});

    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

    const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);

    const isBusy = submitting || completing;

    const autoSubmittedRef = useRef(false);

    /*
    Fetch Interview
    */

    useEffect(() => {

        if (!interviewId) {

            navigate("/interviews");

            return;

        }

        fetchInterview(interviewId)

            .catch(async () => {

                await Swal.fire({

                    icon: "error",

                    title: "Interview not found",

                    text: "Unable to load interview.",

                });

                navigate("/interviews");

            });

    }, [

        interviewId,

        // fetchInterview,

        navigate,

    ]);

    /*
    Timer
    */

    useEffect(() => {

        if (!currentInterview) {

            return;

        }

        autoSubmittedRef.current = false;

        const duration =

            currentInterview.totalQuestions === 5

                ? FIVE_QUESTION_DURATION

                : TEN_QUESTION_DURATION;

        setRemainingSeconds(duration);

    }, [currentInterview,]);

    /*
    Countdown
    */

    useEffect(() => {

        if (remainingSeconds === null || remainingSeconds <= 0 || isBusy) {

            return;
        }

        const interval =
            window.setInterval(() => {

                setRemainingSeconds(
                    prev => {
                        if (prev === null || prev <= 0) {
                            return 0;
                        }

                        return prev - 1;
                    }
                );

            }, 1000);

        return () => {

            clearInterval(interval);

        };

    }, [remainingSeconds, isBusy]);

    /*
    Current Question
    */

    const currentQuestion =

        useMemo(() => {

            if (!currentInterview) {

                return null;

            }

            return currentInterview.questions[
                currentQuestionIndex
            ];

        }, [

            currentInterview,

            currentQuestionIndex,

        ]);

    /*
    Progress
    */

    const progress =

        useMemo(() => {

            if (!currentInterview) {

                return 0;

            }

            return (

                (

                    (currentQuestionIndex + 1)

                    / currentInterview.totalQuestions

                ) * 100

            );

        }, [

            currentInterview,

            currentQuestionIndex,

        ]);

    /*
    Restore Saved Transcript
    */

    useEffect(() => {

        loadTranscript(

            answers[currentQuestionIndex] ?? ""

        );

    }, [

        currentQuestionIndex,

        answers,

        loadTranscript,

    ]);

    /*
    Save Current Transcript
    */

    const saveCurrentTranscript =

        useCallback(() => {

            setAnswers(

                prev => ({

                    ...prev,

                    [currentQuestionIndex]:

                        transcript.trim(),

                })

            );

        }, [

            transcript,

            currentQuestionIndex,

        ]);

    /*
    Navigation
    */

    const handleNext = () => {

        stopRecording();

        saveCurrentTranscript();

        if (!currentInterview) {

            return;

        }

        if (

            currentQuestionIndex >=

            currentInterview.totalQuestions - 1

        ) {

            return;

        }

        setCurrentQuestionIndex(

            prev => prev + 1

        );

    };

    const handlePrevious = () => {

        stopRecording();

        saveCurrentTranscript();

        if (currentQuestionIndex === 0) {

            return;

        }

        setCurrentQuestionIndex(

            prev => prev - 1

        );

    };

    /*
    Re-record Answer
    */

    const handleRetryRecording = () => {

        retryRecording();

        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: "", })

        );

    };

    const handleFinishInterview =
        useCallback(async (autoSubmit = false) => {

            if (!currentInterview || !interviewId) {

                return;
            }

            stopRecording();

            saveCurrentTranscript();

            if (!autoSubmit) {

                const result =
                    await Swal.fire({

                        title: "Finish Interview?",
                        text: "You won't be able to edit your answers after submission.",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Submit",

                    });

                if (!result.isConfirmed) {

                    return;

                }
            }

            try {

                const payload: InterviewAnswerPayload[] =

                    currentInterview.questions.map(
                        (_, index) => ({

                            questionIndex: index,

                            transcript:
                                index === currentQuestionIndex
                                    ? transcript.trim()
                                    : answers[index]?.trim() ?? "",

                        })
                    );

                await submitInterviewAnswers({

                    interviewId,

                    answers: payload,

                });

                await completeInterviewSession(interviewId);

                resetTranscript();

                navigate(`/interviews/${interviewId}/result`);

            } catch {

                await Swal.fire({

                    icon: "error",

                    title: "Submission Failed",
                    text: "Unable to complete interview.",

                });

            }

        },

            [answers, currentInterview, interviewId, navigate, saveCurrentTranscript,
                stopRecording, submitInterviewAnswers, completeInterviewSession,]

        );

    /*
    Auto Submit
    */

    useEffect(() => {

        if (remainingSeconds === null || remainingSeconds > 0) {
            return;
        }

        if (autoSubmittedRef.current) {
            return;
        }

        autoSubmittedRef.current = true;

        void handleFinishInterview(true);

    }, [remainingSeconds, handleFinishInterview]);

    /*
    Cleanup
    */

    useEffect(() => {

        return () => { stopRecording(); };

    }, [stopRecording]);

    /*
    Browser Support
    */

    if (!browserSupported) {

        return (

            <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

                <h2 className="text-xl font-bold text-red-700">

                    Browser Not Supported

                </h2>

                <p className="mt-2 text-red-600">

                    Your browser doesn't support
                    speech recognition.

                    Please use Google Chrome
                    or Microsoft Edge.

                </p>

            </div>

        );

    }

    if (loading || !currentInterview || !currentQuestion) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <Spinner />

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-7xl space-y-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-900">

                        {currentInterview.title}

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Answer each question naturally.
                        Your interview will automatically
                        submit when the timer expires.

                    </p>

                </div>

                <div className="w-full lg:w-[300px]">

                    <InterviewTimer

                        remainingSeconds={remainingSeconds ?? 0}

                        totalSeconds={

                            currentInterview.totalQuestions === 5

                                ? FIVE_QUESTION_DURATION

                                : TEN_QUESTION_DURATION

                        }

                    />

                </div>

            </div>


            <InterviewProgress

                currentQuestion={

                    currentQuestionIndex + 1

                }

                totalQuestions={

                    currentInterview.totalQuestions

                }

                progress={progress}

            />


            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">


                <div className="space-y-6 xl:col-span-2">


                    <InterviewPresenter
                        question={currentQuestion.question}
                        difficulty={currentQuestion.difficulty}
                        onSpeakingChange={setIsInterviewerSpeaking}
                    />

                    {isInterviewerSpeaking && (

                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

                            <p className="text-sm font-medium text-amber-700">

                                Please wait until the interviewer finishes asking the question.

                            </p>

                        </div>

                    )}

                    <RecordingControls
                        isRecording={isRecording}
                        hasTranscript={transcript.trim().length > 0}
                        disabled={isBusy || isInterviewerSpeaking}
                        onStart={startRecording}
                        onStop={stopRecording}
                        onRetry={handleRetryRecording}
                    />

                    {error && (

                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">

                            {error}

                        </div>

                    )}


                    <TranscriptCard

                        transcript={

                            transcript

                        }

                    />


                </div>


                <div className="space-y-5">


                    <div className="rounded-3xl border border-slate-200 bg-white p-6">


                        <h3 className="text-lg font-bold text-slate-900">

                            Interview Progress

                        </h3>


                        <div className="mt-4 space-y-3">


                            {currentInterview.questions.map(

                                (_, index) => {


                                    const answered =

                                        Boolean(

                                            answers[index]

                                        );


                                    const active = currentQuestionIndex === index;


                                    return (

                                        <button

                                            key={index}

                                            disabled={isBusy}

                                            onClick={() => {

                                                stopRecording();

                                                saveCurrentTranscript();

                                                setCurrentQuestionIndex(

                                                    index

                                                );

                                            }}

                                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 transition

                                                ${active

                                                    ? "border-red-500 bg-red-50"

                                                    : "border-slate-200 hover:border-red-300"

                                                }

                                            `}

                                        >

                                            <span className="font-medium">

                                                Question {index + 1}

                                            </span>


                                            {answered ? (

                                                <span className="text-sm font-semibold text-emerald-600">

                                                    Answered

                                                </span>

                                            ) : (

                                                <span className="text-sm text-slate-400">

                                                    Pending

                                                </span>

                                            )}


                                        </button>

                                    );

                                }

                            )}


                        </div>


                    </div>


                </div>


            </div>


            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:justify-between">


                <button

                    onClick={handlePrevious}

                    disabled={currentQuestionIndex === 0 || isBusy || isInterviewerSpeaking}

                    className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    Previous Question

                </button>


                <div className="flex gap-3">


                    {currentQuestionIndex <

                        currentInterview.totalQuestions - 1 ? (


                        <button

                            onClick={handleNext}

                            disabled={isBusy || isInterviewerSpeaking}

                            className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"

                        >

                            {isBusy ? "Please wait..." : "Save & Next"}

                        </button>


                    ) : (


                        <button

                            onClick={() => handleFinishInterview()}

                            disabled={isBusy || isInterviewerSpeaking}

                            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"

                        >

                            {submitting ? "Submitting..." : completing ? "Evaluating..." : "Finish Interview"}

                        </button>


                    )}


                </div>


            </div>


        </div>

    );

};


export default InterviewSessionPage;