import React from "react";
import { Brain, Sparkles } from "lucide-react";

import type { InterviewDifficulty } from "../../../types/interview";

type Props = {

    question: string;
    difficulty: InterviewDifficulty;
    isRecording?: boolean;
};

const difficultyStyles: Record<
    InterviewDifficulty,
    string
> = {

    EASY:
        "bg-emerald-100 text-emerald-700",

    MEDIUM:
        "bg-amber-100 text-amber-700",

    HARD:
        "bg-red-100 text-red-700",

};

const InterviewQuestionCard: React.FC<Props> = ({
    question,
    difficulty,
    isRecording=false
}) => {

    return (

        <div className={`rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300
            ${isRecording ? "border-red-500 shadow-lg shadow-red-500/20" : "border-slate-200"}
        `}>

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                        <Brain className="text-red-600" />

                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">

                            Interview Question

                        </h2>

                        <p className="text-sm text-slate-500">

                            Read the question carefully before answering.

                        </p>

                    </div>

                </div>

                <div className={`rounded-xl px-4 py-2 text-sm font-semibold ${difficultyStyles[difficulty]}`}
                >

                    {difficulty}

                </div>

            </div>

            {isRecording && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

                    <span className="font-medium text-red-700">
                        Recording...
                    </span>
                </div>
            )}

            <div className="mt-8 rounded-3xl bg-slate-50 p-8">

                <div className="flex items-start gap-4">

                    <Sparkles
                        size={24}
                        className="mt-1 shrink-0 text-red-500"
                    />

                    <p className="text-2xl font-semibold leading-10 text-slate-900">

                        {question}

                    </p>

                </div>

            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                <h3 className="font-semibold text-blue-700">

                    Interview Tip

                </h3>

                <p className="mt-2 text-sm leading-7 text-blue-700">

                    Focus on explaining your understanding clearly.
                    You are not required to use exact textbook
                    definitions. The AI evaluates your conceptual
                    understanding, reasoning, and communication.

                </p>

            </div>

        </div>

    );

};

export default InterviewQuestionCard;