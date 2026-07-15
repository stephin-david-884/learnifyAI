import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams,} from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import { useInterview } from "../../../hooks/useInterview";

import type { InterviewAnswerPayload } from "../../../types/interview";

import InterviewProgress from "../../components/interview/InterviewProgress";
import InterviewQuestionCard from "../../components/interview/InterviewQuestionCard";
import TranscriptCard from "../../components/interview/TranscriptCard";
import RecordingControls from "../../components/interview/RecordingControls";
import InterviewTimer from "../../components/interview/InterviewTimer";

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


    const [currentQuestionIndex, setCurrentQuestionIndex,] = useState(0);

    const [currentTranscript, setCurrentTranscript,] = useState("");

    const [isRecording, setIsRecording,] = useState(false);

    const [answers, setAnswers,] = useState<Record<number, string>>({});

    const [remainingSeconds, setRemainingSeconds,] = useState(0);

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

    }, [interviewId, fetchInterview, navigate,]);


    useEffect(() => {

        if (!currentInterview) {
            return;
        }

        const duration =
            currentInterview.totalQuestions === 5
                ? FIVE_QUESTION_DURATION
                : TEN_QUESTION_DURATION;

        setRemainingSeconds(
            duration
        );

    }, [currentInterview,]);

    const currentQuestion =
        useMemo(() => {

            if (!currentInterview) {
                return null;
            }

            return currentInterview.questions[ currentQuestionIndex];

        }, [currentInterview, currentQuestionIndex,]);

    const progress =
        useMemo(() => {

            if (!currentInterview) {

                return 0;
            }

            return (
                ((currentQuestionIndex + 1) /
                    currentInterview.totalQuestions)
                * 100
            );

        }, [ currentInterview, currentQuestionIndex,]);

    useEffect(() => {

        setCurrentTranscript(

            answers[currentQuestionIndex] ?? ""

        );

    }, [currentQuestionIndex,answers]);

    const saveCurrentTranscript =
        useCallback(() => {

            setAnswers(

                prev => ({

                    ...prev,

                    [
                        currentQuestionIndex
                    ]:
                        currentTranscript.trim(),

                })

            );

        }, [

            currentTranscript,

            currentQuestionIndex,

        ]);


    const handleNext =
        () => {

            saveCurrentTranscript();

            if (!currentInterview) {
                return;
            }

            if (currentQuestionIndex >= currentInterview.totalQuestions - 1) {

                return;
            }

            setCurrentQuestionIndex(prev => prev + 1);

        };

    const handlePrevious =
        () => {

            saveCurrentTranscript();

            if (currentQuestionIndex === 0) {
                return;
            }

            setCurrentQuestionIndex(prev => prev - 1);

        };

    /*
    -------------------------------------------------------
    Recording Placeholder

    (Web Speech API
    will replace these)
    -------------------------------------------------------
    */

    const handleStartRecording =
        () => {

            setIsRecording(true);

        };

    const handleStopRecording =
        () => {

            setIsRecording(false);

        };

    const handleRetryRecording =
        () => {

            setCurrentTranscript("");

            setAnswers(

                prev => ({...prev, [currentQuestionIndex]: "",})

            );

        };

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

                <div className="w-full lg:w-[340px]">

                    <InterviewTimer
                        remainingSeconds={remainingSeconds}
                        totalSeconds={
                            currentInterview.totalQuestions === 5
                                ? FIVE_QUESTION_DURATION
                                : TEN_QUESTION_DURATION
                        }
                    />

                </div>

            </div>

            {/* Progress */}

            <InterviewProgress

                currentQuestion={

                    currentQuestionIndex + 1

                }

                totalQuestions={
                    currentInterview.totalQuestions
                }

                progress={progress}

            />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left */}

                <div className="space-y-6 xl:col-span-2">

                    <InterviewQuestionCard

                        question={

                            currentQuestion.question

                        }

                        difficulty={

                            currentQuestion.difficulty

                        }

                        // questionNumber={

                        //     currentQuestionIndex + 1

                        // }

                        // totalQuestions={

                        //     currentInterview.totalQuestions

                        // }

                        isRecording={

                            isRecording

                        }

                    />

                    <TranscriptCard

                        transcript={
                            currentTranscript
                        }

                        // isRecording={
                        //     isRecording
                        // }

                    />

                </div>

                {/* Right */}

                <div className="space-y-6">

                    <RecordingControls

                        isRecording={
                            isRecording
                        }

                        hasTranscript={

                            currentTranscript
                                .trim()
                                .length > 0

                        }

                        disabled={
                            submitting ||
                            completing
                        }

                        onStart={
                            handleStartRecording
                        }

                        onStop={
                            handleStopRecording
                        }

                        onRetry={
                            handleRetryRecording
                        }

                    />

                    <div className="rounded-3xl border border-slate-200 bg-white p-6">

                        <h3 className="text-lg font-bold text-slate-900">
                            Interview Progress
                        </h3>

                        <div className="mt-6 space-y-3">

                            {currentInterview.questions.map(

                                (_, index) => {

                                    const answered =Boolean(answers[index]);

                                    const active = currentQuestionIndex === index;

                                    return (

                                        <button

                                            key={index}

                                            onClick={() => {

                                                saveCurrentTranscript();

                                                setCurrentQuestionIndex(
                                                    index
                                                );

                                            }}

                                            className={`flex  w-full items-center justify-between rounded-2xl border px-4 py-3 transition
                                                ${active

                                                    ? "border-red-500 bg-red-50"
                                                    : "border-slate-200 hover:border-red-300"

                                                }
                                            `}
                                        >

                                            <span
                                                className="font-medium"
                                            >

                                                Question {index + 1}

                                            </span>

                                            {answered ? (

                                                <span
                                                    className="
                                                        text-sm
                                                        font-semibold
                                                        text-emerald-600
                                                    "
                                                >

                                                    Answered

                                                </span>

                                            ) : (

                                                <span
                                                    className="
                                                        text-sm
                                                        text-slate-400
                                                    "
                                                >

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

            {/* Bottom Navigation */}

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:justify-between">

                <button

                    onClick={handlePrevious}

                    disabled={
                        currentQuestionIndex === 0
                    }

                    className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    Previous Question

                </button>

                <div className="flex gap-3">

                    {currentQuestionIndex <
                        currentInterview.totalQuestions - 1 ? (

                        <button

                            onClick={handleNext}

                            className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"
                        >

                            Save & Next

                        </button>

                    ) : (

                        <button

                            onClick={async () => {

                                saveCurrentTranscript();

                                await Swal.fire({
                                    title:
                                        "Interview Ready",
                                    text: "Interview submission will be implemented after Speech Recognition integration.",
                                    icon: "info",

                                });

                            }}

                            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"
                        >

                            Finish Interview

                        </button>

                    )}

                </div>

            </div>

        </div>

    );

};

export default InterviewSessionPage;