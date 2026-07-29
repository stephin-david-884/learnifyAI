import React from "react";
import { RotateCcw, Volume2, Sparkles } from "lucide-react";
import type { InterviewDifficulty } from "../../../types/interview";

type Props = {

    question: string;
    difficulty: InterviewDifficulty;
    isSpeaking: boolean;
    onReplay: () => void;

};

const difficultyStyles: Record<
    InterviewDifficulty,
    string
> = {

    EASY: "bg-emerald-100 text-emerald-700",
    MEDIUM: "bg-amber-100 text-amber-700",
    HARD: "bg-red-100 text-red-700",

};

const QuestionBubble: React.FC<Props> = ({

    question,
    difficulty,
    isSpeaking,
    onReplay,

}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Interview Question

                    </h2>

                    <p className="mt-1 text-slate-500">

                        Listen carefully before answering.

                    </p>

                </div>

                <div className="flex items-center gap-3">

                    <span
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${difficultyStyles[difficulty]}`}
                    >
                        {difficulty}
                    </span>

                    <button
                        onClick={onReplay}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >

                        <RotateCcw size={16}/>

                        Replay

                    </button>

                </div>

            </div>

            {/* Speaking Indicator */}

            <div className="mt-4">

                {isSpeaking ? (

                    <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">

                        <Volume2
                            size={18}
                            className="animate-pulse text-red-600"
                        />

                        <div>

                            <p className="font-semibold text-red-700">

                                Interviewer is speaking...

                            </p>

                            <p className="text-sm text-red-600">

                                Please listen before starting your answer.

                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">

                        <Volume2
                            size={18}
                            className="text-emerald-600"
                        />

                        <div>

                            <p className="font-semibold text-emerald-700">

                                Ready for your answer

                            </p>

                            <p className="text-sm text-emerald-600">

                                Click "Start Recording" whenever you're ready.

                            </p>

                        </div>

                    </div>

                )}

            </div>

            {/* Speech Bubble */}

            <div className="relative mt-5">

                <div
                    className={`rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300

                        ${isSpeaking ? "border-red-200 bg-red-50" : ""}

                    `}
                >

                    <div className="flex items-start gap-3">

                        <Sparkles
                            size={22}
                            className={`mt-1 shrink-0
                                ${ isSpeaking ? "text-red-500" : "text-slate-400" }
                            `}
                        />

                        <p className="text-xl font-semibold leading-9 text-slate-900">

                            {question}

                        </p>

                    </div>

                </div>

            </div>

            {/* Tip */}

            {/* <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                <h3 className="font-semibold text-blue-700">

                    Interview Tip

                </h3>

                <p className="mt-2 text-sm leading-7 text-blue-700">

                    Focus on explaining your understanding naturally.
                    The interviewer is evaluating your reasoning,
                    communication, and conceptual clarity—not whether
                    you memorize textbook definitions.

                </p>

            </div> */}

        </div>

    );

};

export default QuestionBubble;