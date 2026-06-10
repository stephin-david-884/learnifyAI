import React from "react";

type Props = {
    current: number;
    total: number;
};

const QuizProgressBar: React.FC<Props> = ({
    current,
    total,
}) => {

    const percentage =
        Math.round(
            (current / total) * 100
        );

    return (
        <div className="space-y-2">

            <div className="flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                    Progress
                </span>

                <span className="text-sm font-semibold text-slate-900">
                    {percentage}%
                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-600 transition-all"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
};

export default QuizProgressBar;