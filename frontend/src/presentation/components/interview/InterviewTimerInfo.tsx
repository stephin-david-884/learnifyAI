import React, { useMemo } from "react";

import { Clock3 } from "lucide-react";

type Props = {

    totalQuestions: number;

};

const InterviewTimerInfo: React.FC<Props> = ({
    totalQuestions,
}) => {

    const duration =
        useMemo(() => {

            return totalQuestions === 5 ? 10 : 20;

        }, [totalQuestions]);

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                    <Clock3 className="text-red-600" />

                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Interview Timer

                    </h2>

                    <p className="text-sm text-slate-500">

                        The interview uses one overall timer.

                    </p>

                </div>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="text-sm text-slate-500">

                        Questions

                    </div>

                    <div className="mt-2 text-3xl font-bold text-slate-900">

                        {totalQuestions}

                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="text-sm text-slate-500">

                        Time Limit

                    </div>

                    <div className="mt-2 text-3xl font-bold text-slate-900">

                        {duration} min

                    </div>

                </div>

            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-sm text-amber-700">

                    When the overall timer reaches zero, your interview will be automatically submitted for AI evaluation.

                </p>

            </div>

        </div>

    );

};

export default InterviewTimerInfo;