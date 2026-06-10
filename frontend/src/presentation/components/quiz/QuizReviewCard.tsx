import React from "react";
import {
    CheckCircle2,
    XCircle,
} from "lucide-react";

import type {
    QuizReviewItem,
} from "../../../types/quiz";

type Props = {
    review: QuizReviewItem;

    questionNumber: number;
};

const QuizReviewCard: React.FC<Props> = ({
    review,
    questionNumber,
}) => {

    return (
        <div
            className="rounded-3xl border border-slate-200 bg-white p-6"
        >
            <div className="flex items-start justify-between gap-4">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        Question {questionNumber}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                        {review.question}
                    </h3>

                </div>

                {review.isCorrect ? (

                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1 text-emerald-600">

                        <CheckCircle2 size={18} />

                        Correct

                    </div>

                ) : (

                    <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-1 text-red-600">

                        <XCircle size={18} />

                        Wrong

                    </div>

                )}
            </div>

            <div className="mt-5 space-y-3">

                {review.options.map(
                    (option) => {

                        const isSelected =
                            option ===
                            review.selectedAnswer;

                        const isCorrect =
                            option ===
                            review.correctAnswer;

                        let classes =
                            "border-slate-200";

                        if (isCorrect) {
                            classes =
                                "border-emerald-500 bg-emerald-50";
                        }

                        if (
                            isSelected &&
                            !isCorrect
                        ) {
                            classes =
                                "border-red-500 bg-red-50";
                        }

                        return (
                            <div
                                key={option}
                                className={` rounded-2xl border p-3 ${classes}`}
                            >
                                {option}
                            </div>
                        );
                    }
                )}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                <p className="text-sm font-semibold text-slate-900">
                    Explanation
                </p>

                <p className="mt-2 text-sm text-slate-600">
                    {review.explanation}
                </p>

            </div>

            <div className="mt-4 flex justify-end">

                <span
                    className="rounded-xl bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
                >
                    {review.difficulty}
                </span>

            </div>
        </div>
    );
};

export default QuizReviewCard;