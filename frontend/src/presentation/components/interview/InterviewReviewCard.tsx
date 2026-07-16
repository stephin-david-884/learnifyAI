import React from "react";
import { CheckCircle2, AlertTriangle, MessageSquare, Star } from "lucide-react";

import type { InterviewReviewItem } from "../../../types/interview";

type Props = {
    review: InterviewReviewItem;
};

const InterviewReviewCard: React.FC<Props> = ({
    review,
}) => {

    const scoreColor =
        review.score >= 80
            ? "bg-emerald-100 text-emerald-700"

            : review.score >= 60
            ? "bg-amber-100 text-amber-700"

            : "bg-red-100 text-red-700";

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                <div>

                    <h3 className="text-lg font-bold text-slate-900">

                        {review.question}

                    </h3>

                </div>

                <div
                    className={`rounded-2xl px-4 py-2 text-lg font-bold ${scoreColor}`}
                >
                    {review.score}/100
                </div>

            </div>

            <div className="mt-6">

                <div className="mb-2 flex items-center gap-2">

                    <MessageSquare
                        size={18}
                        className="text-red-500"
                    />

                    <h4 className="font-semibold text-slate-800">

                        Your Answer

                    </h4>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-slate-700 whitespace-pre-wrap">

                    {review.transcript ||

                        "No answer submitted."}

                </div>

            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <div className="mb-2 flex items-center gap-2">

                    <Star
                        size={18}
                        className="text-blue-600"
                    />

                    <h4 className="font-semibold text-blue-800">

                        AI Feedback

                    </h4>

                </div>

                <p className="text-sm leading-7 text-blue-700">

                    {review.feedback}

                </p>

            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <CheckCircle2
                            className="text-emerald-600"
                            size={18}
                        />

                        <h4 className="font-semibold text-slate-900">

                            Strengths

                        </h4>

                    </div>

                    <div className="flex flex-wrap gap-2">

                        {review.strengths.length > 0 ? (

                            review.strengths.map(
                                (
                                    strength
                                ) => (

                                    <span
                                        key={strength}
                                        className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                                    >
                                        {strength}
                                    </span>

                                )
                            )

                        ) : (

                            <span className="text-sm text-slate-400">

                                None

                            </span>

                        )}

                    </div>

                </div>

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <AlertTriangle
                            className="text-amber-500"
                            size={18}
                        />

                        <h4 className="font-semibold text-slate-900">

                            Improvements

                        </h4>

                    </div>

                    <div className="flex flex-wrap gap-2">

                        {review.improvements.length > 0 ? (

                            review.improvements.map(
                                (
                                    item
                                ) => (

                                    <span
                                        key={item}
                                        className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700"
                                    >
                                        {item}
                                    </span>

                                )
                            )

                        ) : (

                            <span className="text-sm text-slate-400">

                                None

                            </span>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default InterviewReviewCard;