import React from "react";
import {
    FileText,
    Brain,
    Layers3,
    Mic,
} from "lucide-react";

import type { DashboardSummary } from "../../../types/dashboard";
import StatsCard from "./StatsCard";

type Props = {
    summary: DashboardSummary;
};

const DashboardStats: React.FC<Props> = ({
    summary,
}) => {

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="Documents"
                value={summary.totalDocuments}
                subtitle={`${summary.readyDocuments} ready`}
                icon={FileText}
                color="bg-red-500"
            />

            <StatsCard
                title="Quizzes"
                value={summary.totalQuizzes}
                subtitle={
                    summary.completedQuizzes > 0
                        ? `${summary.completedQuizzes} completed • ${summary.averageQuizScore}% avg`
                        : "No quizzes completed"
                }
                icon={Brain}
                color="bg-indigo-500"
            />

            <StatsCard
                title="Flashcards"
                value={summary.totalFlashcards}
                subtitle={`${summary.totalFlashcardSets} sets`}
                icon={Layers3}
                color="bg-emerald-500"
            />

            <StatsCard
                title="Interviews"
                value={summary.totalInterviews ?? 0}
                subtitle={
                    (summary.completedInterviews ?? 0) > 0
                        ? `${summary.completedInterviews} completed • ${summary.averageInterviewScore ?? 0}% avg`
                        : "No interviews completed"
                }
                icon={Mic}
                color="bg-amber-500"
            />

        </div>
    );
};

export default DashboardStats;