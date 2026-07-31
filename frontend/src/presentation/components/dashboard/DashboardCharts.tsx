import React from "react";
import type { DashboardSummary } from "../../../types/dashboard";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

type Props = {
    summary: DashboardSummary;
};

const DashboardCharts: React.FC<Props> = ({
    summary,
}) => {

    const quizData = [
        {
            name: "Generated",
            value: summary.totalQuizzes,
        },
        {
            name: "Completed",
            value: summary.completedQuizzes,
        },
    ];

    const resourceData = [
        {
            name: "Documents",
            value: summary.totalDocuments,
            fill: "#ef4444",
        },
        {
            name: "Flashcards",
            value: summary.totalFlashcardSets,
            fill: "#6366f1",
        },
        {
            name: "Interviews",
            value: summary.totalInterviews ?? 0,
            fill: "#10b981",
        },
    ];

    return (

        <div className="grid gap-6 xl:grid-cols-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Quiz Activity
                    </h2>

                    <p className="text-sm text-slate-500">
                        Generated vs completed quizzes
                    </p>

                </div>

                <div className="h-72">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                            data={quizData}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                fill="#ef4444"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Learning Resources
                    </h2>

                    <p className="text-sm text-slate-500">
                        Distribution of generated learning resources
                    </p>

                </div>

                <div className="h-72">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={resourceData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={95}
                                paddingAngle={4}
                            />

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
};

export default DashboardCharts;