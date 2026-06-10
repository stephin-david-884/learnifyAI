import React, {
    useEffect,
} from "react";

import {
    Trophy,
    ArrowLeft,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import QuizReviewCard
from "../../components/quiz/QuizReviewCard";

import { useQuiz }
from "../../../hooks/useQuiz";

const QuizResultPage: React.FC = () => {

    const navigate =
        useNavigate();

    const {
        quizResult,
    } = useQuiz();

    useEffect(() => {

        if (!quizResult) {

            navigate("/quizzes");
        }

    }, [quizResult]);

    if (!quizResult) {
        return null;
    }

    const percentage =
        quizResult.percentage;

    const scoreColor =
        percentage >= 80
            ? "text-emerald-600"
            : percentage >= 50
                ? "text-amber-600"
                : "text-red-600";

    const message =
        percentage >= 80
            ? "Excellent Work!"
            : percentage >= 50
                ? "Good Effort!"
                : "Keep Practicing!";

    return (
        <div className="mx-auto max-w-5xl space-y-6">

            <Link
                to="/quizzes"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft size={16} />

                Back To Quizzes
            </Link>

            {/* Score Card */}

            <div
                className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    text-center
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-red-50
                    "
                >
                    <Trophy
                        size={40}
                        className="text-red-600"
                    />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-slate-900">
                    Quiz Results
                </h1>

                <div
                    className={`mt-4 text-6xl font-bold ${scoreColor}`}
                >
                    {percentage}%
                </div>

                <p className="mt-2 text-lg font-medium text-slate-600">
                    {message}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4">

                    <div className="rounded-2xl bg-slate-50 p-4">

                        <p className="text-sm text-slate-500">
                            Total
                        </p>

                        <p className="text-2xl font-bold">
                            {quizResult.totalQuestions}
                        </p>

                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-4">

                        <p className="text-sm text-emerald-600">
                            Correct
                        </p>

                        <p className="text-2xl font-bold text-emerald-600">
                            {quizResult.correctAnswers}
                        </p>

                    </div>

                    <div className="rounded-2xl bg-red-50 p-4">

                        <p className="text-sm text-red-600">
                            Wrong
                        </p>

                        <p className="text-2xl font-bold text-red-600">
                            {
                                quizResult.totalQuestions -
                                quizResult.correctAnswers
                            }
                        </p>

                    </div>

                </div>
            </div>

            {/* Review */}

            <div className="space-y-5">

                {quizResult.review.map(
                    (
                        review,
                        index
                    ) => (

                        <QuizReviewCard
                            key={index}
                            review={review}
                            questionNumber={
                                index + 1
                            }
                        />

                    )
                )}

            </div>
        </div>
    );
};

export default QuizResultPage;