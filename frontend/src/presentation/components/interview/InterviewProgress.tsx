import React from "react";

type Props = {
    currentQuestion: number;

    totalQuestions: number;

    progress: number;
};

const InterviewProgress: React.FC<Props> = ({
    currentQuestion,
    totalQuestions,
    progress,
}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Question {currentQuestion} of {totalQuestions}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Complete each question before moving to the next.
                    </p>

                </div>

                <div className="text-right">

                    <div className="text-2xl font-bold text-red-600">

                        {progress}%

                    </div>

                    <div className="text-xs text-slate-500">

                        Completed

                    </div>

                </div>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>

    );

};

export default InterviewProgress;