import React from "react";
import {
    ClipboardList,
    ArrowRight,
    CheckCircle,
    Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type {
    QuizListItem,
} from "../../../types/quiz";

type Props = {
    quiz: QuizListItem;
};

const QuizCard: React.FC<Props> = ({
    quiz,
}) => {

    const navigate =
        useNavigate();

    const handleClick = () => {

        if (quiz.status === "COMPLETED") {

            navigate(
                `/quizzes/${quiz.id}/result`
            );

            return;
        }

        navigate(
            `/quizzes/${quiz.id}`
        );
    };

    return (
        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                transition
                hover:border-red-200
                hover:shadow-lg
            "
        >
            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                        <ClipboardList
                            className="text-red-600"
                        />

                    </div>

                    <div>

                        <h3 className="font-bold text-slate-900">
                            {quiz.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {quiz.totalQuestions} Questions
                        </p>

                    </div>

                </div>

                {quiz.status === "COMPLETED" ? (

                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">

                        <CheckCircle size={16} />

                        Completed

                    </div>

                ) : (

                    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1 text-sm font-medium text-amber-600">

                        <Clock3 size={16} />

                        Ready

                    </div>

                )}

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

                {quiz.generatedFromTopics
                    .slice(0, 4)
                    .map((topic) => (

                        <span
                            key={topic}
                            className="rounded-xl bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                        >
                            {topic}
                        </span>

                    ))}
            </div>

            {quiz.status === "COMPLETED" && (

                <div className="mt-4 rounded-2xl bg-slate-50 p-3">

                    <div className="text-sm text-slate-500">
                        Score
                    </div>

                    <div className="text-xl font-bold text-slate-900">
                        {quiz.score} / {quiz.totalQuestions}
                    </div>

                </div>

            )}

            <button
                onClick={handleClick}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r  from-red-500  to-rose-600  px-4 py-3 font-semibold text-white"
            >
                {quiz.status === "COMPLETED"
                    ? "View Result"
                    : "Start Quiz"}

                <ArrowRight size={18} />
            </button>
        </div>
    );
};

export default QuizCard;