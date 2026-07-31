import React from "react";
import type { DashboardSummary } from "../../../types/dashboard";

type Props = {
    summary: DashboardSummary;
};

const DashboardHeader: React.FC<Props> = ({ summary }) => {

    const completionRate =
        summary.totalDocuments === 0
            ? 0
            : Math.round(
                  (summary.readyDocuments / summary.totalDocuments) * 100
              );

    return (
        <div className="rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-rose-600 p-8 text-white shadow-lg">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="mt-2 text-3xl font-bold">
                        Welcome back
                    </h1>

                    <p className="mt-3 max-w-2xl text-red-100">
                        Track your learning journey, monitor your progress,
                        and continue where you left off.
                    </p>

                </div>

                <div className="rounded-2xl bg-white/15 px-6 py-5 backdrop-blur">

                    <p className="text-sm text-red-100">
                        Learning Progress
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {completionRate}%
                    </p>

                    <p className="mt-2 text-sm text-red-100">
                        {summary.readyDocuments} of{" "}
                        {summary.totalDocuments} documents ready
                    </p>

                </div>

            </div>

        </div>
    );
};

export default DashboardHeader;