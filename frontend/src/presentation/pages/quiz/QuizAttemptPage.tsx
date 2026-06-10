import React, { useEffect, useMemo, useState,} from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import Spinner
from "../../components/common/Spinner";

import QuizProgressBar
from "../../components/quiz/QuizProgressBar";

import QuizQuestionCard
from "../../components/quiz/QuizQuestionCard";

import { useQuiz }
from "../../../hooks/useQuiz";

const QuizAttemptPage: React.FC = () => {

    const { quizId } =
        useParams();

    const navigate =
        useNavigate();

    const {
        currentQuiz,
        loading,
        submitting,

        fetchQuiz,
        submitQuizAnswers,
    } = useQuiz();

    const [
        currentQuestionIndex,
        setCurrentQuestionIndex,
    ] = useState(0);

    const [
        answers,
        setAnswers,
    ] = useState<
        Record<number, string>
    >({});

    useEffect(() => {

        if (!quizId) {
            return;
        }

        fetchQuiz(quizId);

    }, [quizId]);

    const currentQuestion =
        currentQuiz?.questions[
            currentQuestionIndex
        ];

    const answeredCount =
        Object.keys(
            answers
        ).length;

    const progress =
        useMemo(() => {

            if (!currentQuiz) {
                return 0;
            }

            return answeredCount;

        }, [
            answeredCount,
            currentQuiz,
        ]);

    const handleSelectAnswer = (
        answer: string
    ) => {

        setAnswers((prev) => ({
            ...prev,

            [currentQuestionIndex]:
                answer,
        }));
    };

    const goNext = () => {

        if (
            !currentQuiz
        ) {
            return;
        }

        if (
            currentQuestionIndex <
            currentQuiz.questions.length - 1
        ) {

            setCurrentQuestionIndex(
                (prev) => prev + 1
            );
        }
    };

    const goPrevious = () => {

        if (
            currentQuestionIndex > 0
        ) {

            setCurrentQuestionIndex(
                (prev) => prev - 1
            );
        }
    };

    const handleSubmitQuiz =
        async () => {

            if (
                !currentQuiz ||
                !quizId
            ) {
                return;
            }

            if (
                answeredCount !==
                currentQuiz.questions.length
            ) {

                await Swal.fire({
                    icon: "warning",

                    title:
                        "Incomplete Quiz",

                    text:
                        "Please answer all questions before submitting.",
                });

                return;
            }

            const confirmed =
                await Swal.fire({
                    icon: "question",

                    title:
                        "Submit Quiz?",

                    text:
                        "You won't be able to change answers after submission.",

                    showCancelButton: true,

                    confirmButtonColor:
                        "#dc2626",
                });

            if (
                !confirmed.isConfirmed
            ) {
                return;
            }

            const payload =
                Object.entries(
                    answers
                ).map(
                    ([
                        questionIndex,
                        selectedAnswer,
                    ]) => ({
                        questionIndex:
                            Number(
                                questionIndex
                            ),

                        selectedAnswer,
                    })
                );

            await submitQuizAnswers({
                quizId,
                answers: payload,
            });

            navigate(
                `/quizzes/${quizId}/result`
            );
        };

    if (
        loading ||
        !currentQuiz
    ) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* Header */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                <h1 className="text-2xl font-bold text-slate-900">
                    {currentQuiz.title}
                </h1>

                <p className="mt-2 text-sm text-slate-500">

                    Question
                    {" "}
                    {currentQuestionIndex + 1}
                    {" "}
                    of
                    {" "}
                    {currentQuiz.totalQuestions}

                </p>

                <div className="mt-5">

                    <QuizProgressBar
                        current={progress}
                        total={
                            currentQuiz.totalQuestions
                        }
                    />

                </div>
            </div>

            {/* Question */}

            {currentQuestion && (

                <QuizQuestionCard
                    questionNumber={
                        currentQuestionIndex + 1
                    }
                    question={
                        currentQuestion.question
                    }
                    options={
                        currentQuestion.options
                    }
                    selectedAnswer={
                        answers[
                            currentQuestionIndex
                        ]
                    }
                    onSelect={
                        handleSelectAnswer
                    }
                />

            )}

            {/* Footer */}

            <div className="flex items-center justify-between">

                <button
                    onClick={goPrevious}
                    disabled={
                        currentQuestionIndex === 0
                    }
                    className="
                        flex items-center gap-2
                        rounded-2xl
                        border border-slate-200
                        px-5 py-3
                        font-medium
                        disabled:opacity-40
                    "
                >
                    <ChevronLeft size={18} />

                    Previous
                </button>

                {currentQuestionIndex <
                currentQuiz.questions.length - 1 ? (

                    <button
                        onClick={goNext}
                        className="
                            flex items-center gap-2
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-500
                            to-rose-600
                            px-5 py-3
                            font-semibold
                            text-white
                        "
                    >
                        Next

                        <ChevronRight
                            size={18}
                        />
                    </button>

                ) : (

                    <button
                        onClick={
                            handleSubmitQuiz
                        }
                        disabled={submitting}
                        className="
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-500
                            to-rose-600
                            px-6 py-3
                            font-semibold
                            text-white
                            disabled:opacity-50
                        "
                    >
                        {submitting
                            ? "Submitting..."
                            : "Submit Quiz"}
                    </button>

                )}
            </div>
        </div>
    );
};

export default QuizAttemptPage;