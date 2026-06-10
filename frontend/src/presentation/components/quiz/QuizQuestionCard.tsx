import React from "react";

type Props = {
    questionNumber: number;

    question: string;

    options: string[];

    selectedAnswer?: string;

    onSelect: (
        answer: string
    ) => void;
};

const QuizQuestionCard: React.FC<Props> = ({
    questionNumber,
    question,
    options,
    selectedAnswer,
    onSelect,
}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-8">

            <div className="mb-6">

                <span className="text-sm font-semibold text-red-600">

                    Question {questionNumber}

                </span>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {question}
                </h2>

            </div>

            <div className="space-y-4">

                {options.map((option) => {

                    const selected =
                        selectedAnswer === option;

                    return (

                        <button
                            key={option}
                            type="button"
                            onClick={() =>
                                onSelect(option)
                            }
                            className={`w-full rounded-2xl border p-4 text-left transition
                                ${
                                    selected
                                        ? `
                                            border-red-500
                                            bg-red-50
                                            text-red-700
                                          `
                                        : `
                                            border-slate-200
                                            hover:border-red-200
                                            hover:bg-slate-50
                                          `
                                }
                            `}
                        >
                            {option}
                        </button>

                    );
                })}

            </div>

        </div>
    );
};

export default QuizQuestionCard;